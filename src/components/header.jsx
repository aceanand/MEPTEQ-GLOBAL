// import React from "react";

// export const Header = (props) => {
//   return (
//     <header id="header">
//       <div className="intro">
//         <div className="overlay">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-8 col-md-offset-2 intro-text">
//                 <h1>
//                   {props.data ? props.data.title : "Loading"}
//                   <span></span>
//                 </h1>
//                 <p>{props.data ? props.data.paragraph : "Loading"}</p>
//                 <a href="#about" className="btn btn-custom btn-lg page-scroll">
//                   Learn More
//                 </a>{" "}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };
import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Button, useMediaQuery, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const destinations = [
  {
    url: "/img/back.jpg",
    title: "Engineering Excellence",
    subtitle: "Innovative Solutions",
    description: "Welcome to Mepteq Engineering and Consultancy",
  },
  {
    url: "/img/burzkhalifa2.jpg",
    title: "Global Expertise",
    subtitle: "European Projects",
    description: "Delivering Engineering Excellence Worldwide",
  },
  {
    url: "/img/africa.jpg",
    title: "Iconic Structures",
    subtitle: "Middle East Division",
    description: "Engineering Marvels in the Heart of Dubai",
  },
];

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Optimized slide navigation with useCallback
  const goToSlide = useCallback((index, dir) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % destinations.length, 1);
  }, [current, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(current === 0 ? destinations.length - 1 : current - 1, -1);
  }, [current, goToSlide]);

  // Auto-rotation with pause on hover
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Swipe handlers with improved sensitivity
  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
    delta: 10, // Minimum swipe distance
    swipeDuration: 500, // Maximum time for swipe motion
  });

  // Animation variants with improved transitions
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const backgroundVariants = {
    initial: { scale: 1.1, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        duration: 1.5,
        ease: "easeOut"
      } 
    },
    exit: { 
      scale: 1.05, 
      opacity: 0, 
      transition: { 
        duration: 0.5,
        ease: "easeIn"
      } 
    },
  };

  return (
    <Box 
      {...handlers}
      component="header"
      id="header"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      sx={{ 
        height: "100vh", 
        width: "100vw", 
        position: "relative", 
        overflow: "hidden",
        cursor: "grab",
        "&:active": {
          cursor: "grabbing"
        },
        // Ensure it works on mobile with correct height
        WebkitTapHighlightColor: "transparent",
        // Fixing the container to ensure full viewport coverage
        margin: 0,
        padding: 0,
      }}
    >
      {/* Background Images with Scale Effect - Fixed for full coverage */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`bg-${current}`}
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${destinations[current].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,
          }}
        />
      </AnimatePresence>

      {/* Gradient Overlay - Improved for better text legibility */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.75))",
          zIndex: 1,
        }}
      />

      {/* Navigation Arrows - Improved for touch & accessibility */}
      <Box
        component="button"
        aria-label="Previous slide"
        onClick={prevSlide}
        sx={{
          position: "absolute",
          top: "50%",
          left: { xs: 10, md: 20 },
          transform: "translateY(-50%)",
          zIndex: 4,
          display: { xs: "none", sm: "flex" },
          width: { sm: 40, md: 50 },
          height: { sm: 40, md: 50 },
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,0.15)",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          border: "none",
          outline: "none",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.25)",
            transform: "translateY(-50%) scale(1.1)",
          },
          transition: "all 0.2s ease",
        }}
      >
        <Typography sx={{ color: "white", fontSize: { sm: 18, md: 24 } }}>←</Typography>
      </Box>

      <Box
        component="button"
        aria-label="Next slide"
        onClick={nextSlide}
        sx={{
          position: "absolute",
          top: "50%",
          right: { xs: 10, md: 20 },
          transform: "translateY(-50%)",
          zIndex: 4,
          display: { xs: "none", sm: "flex" },
          width: { sm: 40, md: 50 },
          height: { sm: 40, md: 50 },
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,0.15)",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          border: "none",
          outline: "none",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.25)",
            transform: "translateY(-50%) scale(1.1)",
          },
          transition: "all 0.2s ease",
        }}
      >
        <Typography sx={{ color: "white", fontSize: { sm: 18, md: 24 } }}>→</Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: "100%",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            style={{
              position: "absolute",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0 20px",
              textAlign: "center",
              maxWidth: "1200px",
            }}
          >
            {/* Title with improved typography */}
            <Typography
              variant="h1"
              sx={{
                color: "white",
                fontWeight: 700,
                fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem", lg: "4.2rem" },
                letterSpacing: "0.02em",
                lineHeight: 1.1,
                textShadow: "0 4px 8px rgba(0, 0, 0, 0.6)",
                mb: { xs: 1, sm: 2 },
                wordWrap: 'break-word',
                textAlign: 'center',
                maxWidth: "90%",
                "@media (max-width: 340px)": {
                  fontSize: "1.8rem",
                }
              }}
            >
              {destinations[current].title}
            </Typography>

            {/* Subtitle with improved typography */}
            <Typography
              variant="h2"
              sx={{
                color: "#f0f0f0",
                fontWeight: 500,
                fontSize: { xs: "1.4rem", sm: "1.8rem", md: "2.2rem", lg: "2.5rem" },
                letterSpacing: "0.01em",
                lineHeight: 1.3,
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.6)",
                mb: { xs: 2, sm: 3 },
                wordWrap: 'break-word',
                textAlign: 'center',
                maxWidth: "90%",
                "@media (max-width: 340px)": {
                  fontSize: "1.2rem",
                }
              }}
            >
              {destinations[current].subtitle}
            </Typography>

            {/* Description with improved typography */}
            <Typography
              variant="h4"
              sx={{
                color: "#f0f0f0",
                fontWeight: 400,
                fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem", lg: "1.7rem" },
                letterSpacing: "0.01em",
                lineHeight: 1.4,
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.6)",
                mb: { xs: 3, sm: 4, md: 5 },
                maxWidth: { xs: "95%", sm: "90%", md: "80%", lg: "800px" },
                wordWrap: 'break-word',
                textAlign: 'center',
                "@media (max-width: 340px)": {
                  fontSize: "0.9rem",
                }
              }}
            >
              {destinations[current].description}
            </Typography>

            {/* Buttons with improved styling and accessibility */}
            <Box 
              sx={{ 
                display: "flex", 
                gap: { xs: 2, sm: 3 }, 
                flexWrap: "wrap", 
                justifyContent: "center",
                width: "100%",
                maxWidth: "500px",
              }}
            >
              <Button
                variant="contained"
                aria-label="Learn more about our services"
                component="a"
                href="#about"
                sx={{
                  bgcolor: "#3a7bd5",
                  color: "white",
                  py: { xs: 1, sm: 1.5 },
                  px: { xs: 3, sm: 4 },
                  borderRadius: "4px",
                  fontWeight: 500,
                  textTransform: "none",
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                  flex: { xs: "1 1 auto", sm: "0 1 auto" },
                  minWidth: { xs: "130px", sm: "150px" },
                  "&:hover": {
                    bgcolor: "#2d62b1",
                    transform: "translateY(-3px)",
                    boxShadow: "0 10px 20px rgba(58, 123, 213, 0.2)",
                  },
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                }}
              >
                Learn More
              </Button>
              
              <Button
                variant="outlined"
                aria-label="Contact us"
                component="a"
                href="#contact"
                sx={{
                  borderColor: "white",
                  color: "white",
                  py: { xs: 1, sm: 1.5 },
                  px: { xs: 3, sm: 4 },
                  borderRadius: "4px",
                  fontWeight: 500,
                  textTransform: "none",
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                  flex: { xs: "1 1 auto", sm: "0 1 auto" },
                  minWidth: { xs: "130px", sm: "150px" },
                  "&:hover": {
                    borderColor: "#3a7bd5",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    transform: "translateY(-3px)",
                    boxShadow: "0 10px 20px rgba(255, 255, 255, 0.1)",
                  },
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                }}
              >
                Contact Us
              </Button>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Side Navigation Indicators with improved positioning and style */}
      <Box
        sx={{
          position: "absolute",
          right: { xs: "auto", md: 30 },
          left: { xs: "auto", md: "auto" },
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          gap: 2,
        }}
      >
        {destinations.map((_, index) => (
          <Box
            key={index}
            role="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={current === index ? "true" : "false"}
            onClick={() => goToSlide(index, index > current ? 1 : -1)}
            sx={{
              width: 3,
              height: current === index ? 40 : 20,
              bgcolor: current === index ? "#3a7bd5" : "rgba(255,255,255,0.5)",
              borderRadius: "10px",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                bgcolor: current === index ? "#3a7bd5" : "white",
                transform: "scaleX(1.5)",
              },
            }}
          />
        ))}
      </Box>

      {/* Bottom Navigation Dots with improved touch targets */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 16, sm: 20 },
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: { xs: "flex", md: "flex" },
          gap: { xs: 1.5, sm: 2 },
          padding: 1, // Better touch target
        }}
      >
        {destinations.map((_, index) => (
          <Box
            key={index}
            role="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={current === index ? "true" : "false"}
            onClick={() => goToSlide(index, index > current ? 1 : -1)}
            sx={{
              width: current === index ? { xs: 10, sm: 12 } : { xs: 6, sm: 8 },
              height: current === index ? { xs: 10, sm: 12 } : { xs: 6, sm: 8 },
              bgcolor: current === index ? "#3a7bd5" : "rgba(255,255,255,0.5)",
              borderRadius: "50%",
              transition: "all 0.3s ease",
              cursor: "pointer",
              padding: 1, // Invisible padding for better touch target
              margin: -1, // To compensate for padding
              "&:hover": {
                bgcolor: current === index ? "#3a7bd5" : "white",
                transform: "scale(1.2)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Header;