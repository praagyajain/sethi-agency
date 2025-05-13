import React, { useEffect, useState, useRef } from "react";
import { Card, Box, Typography, IconButton } from "@mui/material";
import {
  CloudUploadOutlined as CloudUploadOutlinedIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { truncateText } from "../utils/strings";
import { formatDate } from "../utils/datetime";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data); // Store all fetched posts
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError(true);
      }
    };

    fetchPosts();
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -380,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 380,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        padding: "30px",
        maxWidth: "1180px",
        margin: "auto",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      {error ? (
        <Typography variant="body2" color="textSecondary">
          Error fetching blog posts.
        </Typography>
      ) : posts.length > 0 ? (
        <>
          {/* Static Card on the Left */}
          <Box
            sx={{
              width: "360px",
              height: "360px",
              backgroundColor: "#d9c9af",
              borderRadius: "5px",
              position: "relative",
              marginRight: "30px",
            }}
          >
            <Typography
              sx={{
                color: "#2f1d19",
                fontSize: "24px",
                fontWeight: "bold",
                fontFamily: "'Roboto', sans-serif",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              Latest Blogs From Us
            </Typography>
          </Box>

          {/* Slider Section */}
          <Box sx={{ position: "relative", flex: 1 }}>
            <IconButton
              sx={{
                position: "absolute",
                left: "-450px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                backgroundColor: "#fff",
                borderRadius: "50%",
                padding: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
              onClick={scrollLeft}
            >
              <ArrowBackIcon sx={{ color: "#B18C5E" }} />
            </IconButton>

            <Box
              ref={sliderRef}
              sx={{
                display: "flex",
                overflowX: "hidden",
                scrollBehavior: "smooth",
                width: "750px",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {/* slider */}
              {posts.map((post) => (
                <Box
                  key={post._id}
                  sx={{ flex: "0 0 auto", width: "360px", marginRight: "20px" }}
                >
                  <Link href={`/blogs/${post.slug}`} passHref>
                    <Card
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                        height: "360px",
                        "&:hover .title-overlay": {
                          opacity: 1,
                          transform: "translateY(0)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Image
                          src={post.blogImageBanner}
                          alt={post.title}
                          layout="fill"
                          objectFit="cover"
                        />
                        <Box
                          className="title-overlay"
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: "rgba(255, 255, 255, 0.6)",
                            height: "90px",
                            padding: "10px",
                            borderTopLeftRadius: "5px",
                            borderTopRightRadius: "5px",
                            opacity: 0,
                            transform: "translateY(20px)",
                            transition: "opacity 0.3s, transform 0.3s",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold", color: "#2F1D19" }}
                          >
                            {truncateText(post.title, 50)}
                          </Typography>
                          <Box display="flex" alignItems="center">
                            <CloudUploadOutlinedIcon
                              sx={{ color: "#D9C9AF", marginRight: "5px" }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: "#2F1D19" }}
                            >
                              {formatDate(post.createdAt)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  </Link>
                </Box>
              ))}
            </Box>

            <IconButton
              sx={{
                position: "absolute",
                right: "-60px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                backgroundColor: "#fff",
                borderRadius: "50%",
                padding: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
              onClick={scrollRight}
            >
              <ArrowForwardIcon sx={{ color: "#B18C5E" }} />
            </IconButton>
          </Box>
        </>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No blog posts available.
        </Typography>
      )}
    </Box>
  );
};

export default Blogs;
