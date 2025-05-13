import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import propertyData from "../../utils/data/searchPage";

const PropertyCard = () => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="300"
          image={propertyData[0].image}
          alt="Property Image"
        />
      </Box>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1}>
          <RoomIcon fontSize="small" color="primary" />
          <Typography variant="subtitle1" fontWeight="bold">
            {propertyData[0].address}
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1 }}
        >
          Start From{" "}
          <Typography
            variant="body1"
            component="span"
            color="primary"
            fontWeight="bold"
          >
            ₹ {propertyData[2].price}
          </Typography>
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ marginTop: 1 }}
        >
          <AspectRatioIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {propertyData[0].size} ft
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
