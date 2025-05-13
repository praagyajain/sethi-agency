import { Box, CardMedia, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "next/link";
const DreamPropertyCard = ({ cardData }) => {
  return (
    <Box
      sx={{
        position: "relative",
        "&:hover .overlay": {
          opacity: 1,
        },
        "&:hover .image": {
          opacity: 0.7,
        },
      }}
    >
      <Link href={`/properties/${cardData.slug}`}>
        <CardMedia
          component="img"
          height="300"
          image={cardData.url.URL}
          alt="Property Image"
          className="image"
          sx={{
            transition: "opacity 0.3s ease",
          }}
        />
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0,
            transition: "opacity 0.5s ease",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            fontWeight="bold"
            display="flex"
            justifyContent="center"
            alignItem="center"
          >
            <LocationOnIcon></LocationOnIcon> {cardData.city}, {cardData.state}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default DreamPropertyCard;
