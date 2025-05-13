import { Email, Phone, LocationOn } from "@mui/icons-material";
import { useState, Suspense } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleOpen = (content) => {
    setModalContent(content);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setModalContent("");
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2F1D19",
        color: "white",
        width: "100vw",
        position: "fixed",
        bottom: 0,
        left: 0,
        margin: 0,
        padding: "70px",
        boxSizing: "border-box",
        minHeight: "100px",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          justifyContent: "center",
          alignItems: "flex-start",
          maxWidth: "1440px",
          margin: "0 auto",
          gap: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            flex: 1,
            margin: 0,
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "20px" }}>
            SETHI-ESTATE-AGENCY
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "1.5rem",
              marginBottom: "10px",
            }}
          >
            <LocationOn sx={{ marginRight: 1 }} />
            2118 Thornridge Cir., Dubai, UAE 35624
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "1.5rem",
              marginBottom: "10px",
              fontSize: "1.5rem",
              marginBottom: "10px",
            }}
          >
            <Phone sx={{ marginRight: 1 }} /> +91-9999634517
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "1.5rem",
              marginBottom: "10px",
              fontSize: "1.5rem",
              marginBottom: "10px",
            }}
          >
            <Email sx={{ marginRight: 1 }} /> sethiestateagency113@gmail.com
          </Typography>
        </Box>

        <Box
          px={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            width: "100%",
            padding: 2, // Optional: adds padding around the grid
          }}
        >
          <Box
            sm={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginBottom: "20px",
              textalign: "left",
            }}
          >
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              QUICK LINKS
            </Typography>
            <Link href="/hero" underline="none" passHref>
              <Typography
                sx={{
                  cursor: "pointer",
                  color: "white",
                  fontSize: "1.5rem",
                  textDecoration: "none",
                  "&:hover": { color: "#ccc" },
                }}
              >
                Home
              </Typography>
            </Link>
            <Link href="/About" passHref>
              <Typography
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "white",
                  fontSize: "1.5rem",
                  "&:hover": { color: "#ccc" },
                }}
              >
                About
              </Typography>
            </Link>
            <Link href="/Properties" passHref>
              <Typography
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "white",
                  fontSize: "1.5rem",
                  "&:hover": { color: "#ccc" },
                }}
              >
                Project
              </Typography>
            </Link>
            <Link href="/contact" passHref>
              <Typography
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "white",
                  fontSize: "1.5rem",
                  "&:hover": { color: "#ccc" },
                }}
              >
                Contact Us
              </Typography>
            </Link>
          </Box>

          <Box px={{ textalign: "left" }}>
            <Typography
              variant="h5"
              sx={{ marginBottom: "20px", "&:hover": { color: "#ccc" } }}
            >
              LEGAL LINKS
            </Typography>
            <Typography
              px={{
                textDecoration: "none",
                cursor: "pointer",
                color: "white",
                fontSize: "1.5rem",
                "&:hover": { color: "#ccc" },
              }}
              onClick={() => handleOpen("Terms")}
            >
              Terms
            </Typography>
            <Typography
              sx={{
                textDecoration: "none",
                cursor: "pointer",
                color: "white",
                fontSize: "1.5rem",
                "&:hover": { color: "#ccc" },
              }}
              onClick={() => handleOpen("Conditions")}
            >
              Conditions
            </Typography>
            <Typography
              sx={{
                textDecoration: "none",
                cursor: "pointer",
                color: "white",
                fontSize: "1.5rem",
                "&:hover": { color: "#ccc" },
              }}
              onClick={() => handleOpen("Privacy Policy")}
            >
              Privacy Policy
            </Typography>
          </Box>

          <Box sx={{ textalign: "left" }}>
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              SOCIAL MEDIA
            </Typography>
            <Link href="https://www.facebook.com" passHref>
              <Typography
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "white",
                  fontSize: "1.5rem",
                  "&:hover": { color: "#ccc" },
                }}
              >
                Facebook
              </Typography>
            </Link>

            <Link href="https://www.twitter.com" passHref>
              <Typography
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "white",
                  fontSize: "1.5rem",
                  "&:hover": { color: "#ccc" },
                }}
              >
                Twitter
              </Typography>
            </Link>

            <Link href="https://www.youtube.com" passHref>
              <Typography
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "white",
                  fontSize: "1.5rem",
                  color: "white",
                  "&:hover": { color: "#ccc" },
                }}
              >
                YouTube
              </Typography>
            </Link>

            <Link href="https://www.linkedin.com" passHref>
              <Typography
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "white",
                  fontSize: "1.5rem",
                  "&:hover": { color: "#ccc" },
                }}
              >
                LinkedIn
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          marginTop: "30px",
          marginBottom: "0px",
          fontSize: "12px",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Typography>© 2024 Sethi Estate Agency</Typography>
      </Box>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ backgroundcolor: "white", padding: "20px" }}>
          <Typography variant="h6" id="modal-title">
            {modalContent}
          </Typography>
          <Typography id="modal-description">
            This is the content for {modalContent}.
          </Typography>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "#2f1d19", 
              color: "white", 
              padding: "10px 20px", 
              border: "none",
              cursor: "pointer", 
              width: "100%", 
              "&:hover": {
                backgroundColor: "#4a3b32", 
              },
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Footer;
