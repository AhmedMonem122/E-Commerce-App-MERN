import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const slides = [
  {
    title: "Summer Collection 2024",
    description: "Discover the latest trends in summer fashion",
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
    buttonText: "Shop Now",
  },
  {
    title: "Premium Electronics",
    description: "Get the best deals on premium electronics",
    image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
    buttonText: "Explore More",
  },
  {
    title: "Home & Living",
    description: "Transform your living space with our collection",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    buttonText: "View Collection",
  },
];

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <Box
      component="header"
      sx={{ position: "relative", height: isMobile ? "60vh" : "80vh" }}
    >
      {slides.map((slide, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: isMobile ? "60vh" : "80vh",
            opacity: currentSlide === index ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.4)",
              },
            }}
          />
          <Container
            maxWidth="xl"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Typography
              variant={isMobile ? "h3" : "h1"}
              sx={{
                color: "#fff",
                fontWeight: 700,
                mb: 2,
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {slide.title}
            </Typography>
            <Typography
              variant={isMobile ? "body1" : "h5"}
              sx={{
                color: "#fff",
                mb: 4,
                maxWidth: "600px",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              {slide.description}
            </Typography>
            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              sx={{
                backgroundColor: "#3B82F6",
                color: "#fff",
                px: 4,
                "&:hover": {
                  backgroundColor: "#2563EB",
                },
              }}
            >
              {slide.buttonText}
            </Button>
          </Container>
        </Box>
      ))}

      {/* Navigation Buttons */}
      <Box
        sx={{
          position: "absolute",
          bottom: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 2,
          zIndex: 2,
        }}
      >
        <Button
          onClick={handlePrevSlide}
          sx={{
            minWidth: "auto",
            backgroundColor: "rgba(255,255,255,0.3)",
            color: "#fff",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.5)" },
          }}
        >
          <ArrowBackIcon />
        </Button>
        <Button
          onClick={handleNextSlide}
          sx={{
            minWidth: "auto",
            backgroundColor: "rgba(255,255,255,0.3)",
            color: "#fff",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.5)" },
          }}
        >
          <ArrowForwardIcon />
        </Button>
      </Box>

      {/* Slide Indicators */}
      <Box
        sx={{
          position: "absolute",
          bottom: "2%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
          zIndex: 2,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentSlide(index)}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor:
                currentSlide === index ? "#3B82F6" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Header;
