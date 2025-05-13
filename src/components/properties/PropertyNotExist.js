import React from "react";
import { Box, Typography, Button } from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

export default function PropertyNotFound({ handleFilterReset }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "50px",
        marginTop: "100px",
      }}
    >
      <FilterAltOffIcon
        sx={{ fontSize: 80, color: "#8F90A6", marginBottom: 2 }}
      />
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: "20px", color: "#2F1D19" }}
      >
        No Properties Found!
      </Typography>
      <Typography
        variant="body1"
        sx={{ marginBottom: "40px", color: "#8F90A6" }}
      >
        We couldn't find any properties matching your search. You can reset the
        properties filters.
      </Typography>

      <Box sx={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterReset}
          sx={{
            backgroundColor: "#00796B",
            "&:hover": { backgroundColor: "#004D40" },
          }}
        >
          <HomeWorkIcon sx={{ marginRight: "8px" }} />
          Reset Filter
        </Button>
      </Box>
    </Box>
  );
}
