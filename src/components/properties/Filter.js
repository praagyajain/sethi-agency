import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Slider,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const citiesInIndia = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"];
const propertyTypes = ["Residential", "Commercial"];

const valueToPrice = (value) => {
  if (value <= 25) {
    return 1000 + (value / 25) * 9000;
  } else if (value <= 50) {
    return 10000 + ((value - 25) / 25) * 90000;
  } else if (value <= 75) {
    return 100000 + ((value - 50) / 25) * 900000;
  } else {
    return 1000000 + ((value - 75) / 25) * 99000000;
  }
};

const priceToValue = (price) => {
  if (price <= 10000) {
    return ((price - 1000) / 9000) * 25;
  } else if (price <= 100000) {
    return 25 + ((price - 10000) / 90000) * 25;
  } else if (price <= 1000000) {
    return 50 + ((price - 100000) / 900000) * 25;
  } else {
    return 75 + ((price - 1000000) / 99000000) * 25;
  }
};

export default function Filter({ filters, onFilterChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [tempFilters, setTempFilters] = useState(filters);
  const [isModified, setIsModified] = useState(false);

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return (price / 10000000).toFixed(2) + "Cr";
    } else if (price >= 100000) {
      return (price / 100000).toFixed(2) + "L";
    } else if (price >= 1000) {
      return (price / 1000).toFixed(2) + "K";
    }
    return price;
  };

  useEffect(() => {
    const hasChanges = JSON.stringify(tempFilters) !== JSON.stringify(filters);
    setIsModified(hasChanges);
  }, [tempFilters, filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempFilters({ ...tempFilters, [name]: value });
  };

  const handleSliderChange = (event, newValue) => {
    const updatedPriceRange = [
      valueToPrice(newValue[0]),
      valueToPrice(newValue[1]),
    ];
    setTempFilters({ ...tempFilters, priceRange: updatedPriceRange });
  };
  const handleResetFilter = () => {
    const resetFilters = {
      city: "",
      type: "",
      priceRange: [1000, 100000000],
    };
    setTempFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  const handleModifyClick = () => {
    onFilterChange(tempFilters);
    setIsModified(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 2,
        position: "fixed",
        top: 0,
        backgroundColor: "#fff",
        zIndex: "20",
        boxShadow: "0px 0.05px 10px gray",
      }}
    >
      <Grid
        container
        spacing={isMobile ? 2 : 1}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Location (City)</InputLabel>
            <Select
              name="city"
              value={tempFilters.city}
              onChange={handleChange}
              label="Location (City)"
            >
              {citiesInIndia.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={tempFilters.type}
              onChange={handleChange}
              label="Type"
            >
              {propertyTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Typography gutterBottom>Price Range (₹)</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2">
              ₹{formatPrice(tempFilters.priceRange[0])}
            </Typography>
            <Typography variant="body2">
              ₹{formatPrice(tempFilters.priceRange[1])}
            </Typography>
          </Box>
          <Slider
            value={[
              priceToValue(tempFilters.priceRange[0]),
              priceToValue(tempFilters.priceRange[1]),
            ]}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={0}
            max={100}
            step={0.1}
            valueLabelFormat={(value) => `₹${formatPrice(valueToPrice(value))}`}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={2}
          sx={{ display: "flex", textAlign: "center", gap: "8px" }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={!isModified}
            onClick={handleModifyClick}
            fullWidth
          >
            Modify
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleResetFilter}
            fullWidth
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
