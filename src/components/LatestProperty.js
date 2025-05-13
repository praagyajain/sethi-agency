import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const SliderContainer = styled(Box)(({ theme, flexdir }) => ({
  position: "relative",
  width: "100%",
  padding: theme.spacing(3),
  backgroundColor: flexdir === "column" ? "white" : "#2f1D19",
}));

const CardsContainer = styled(Box)(({ theme, flexdir }) => ({
  display: "flex",
  flexDirection: flexdir === "column" ? "column" : "row",
  padding: flexdir === "column" ? "0px 0px" : "60px",
  width: flexdir === "column" ? "130%" : "100%",
  margin: flexdir === "column" ? "0px 0px" : "0",
  position: "relative",
  height: flexdir === "column" ? "auto" : "500px",
  overflow: "hidden",
  padding: "60px",
  gap: theme.spacing(2),
}));

const CardWrapper = styled(Box)(({ theme, status, flexdir }) => ({
  position: flexdir === "column" ? "relative" : "absolute",
  width: flexdir === "column" ? "100%" : "calc(25% - 16px)",
  height: flexdir === "column" ? "auto" : "400px",
  margin: flexdir === "column" ? theme.spacing(1, -4) : "0 8px",
  transition: "transform 0.3s ease-in-out, opacity 0.5s ease-in-out",
  transform: (() => {
    if (flexdir === "column") return "none";

    switch (status) {
      case "entering":
        return "translateX(100%)";
      case "exiting":
        return "translateX(-100%)";
      case "visible":
        return "translateX(0)";
      default:
        return "translateX(0)";
    }
  })(),
  opacity: status === "visible" ? 1 : 0,
}));

const StyledCard = styled(Card)({
  height: "100%",
  backgroundColor: "#fff",
});

const LatestProperty = ({ flexDir = "row" }) => {
  const [properties, setProperties] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/properties/get", {
          params: {
            latest: true,
          },
        });
        setProperties(
          response.data.successMessage.data.latestProperty.properties
        );
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleNext = () => {
    if (flexDir === "column") return;
    if (isAnimating || startIndex >= properties.length - 4) return;

    setIsAnimating(true);
    setStartIndex((prev) => prev + 1);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handlePrev = () => {
    if (flexDir === "column") return;
    if (isAnimating || startIndex === 0) return;

    setIsAnimating(true);
    setStartIndex((prev) => prev - 1);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const getCardPosition = (index) => {
    if (flexDir === "column") {
      if (index < 2) return { left: "0", status: "visible" };
      return { left: "0", status: "hidden" };
    }

    const position = index - startIndex;
    if (position >= 0 && position < 4) {
      return {
        left: `${position * 25}%`,
        status: "visible",
      };
    }
    return {
      left: position < 0 ? "-25%" : "100%",
      status: "hidden",
    };
  };

  const visibleCards = properties.map((property, index) => {
    const { left, status } = getCardPosition(index);

    return (
      <CardWrapper
        key={property._id}
        style={{ left }}
        status={status}
        flexdir={flexDir}
      >
        <StyledCard>
          <Link
            href={`${
              flexDir == "column"
                ? property.slug
                : `properties/${property.slug}`
            }`}
          >
            <CardMedia
              component="img"
              height="250"
              image={property.imageUrl[0].URL}
              alt={property.name}
            />
          </Link>
          <CardContent>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {property.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Start From
                </Typography>
                <Typography variant="subtitle2">
                  ₹{formatPrice(property.price)}
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {property.area.total} {property.area.unit}
              </Typography>
            </Box>
          </CardContent>
        </StyledCard>
      </CardWrapper>
    );
  });

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: flexDir === "column" ? "0" : "8px",
        }}
      >
        {flexDir !== "column" && (
          <Typography variant="h4" fontWeight="900" component="h2" paddingX={8}>
            Latest Properties
          </Typography>
        )}

        {flexDir !== "column" && (
          <Box paddingX={8}>
            <IconButton
              onClick={handlePrev}
              disabled={startIndex === 0 || isAnimating}
              sx={{ color: "black" }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              onClick={handleNext}
              disabled={startIndex >= properties.length - 4 || isAnimating}
              sx={{ color: "black" }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      <SliderContainer flexdir={flexDir}>
        <CardsContainer flexdir={flexDir}>{visibleCards}</CardsContainer>
      </SliderContainer>
    </Box>
  );
};

export default LatestProperty;
