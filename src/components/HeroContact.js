import { Box, Typography, Button } from "@mui/material";
import {
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon,
} from "@mui/icons-material";

const HeroContact = () => {
  const phoneNumber = "+919999634517";
  const whatsappNumber = "+919999634517";
  const email = "sethiestateagency113@gmail.com";

  // Click handlers for each button
  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={0}
      sx={{ alignItems: "center" }}
    >
      {/* First Button (Call) */}
      <Button
        sx={{
          width: "47px",
          height: "45px",
          backgroundColor: "#d9c9af",
          borderRadius: "0px 0px 0px 8px ",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            backgroundColor: "#c2b09a",
          },
          "&:focus": {
            outline: "none",
          },
        }}
        onClick={handleCallClick}
      >
        <PhoneIcon sx={{ width: "20px", height: "20px", color: "#2F1D19" }} />
      </Button>

      {/* Second Button (WhatsApp) */}
      <Button
        sx={{
          width: "47px",
          height: "45px",
          backgroundColor: "#b18c5e",
          borderRadius: "0px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            backgroundColor: "#a3714d",
          },
          "&:focus": {
            outline: "none",
          },
        }}
        onClick={handleWhatsAppClick}
      >
        <WhatsAppIcon
          sx={{ width: "20px", height: "20px", color: "#2F1D19" }}
        />
      </Button>

      {/* Third Button (Email) */}
      <Button
        sx={{
          width: "128px",
          height: "45px",
          backgroundColor: "#c3a881",
          borderRadius: "0px 0px 8px 0px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            backgroundColor: "#a78a60",
          },
          "&:focus": {
            outline: "none",
          },
        }}
        onClick={handleEmailClick}
      >
        <EmailIcon sx={{ width: "20px", height: "20px", color: "#2F1D19" }} />
        <Typography
          sx={{
            color: "#2f1D19",
            fontSize: "12px",
            fontWeight: "600",
            marginLeft: "3px",
          }}
        >
          Enquire Now
        </Typography>
      </Button>
    </Box>
  );
};

export default HeroContact;
