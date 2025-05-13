import { Box, Typography, Button } from "@mui/material";

export default function Home() {
  const imageUrl =
    "https://res.cloudinary.com/dkoezhi9u/image/upload/v1702193748/samples/cloudinary-group.jpg";
  return (
    <Box
      sx={{
        height: "70vh",
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        color: "#fff",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        },
      }}
    >
      <Box sx={{ zIndex: 2 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Find Best Place For Living
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Spend vacations in best hotels and resorts. Find the great place of
          your choice using different searching options.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "rgba(74, 74, 74, 0.5)",
            color: "#fff",
            "&:hover": {
              backgroundColor: "rgba(43, 43, 43, 0.7)",
            },
            borderRadius: 2,
            border: "1px solid white",
            padding: "12px 24px",
            textTransform: "none",
          }}
        >
          Contact Us
        </Button>
      </Box>
    </Box>
  );
}
