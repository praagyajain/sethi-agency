import {
  Box,
  Button,
  MenuItem,
  FormControl,
  Select,
  Slider,
  Typography,
  Popover,
} from "@mui/material";
import { useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useRouter } from "next/router";

const Search = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200000000]); // Initial price range
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const router = useRouter();

  const formatPrice = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Crores`; // Format as crores
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} Lakhs`; // Format as lakhs
    }
    return `₹${value.toLocaleString()}`; // Fallback for smaller values
  };

  // Add search logic here
  const handleSearch = async () => {
    try {
      const response = await axios.get("/api/properties", {
        params: {
          location: selectedLocation,
          propertyType: selectedPropertyType,
          priceRange: selectedPriceRange,
        },
      });

      const filteredProperties = response.data;

      // Redirect to the results page with search results or query params
      router.push({
        pathname: "/search-results",
        query: {
          location: selectedLocation,
          propertyType: selectedPropertyType,
          priceRange: selectedPriceRange,
        },
      });
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleGo = () => {
    setAnchorEl(null);
    setSelectedPriceRange(`₹${priceRange[0]} - ₹${priceRange[1]}`);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          height: "102px",
          backgroundColor: "rgba(247, 244, 239, 0.8)",
          borderRadius: "12px 12px 12px 0px",
          backdropFilter: "blur(20px)",
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "20px",
          left: "32px",
          color: "#2f1d19",
          fontSize: "18px",
          fontWeight: "500",
        }}
      >
        Location
      </Box>
      <FormControl
        sx={{ position: "absolute", top: "46px", left: "32px", width: "200px" }}
      >
        <Select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          IconComponent={() => (
            <LocationOnOutlinedIcon
              sx={{ color: "#8f8fa5", marginRight: "9px" }}
            />
          )}
          sx={{
            backgroundColor: "transparent",
            border: "none",
            fontSize: "16px",
            color: "#8f8fa5",
            padding: 0,
            "&:focus": { outline: "none" },
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            "& .MuiSelect-select": {
              padding: "0px",
              display: "flex",
              alignItems: "center",
            },
          }}
          renderValue={(selected) => {
            if (!selected) {
              return <span style={{ color: "#8f8fa5" }}>Select Your City</span>;
            }
            return selected;
          }}
        >
          <MenuItem value="">
            <span style={{ display: "flex", alignItems: "center" }}>
              <LocationOnOutlinedIcon sx={{ marginRight: "8px" }} />
              Select Your City
            </span>
          </MenuItem>
          <MenuItem value="City1">City1</MenuItem>
          <MenuItem value="City2">City2</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{
          position: "absolute",
          top: "20px",
          left: "270px",
          color: "#2f1d19",
          fontSize: "18px",
          fontWeight: "500",
        }}
      >
        Property Type
      </Box>
      <FormControl
        sx={{
          position: "absolute",
          top: "46px",
          left: "270px",
          width: "230px",
        }}
      >
        <Select
          value={selectedPropertyType}
          onChange={(e) => setSelectedPropertyType(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            backgroundColor: "transparent",
            border: "none",
            fontSize: "16px",
            color: "#8f8fa5",
            padding: 0,
            "&:focus": { outline: "none" },
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            "& .MuiSelect-select": {
              padding: "0px",
              display: "flex",
              alignItems: "center",
            },
          }}
          renderValue={(selected) => {
            if (!selected) {
              return (
                <span style={{ color: "#8f8fa5" }}>Choose Property Type</span>
              );
            }
            return selected;
          }}
        >
          <MenuItem value="">Choose Property Type</MenuItem>
          <MenuItem value="Type1">Type1</MenuItem>
          <MenuItem value="Type2">Type2</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{
          position: "absolute",
          top: "20px",
          left: "530px",
          color: "#2f1d19",
          fontSize: "18px",
          fontWeight: "500",
        }}
      >
        Price Range
      </Box>
      <Button
        onClick={(event) => setAnchorEl(event.currentTarget)}
        disableRipple
        sx={{
          position: "absolute",
          top: "46px",
          left: "530px",
          backgroundColor: "transparent",
          color: "#8f8fa5",
          fontSize: "16px",
          padding: "0px",
          textTransform: "none",
          fontWeight: "normal",
          "&:focus": { outline: "none" },
          "&:hover": { backgroundColor: "transparent" },
        }}
      >
        {selectedPriceRange || "Choose Price Range"}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            width: "300px",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          <Typography gutterBottom>
            Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
          </Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={200000000} // Updated max value to allow prices
            step={500000}
            sx={{
              color: "#a67c52",
              "& .MuiSlider-thumb": {
                backgroundColor: "#fff",
                border: "2px solid #a67c52",
              },
            }}
            valueLabelFormat={(value) => formatPrice(value)} // formatted value
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="caption" color="#8f8fa5">
              min
            </Typography>
            <Typography variant="caption" color="#8f8fa5">
              max
            </Typography>
          </Box>
          <Button
            onClick={handleGo}
            sx={{
              marginTop: "10px",
              width: "100%",
              backgroundColor: "#a67c52",
              borderRadius: "8px",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#8a6543",
              },
            }}
          >
            Go
          </Button>
        </Box>
      </Popover>

      <Button
        onClick={handleSearch}
        sx={{
          position: "absolute",
          top: "21px",
          left: "734px",
          width: "150px",
          height: "60px",
          backgroundColor: "#a67c52",
          borderRadius: "8px",
          color: "white",
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textTransform: "none",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#8a6543",
          },
        }}
      >
        Search Now
      </Button>
    </Box>
  );
};

export default Search;
