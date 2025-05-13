import React, { useState, useEffect } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const Box = ({ children, sx }) => <div style={sx}>{children}</div>;

// Default testimonials if the API call fails
const defaultTestimonials = [
  {
    image:
      "https://indianwomennetwork.com/wp-content/uploads/2022/02/slider-women-final-1.png",
    quote: "Dream house isn't a dream anymore",
    description:
      "Semper arcu mauris aliquam lacus. Massa erat vitae ultrices pharetra scelerisque. Ipsum, turpis facilisis tempor pulvinar.",
    author: "Brooklyn Simmons",
    role: "Artist",
  },
  {
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg",
    quote: "Your perfect home is here.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Jane Doe",
    role: "Designer",
  },
];

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Fetch all testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        const result = await response.json();
        if (result.success) {
          setTestimonials(result.data);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // In case of error, default testimonials will be used
      }
    };
    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const testimonial = testimonials[currentTestimonial];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "50px 0",
        backgroundColor: "white",
      }}
    >
      <Box sx={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#2F1D19" }}>
          Few smiles and comments
        </h1>
        <p style={{ fontSize: "1rem", color: "#B18C5E" }}>
          Turpis facilisis tempor pulvinar in lobortis ornare magna.
        </p>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          backgroundColor: "white",
          padding: "20px",
        }}
      >
        <button
          onClick={prevTestimonial}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <ArrowBack style={{ color: "#B18C5E", fontSize: "30px" }} />
        </button>
        {testimonial && (
          <Box sx={{ display: "flex", alignItems: "center", width: "80%" }}>
            <Box sx={{ flex: 1 }}>
              <img
                src={testimonial.image}
                alt={testimonial.author}
                style={{
                  maxWidth: "480px",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
            </Box>
            <Box sx={{ flex: 2, maxWidth: "45%" }}>
              <img
                src="assets/images/quoteImage.png"
                height={28}
                alt="Quote Icon"
              />
              <blockquote
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#2F1D19",
                  margin: "20px 0",
                }}
              >
                {testimonial.quote}
              </blockquote>
              <p
                style={{
                  fontSize: "1.5rem",
                  color: "#B18C5E",
                  fontWeight: "lighter",
                  margin: "10px 0",
                }}
              >
                {testimonial.description}
              </p>
              <p
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#2F1D19",
                }}
              >
                {testimonial.author}
              </p>
              <p style={{ fontSize: "1rem", color: "#B18C5E" }}>
                {testimonial.role}
              </p>
            </Box>
          </Box>
        )}
        <button
          onClick={nextTestimonial}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <ArrowForward style={{ color: "#B18C5E", fontSize: "32px" }} />
        </button>
      </Box>
    </Box>
  );
};

export default Testimonial;
