import React from "react";
import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";

export default function NotFoundPage({ latestPost }) {
  return (
    <Box sx={{ textAlign: "center", padding: "50px", marginTop: "100px" }}>
      <Typography variant="h3" sx={{ marginBottom: "20px", color: "#2F1D19" }}>
        404 - Page Not Found
      </Typography>
      <Typography
        variant="body1"
        sx={{ marginBottom: "40px", color: "#8F90A6" }}
      >
        Sorry, the page you're looking for doesn't exist.
      </Typography>
      {latestPost && (
        <Link href={`/blogs/`} passHref>
          <Button
            variant="text"
            sx={{
              color: "#2F1D19",
              textDecoration: "underline",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Check out our other posts
          </Button>
        </Link>
      )}
    </Box>
  );
}
