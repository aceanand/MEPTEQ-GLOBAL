import { Image } from "./image";
import React, { useEffect, useState } from "react";

export const HVAC = (props) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animations after a short delay
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // Vibrant, eye-catching styles
  const styles = {
    container: {
      background:
        "linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 50%, #dbeafe 100%)",
      padding: "3rem 1.5rem 4rem",
      width: "100%",
      overflow: "hidden",
      position: "relative",
    },
    bgPattern: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.03) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 20%)",
      zIndex: 0,
    },
    innerContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
      zIndex: 1,
    },
    heading: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 800,
      color: "#1e40af",
      position: "relative",
      display: "inline-block",
      fontSize: "clamp(2rem, 5vw, 3rem)",
      letterSpacing: "-0.5px",
      textTransform: "uppercase",
    },
    accent: {
      height: "6px",
      background: "linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)",
      width: "8rem",
      margin: "0.75rem auto 0",
      borderRadius: "3px",
      display: "block",
    },
    paragraph: {
      color: "#1e293b",
      lineHeight: 1.8,
      maxWidth: "768px",
      margin: "1.75rem auto 3rem",
      textAlign: "center",
      fontSize: "1.125rem",
      fontWeight: 500,
    },
    featureBox: {
      background:
        "linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))",
      borderRadius: "1rem",
      border: "1px solid rgba(219, 234, 254, 0.8)",
      padding: "2rem",
      marginBottom: "3rem",
      transition: "all 0.4s ease",
      backdropFilter: "blur(8px)",
    },
    featureGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "1.5rem",
    },
    featureItem: {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "0.5rem",
      fontSize: "1.05rem",
      padding: "1rem",
      borderRadius: "0.75rem",
      transition: "all 0.3s ease",
    },
    bullet: {
      color: "#2563eb",
      marginRight: "0.75rem",
      marginTop: "0.2rem",
      flexShrink: 0,
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    cardGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "2rem",
      width: "100%",
    },
    card: {
      background: "rgba(255, 255, 255, 0.8)",
      borderRadius: "1rem",
      overflow: "hidden",
      border: "1px solid #dbeafe",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    },
    imageContainer: {
      position: "relative",
      overflow: "hidden",
      borderRadius: "1rem 1rem 0 0",
      aspectRatio: "16/9",
    },
    imageOverlay: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to top, rgba(30, 64, 175, 0.85), rgba(30, 64, 175, 0.4) 50%, transparent 85%)",
      opacity: 0,
      transition: "opacity 0.4s ease",
      display: "flex",
      alignItems: "flex-end",
    },
    cardTitle: {
      color: "#ffffff",
      padding: "1.5rem",
      fontSize: "1.35rem",
      fontWeight: 700,
      textShadow: "0 1px 2px rgba(0,0,0,0.1)",
    },
    mobileTitleContainer: {
      padding: "1.25rem",
      textAlign: "center",
      background: "linear-gradient(to right, #f0f9ff, #dbeafe)",
      borderTop: "1px solid #dbeafe",
    },
    mobileTitle: {
      color: "#1e40af",
      fontWeight: 700,
      fontSize: "1.15rem",
    },
    badge: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      background: "linear-gradient(135deg, #3b82f6, #2563eb)",
      color: "white",
      padding: "0.5rem 0.75rem",
      borderRadius: "0.5rem",
      fontSize: "0.75rem",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      opacity: 0,
      transform: "translateY(-10px)",
      transition: "all 0.4s ease",
      zIndex: 10,
    },
  };

  // Dynamic animations
  const getAnimationStyle = (index) => {
    const baseDelay = 100;
    const delay = Math.min(index * baseDelay, 500);

    if (animate) {
      return {
        transform: "translateY(0) scale(1)",
        opacity: 1,
        transition: `transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, opacity 0.8s ease ${delay}ms`,
      };
    } else {
      return {
        transform: "translateY(60px) scale(0.95)",
        opacity: 0,
        transition:
          "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.8s ease",
      };
    }
  };

  // Enhanced hover effects
  const cardHoverHandler = (e, enter) => {
    const card = e.currentTarget;
    if (enter) {
      card.style.transform = "translateY(-12px) scale(1.03)";
      card.style.borderColor = "#93c5fd";
      const overlay = card.querySelector(".image-overlay");
      const badge = card.querySelector(".card-badge");
      if (overlay) overlay.style.opacity = "1";
      if (badge) {
        badge.style.opacity = "1";
        badge.style.transform = "translateY(0)";
      }
    } else {
      card.style.transform = "translateY(0) scale(1)";
      card.style.borderColor = "#dbeafe";
      const overlay = card.querySelector(".image-overlay");
      const badge = card.querySelector(".card-badge");
      if (overlay) overlay.style.opacity = "0";
      if (badge) {
        badge.style.opacity = "0";
        badge.style.transform = "translateY(-10px)";
      }
    }
  };

  // Feature item hover effect
  const featureItemHover = (e, enter) => {
    if (enter) {
      e.currentTarget.style.background = "rgba(219, 234, 254, 0.8)";
      e.currentTarget.style.transform = "translateX(5px)";
    } else {
      e.currentTarget.style.background = "rgba(255, 255, 255, 0.5)";
      e.currentTarget.style.transform = "translateX(0)";
    }
  };

  return (
    <div id="hvac-system" style={styles.container}>
      <div style={styles.bgPattern}></div>
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          .feature-item-animate {
            animation: fadeInUp 0.6s forwards;
            opacity: 0;
          }
          
          .pulse-animate {
            animation: pulse 3s infinite ease-in-out;
          }
          
          @media (min-width: 640px) {
            .sm-only { display: none; }
          }
          
          @media (max-width: 639px) {
            .lg-only { display: none; }
          }
        `}
      </style>

      <div style={styles.innerContainer}>
        {/* Header section with enhanced animation */}
        <div style={{ ...getAnimationStyle(0), textAlign: "center" }}>
          <h2 style={styles.heading} className="pulse-animate">
            HVAC System
            <span style={styles.accent}></span>
          </h2>

          <p style={styles.paragraph}>
            With over 23 years of experience serving diverse customer needs, we
            adhere to ASHRAE guidelines for all our HVAC system designs. Our
            comprehensive design solutions include but are not limited to:
          </p>
        </div>

        {/* Feature box with improved layout */}
        <div
          style={{ ...styles.featureBox, ...getAnimationStyle(1) }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))";
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.borderColor = "#93c5fd";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "rgba(219, 234, 254, 0.8)";
          }}
        >
          <div style={styles.featureGrid}>
            {[
              "Specialized Air-Conditioning for Clean Rooms, Operation Theaters, and Critical Environments",
              "Variable Refrigerant Volume (VRV) Air-Conditioning Systems",
              "Central Air-Conditioning Systems with Advanced Controls",
              "Energy-Efficient Chilled Water Systems",
            ].map((item, index) => (
              <div
                key={index}
                className="feature-item-animate"
                style={{
                  ...styles.featureItem,
                  animationDelay: `${0.3 + index * 0.15}s`,
                  background: "rgba(255, 255, 255, 0.5)",
                }}
                onMouseEnter={(e) => featureItemHover(e, true)}
                onMouseLeave={(e) => featureItemHover(e, false)}
              >
                <span style={styles.bullet}>•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cards with improved layout and animations */}
        <div style={styles.cardGrid}>
          {props.data ? (
            props.data.map((d, i) => (
              <div
                key={`${d.title}-${i}`}
                style={{ ...styles.card, ...getAnimationStyle(i + 2) }}
                onMouseEnter={(e) => cardHoverHandler(e, true)}
                onMouseLeave={(e) => cardHoverHandler(e, false)}
              >
                <div style={styles.imageContainer}>
                  <Image
                    title={d.title}
                    largeImage={d.largeImage}
                    smallImage={d.smallImage}
                    alt={d.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.6s ease",
                      transform: "scale(1.01)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1.01)";
                    }}
                  />
                  <div
                    className="image-overlay lg-only"
                    style={styles.imageOverlay}
                  >
                    <h3 style={styles.cardTitle}>{d.title}</h3>
                  </div>
                  <div className="card-badge" style={styles.badge}>
                    Featured
                  </div>
                </div>
                <div style={styles.mobileTitleContainer} className="sm-only">
                  <h3 style={styles.mobileTitle}>{d.title}</h3>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "3rem 0",
                color: "#2563eb",
              }}
            >
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "pulse 2s infinite ease-in-out",
                }}
              >
                Loading HVAC systems...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
