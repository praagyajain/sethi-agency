import React from "react";
import { Box, Grid } from "@mui/material";
import Image from "next/image";

const PartnersCompany = () => {
  // Array of logo paths
  const logos = [
    "/assets/images/fortune.png",
    "/assets/images/tc.png",
    "/assets/images/wsj.png",
    "/assets/images/ft.png",
    "/assets/images/cnbc.png",
  ];

  return (
    <Box
      sx={{
        padding: "32px",
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {logos.map((logo, index) => (
          <Grid item xs={2} key={index} display="flex" justifyContent="center">
            <Box
              sx={{
                width: "35%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mixBlendMode: "color-burn",
                overflow: "hidden",
              }}
            >
              <Image
                src={logo} // Image source
                alt={`Logo ${index + 1}`}
                // layout="responsive" // Use responsive layout for better clarity
                width={200}
                height={200}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                quality={100}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default PartnersCompany;
