import { Box, Typography } from "@mui/material";
import Search from "../components/Search";
import HeroContact from "../components/HeroContact";
import PartnersCompany from "./PartnersCompany";

const HeroSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundImage: 'url("/assets/hero.svg")', //backround svg
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        top: "-50px",
        padding: 0,
        zIndex: 0,
      }}
    >
      {/* Text Block */}
      <Box
        sx={{
          width: "579px",
          height: "156px",
          position: "absolute",
          top: "200px",
          left: "200px",
          color: "white",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "56px",
            fontWeight: "bold",
            lineHeight: 1.2,
          }}
        >
          Smart Living Style
          <br />
          For Smart people
        </Typography>
      </Box>

      {/* Subtext */}
      <Box
        sx={{
          width: "559px",
          height: "63px",
          position: "absolute",
          top: "372px",
          left: "200px",
          color: "white",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: "18px",
            fontWeight: "normal",
            lineHeight: 1.5,
          }}
        >
          A better, healthier you! We are the best studio in the area. Our
          studio provides you with a personal training and nutrition plan, as
          well as a variety of classes at the studio. A unique experience!
        </Typography>
      </Box>

      {/* Image Block */}
      <Box
        sx={{
          position: "absolute",
          top: "200px",
          right: "160px",
          width: "580px",
          height: "480px",
          borderRadius: "32px",
          overflow: "hidden",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            borderRadius: "32px",
            border: "8px solid rgba(255, 255, 255, 0.2)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <Box
          component="img"
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "32px",
            objectFit: "cover",
            boxSizing: "border-box",
          }}
          src="/assets/images/heroimg.png"
          alt="Hero"
        />
      </Box>

      {/* Search Section */}
      <Box
        sx={{
          width: "918px",
          height: "102px",
          position: "absolute",
          top: "500px",
          left: "200px",
          zIndex: 2,
        }}
      >
        <Search />
      </Box>

      {/* Hero Contact Section */}
      <Box
        sx={{
          position: "relative",
          top: "602px", // Adjust position as needed
          left: "200px",
          zIndex: 2,
        }}
      >
        <HeroContact />
      </Box>
      {/* Partner Companies Section */}
      <Box
        sx={{
          position: "relative",
          top: "730px", // Adjust position as needed
          zIndex: 2,
        }}
      >
        <PartnersCompany />
      </Box>
    </Box>
  );
};

export default HeroSection;
