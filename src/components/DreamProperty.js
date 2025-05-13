import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import DreamPropertyCard from "./DreamPropertyCard";

const DreamProperty = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/properties/getDreamProperty");
        setCardData(response.data.successMessage.data.properties);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties..");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" marginY={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" marginY={8}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography marginX={8} variant="h4" component="h4" fontWeight="900">
        Find Your Dream Property in Your Cities
      </Typography>
      <Box marginY={8}>
        <Grid container>
          {cardData.map((data, index) => (
            <Grid item key={index} xs={12} sm={6}>
              <DreamPropertyCard cardData={data} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default DreamProperty;
