import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Avatar,
  Grid,
} from "@mui/material";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import Link from "next/link";
import { useRouter } from "next/router";

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

const Cards = ({ property, index }) => {
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const router = useRouter();
  const handleNavigation = () => {
    router.push(`/properties/${property.slug}`);
  };
  const truncatedDescription =
    property.description.length > 800
      ? property.description.substring(0, 800) + "..."
      : property.description;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: `${index % 2 === 0 ? "row" : "row-reverse"}`,
        paddingX: 4,
        paddingY: 1,
        margin: "auto",
        border: "none",
        boxShadow: "none",
        height: "60vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          width: "45%",
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar
              src={property.userImage || ""}
              alt={property.name}
              sx={{ width: 48, height: 48, mr: 2 }}
            />
            <Typography
              onClick={handleNavigation}
              variant="h6"
              fontWeight="bold"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {property.name}
            </Typography>
          </Box>
          <Box
            onClick={handleNavigation}
            sx={{
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {property.address.street}, {property.address.city},{" "}
              {property.address.state}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            height="250px"
            paragraph
            sx={{
              whiteSpace: "pre-line",
              overflow: "scroll",
              position: "relative",
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {isReadMore ? property.description : truncatedDescription}{" "}
            {property.description.length > 800 && (
              <Typography
                component="span"
                color="primary"
                sx={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={toggleReadMore}
              >
                {isReadMore ? " less" : " more"}
              </Typography>
            )}
          </Typography>

          <Typography
            position="absolute"
            bottom="4%"
            variant="h4"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
          >
            &#8377;{formatPrice(property.price)}
          </Typography>
        </CardContent>
      </Box>

      <Box sx={{ width: "55%", position: "relative" }}>
        <Link href={`/properties/${property.slug}`}>
          <CardMedia
            component="img"
            image={property.imageUrl?.[0]?.URL || ""}
            alt="Property Image"
            sx={{ borderRadius: 2, height: "100%" }}
          />
        </Link>
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            right: index % 2 === 0 ? "0%" : "unset",
            left: index % 2 !== 0 ? "0%" : "unset",
            backgroundColor: "#EAE5D6",
            padding: "20px 28px",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <DirectionsCarFilledOutlinedIcon />
              <Typography sx={{ marginLeft: "4px", fontWeight: "bold" }}>
                {property.details?.noOfBedRoom || 0}
              </Typography>
            </Grid>

            <Grid item sx={{ paddingLeft: "8px", paddingRight: "8px" }}>
              <Typography sx={{ color: "#888" }}>|</Typography>
            </Grid>

            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <BathtubOutlinedIcon />
              <Typography sx={{ marginLeft: "4px", fontWeight: "bold" }}>
                {property.details?.noOfBathroom || 0}
              </Typography>
            </Grid>

            <Grid item sx={{ paddingLeft: "8px", paddingRight: "8px" }}>
              <Typography sx={{ color: "#888" }}>|</Typography>
            </Grid>

            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <AspectRatioIcon />
              <Typography sx={{ marginLeft: "4px", fontWeight: "bold" }}>
                {property.area?.total || 0} {property.area?.unit || "sqft"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Card>
  );
};

export default Cards;
