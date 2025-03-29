import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced destinations with more professional imagery and messaging
const destinations = [
  {
    url: "/img/back.jpg",
    title: "Welcome to MEPTEQ Engineering and Consultancy",
    // subtitle: "Transforming Technological Frontiers",
    description: "HVAC, Plumbing, Electrical Systems, Fire Protection, Mechanical Services, Building Solutions, MEP Engineering.",
    accentColor: "#0077be", // Professional deep blue
    gradient: "linear-gradient(135deg, #0077be, #00a4e4)",
    achievements: [
     
      "Multi-National Project Experience",
      "Cross-Continental Capabilities",
      "Strategic Global Partnerships"
    ]
  },
  {
    url: "/img/b.jpg",
    title: "Welcome to MEPTEQ Engineering and Consultancy",
    // subtitle: "Interconnected Project Solutions",
    description: "HVAC, Plumbing, Electrical Systems, Fire Protection, Mechanical Services, Building Solutions, MEP Engineering.",
    accentColor: "#2ecc71", // Professional green
    gradient: "linear-gradient(135deg, #2ecc71, #27ae60)",
    achievements: [
       // "ISO 9001:2015 Certified",
      "Global Engineering Excellence", 
      "Advanced Technology Integration"
    ]
  },
  {
    url: "/img/africa.jpg",
    title: "Welcome to MEPTEQ Engineering and Consultancy",
    // subtitle: "Intelligent Engineering Solutions",
    description: "HVAC, Plumbing, Electrical Systems, Fire Protection, Mechanical Services, Building Solutions, MEP Engineering.",
    accentColor: "#e74c3c", // Professional red
    gradient: "linear-gradient(135deg, #e74c3c, #c0392b)",
    achievements: [
      "Sustainable Design Mastery",
      "Intelligent Infrastructure Solutions", 
      "Environmental Impact Innovation"
    ]
  }
];

export const Header = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 25,
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div 
      style={{ 
        height: "100vh", 
        width: "100vw", 
        position: "relative", 
        overflow: "hidden",
        background: "linear-gradient(135deg, rgba(0,0,0,0.9), rgba(0,0,0,0.7))",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Professional Background with Advanced Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${destinations[current].url})`,
          backgroundSize: "cover",
          // backgroundPosition: "center",
          filter: "brightness(0.5) contrast(1.3) saturate(1.1)",
          zIndex: 1,
        }}
      />

      {/* Content Container with Professional Layout */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          color: "white",
          textAlign: "center",
          padding: isMobile ? "0 16px" : "0 64px",
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
              opacity: { duration: 0.6 },
            }}
            style={{
              maxWidth: "1200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Professional Title with Gradient Effect */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <h1
                style={{
                  fontSize: isMobile ? "2.5rem" : "4.5rem",
                  fontWeight: 800,
                  color: "white",
                  textShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  background: destinations[current].gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "0.5rem",
                  letterSpacing: "-0.03em",
                }}
              >
                {destinations[current].title}
              </h1>
            </motion.div>

            {/* Professional Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "1.5rem" : "2.5rem",
                  fontWeight: 600,
                  color: "#f0f0f0",
                  marginBottom: "1rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {destinations[current].subtitle}
              </h2>
            </motion.div>

            {/* Professional Description */}
            <motion.div
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <p
                style={{
                  fontSize: isMobile ? "1rem" : "1.5rem",
                  fontWeight: 300,
                  color: "#e0e0e0",
                  marginBottom: "2rem",
                  maxWidth: "800px",
                  lineHeight: 1.6,
                  letterSpacing: "0.02em",
                }}
              >
                {destinations[current].description}
              </p>
            </motion.div>

            {/* Professional Achievements */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                <div 
                  style={{ 
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    marginBottom: "2rem",
                  }}
                >
                  {destinations[current].achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: `${destinations[current].accentColor}33`,
                        padding: "0.5rem 1rem",
                        borderRadius: "0.5rem",
                        boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <p 
                        style={{ 
                          color: "white", 
                          fontWeight: 500,
                          fontSize: "0.9rem",
                        }}
                      >
                        {achievement}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
            >
              <div 
                style={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => window.location.href = "#services"}
                  style={{
                    background: destinations[current].gradient,
                    color: "white",
                    padding: isMobile ? "0.5rem 1.5rem" : "0.75rem 2rem",
                    borderRadius: "1.5rem",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                    boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-5px)";
                    e.target.style.boxShadow = "0 12px 20px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 8px 15px rgba(0,0,0,0.2)";
                  }}
                >
                  Explore Services
                </button>
                <button
                  onClick={() => window.location.href = "#contact"}
                  style={{
                    borderColor: "white",
                    color: "white",
                    padding: isMobile ? "0.5rem 1.5rem" : "0.75rem 2rem",
                    borderRadius: "1.5rem",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                    transition: "all 0.4s ease",
                    background: "transparent",
                    border: "2px solid white",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = destinations[current].accentColor;
                    e.target.style.color = destinations[current].accentColor;
                    e.target.style.backgroundColor = `${destinations[current].accentColor}22`;
                    e.target.style.transform = "translateY(-5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "white";
                    e.target.style.color = "white";
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.5rem",
          zIndex: 3,
        }}
      >
        {destinations.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index, index > current ? 1 : -1)}
            style={{
              width: current === index ? 30 : 12,
              height: 6,
              backgroundColor: current === index 
                ? "white" 
                : "rgba(255,255,255,0.5)",
              borderRadius: 3,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "white";
              e.target.style.width = "30px";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = current === index 
                ? "white" 
                : "rgba(255,255,255,0.5)";
              e.target.style.width = current === index ? "30px" : "12px";
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;