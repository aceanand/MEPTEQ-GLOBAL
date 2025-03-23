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
import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const destinations = [
  {
    url: "/img/back.jpg",
    title: "",
    subtitle: "",
    description: "Welcome to Mepteq Engineering and Consultancy",
  },
  {
    url: "/img/back1.jpg",
    title: "",
    subtitle: "",
    description: "Welcome to Mepteq Engineering and Consultancy",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
    title: "",
    subtitle: "",
    description: "Welcome to Mepteq Engineering and Consultancy",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
    title: "",
    subtitle: "",
    description: "Welcome to Mepteq Engineering and Consultancy",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/93/Burj_Khalifa_at_night.jpg",
    title: "",
    subtitle: "",
    description: "Welcome to Mepteq Engineering and Consultancy",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Gateway_of_India_Mumbai_India.jpg",
    title: "",
    subtitle: "",
    description: "Welcome to Mepteq Engineering and Consultancy",
  },
];

// Changed to named export instead of default export
export const Header = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % destinations.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? destinations.length - 1 : prev - 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true,
  });

  // Variants for animations
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
    initial: { scale: 1.2, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 1.5 } },
    exit: { scale: 1.1, opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <Box 
      {...handlers}
      sx={{ 
        height: "100vh", 
        width: "100%", 
        position: "relative", 
        overflow: "hidden",
        cursor: "grab",
        "&:active": {
          cursor: "grabbing"
        }
      }}
    >
      {/* Background Images with Scale Effect */}
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
            width: "100%",
            height: "100%",
            backgroundImage: `url(${destinations[current].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
      </AnimatePresence>

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
          zIndex: 1,
        }}
      />

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
            }}
          >
            {/* Large Title */}
            <Typography
  variant="h1"
  sx={{
    color: "white",
    fontWeight: 700,
    fontSize: { xs: "3.2rem", sm: "3.8rem", md: "4.5rem", lg: "5.5rem" },
    letterSpacing: "0.001em",
    // textTransform: "uppercase", // Removed uppercase transformation
    margin: 0,
    lineHeight: 1.3,
    textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    padding: '1.5rem 0',
    wordWrap: 'break-word',
    textAlign: 'center',
  }}
>
  {destinations[current].title}
</Typography>

            {/* Subtitle */}
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: 700,
                fontSize: { xs: "3.2rem", sm: "3.8rem", md: "4.5rem", lg: "5.5rem" },
                letterSpacing: "0.001em",
                 textTransform: "none", // Removed uppercase transformation
                margin: 0,
                lineHeight: 1.3,
                textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                padding: '1.5rem 0',
                wordWrap: 'break-word',
                
                textAlign: 'center',
              }}
            >
              {destinations[current].subtitle}
            </Typography>

            {/* Description */}
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: 700,
                fontSize: { xs: "3.2rem", sm: "3.8rem", md: "4.5rem", lg: "5.5rem" },
                letterSpacing: "0.001em",
                 textTransform: "none", // Removed uppercase transformation
                margin: 0,
                lineHeight: 1.3,
                textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                padding: '1.5rem 0',
                wordWrap: 'break-word',
                
                textAlign: 'center',
              }}
            >
              {destinations[current].description}
            </Typography>

            {/* Button */}
            <Button
              variant="contained"
              sx={{
                bgcolor: "grey",
                color: "black",
                py: 1.5,
                px: 4,
                borderRadius: "30px",
                fontWeight: 400,
                textTransform: "none",
                fontSize: "1.1rem",
                "&:hover": {
                  bgcolor: "#FF6B6B",
                  color: "white",
                  transform: "translateY(-3px)",
                  boxShadow: "0 10px 20px rgba(122, 64, 64, 0.2)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <a href="#about" className="btn btn-custom btn-lg page-scroll">
               Learn More </a>{" "}
            </Button>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Side Navigation Indicators */}
      <Box
        sx={{
          position: "absolute",
          right: { xs: 20, md: 40 },
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {destinations.map((_, index) => (
          <Box
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            sx={{
              width: 3,
              height: current === index ? 40 : 20,
              bgcolor: current === index ? "#FF6B6B" : "rgba(255,255,255,0.5)",
              borderRadius: "10px",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                bgcolor: "white",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

// You can also include a default export alongside the named export
export default Header;
