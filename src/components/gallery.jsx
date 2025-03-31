import { Image } from "./image";
import React, { useEffect, useState, useRef } from "react";

export const Gallery = (props) => {
  const [animated, setAnimated] = useState(false);
  const [isLoading, setIsLoading] = useState(!props.data);
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef(null);

  // Set categories for filtering based on available data
  const categories = props.data
    ? [
        "all",
        ...new Set(props.data.map((item) => item.category).filter(Boolean)),
      ]
    : ["all"];

  useEffect(() => {
    // Update loading state when data changes
    setIsLoading(!props.data);

    // Use Intersection Observer to detect when the gallery section is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [props.data]);

  // Filter projects based on selected category
  const filteredProjects = props.data
    ? filter === "all"
      ? props.data
      : props.data.filter((item) => item.category === filter)
    : [];

  // Styles with responsive considerations
  const styles = {
    container: {
      padding: "0 15px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    sectionTitle: {
      opacity: animated ? 1 : 0,
      transform: animated ? "translateY(0)" : "translateY(-20px)",
      transition: "all 0.8s ease",
      marginBottom: "30px",
    },
    filterContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "30px",
      opacity: animated ? 1 : 0,
      transform: animated ? "translateY(0)" : "translateY(-15px)",
      transition: "all 0.7s ease",
    },
    filterButton: (active) => ({
      padding: "8px 16px",
      backgroundColor: active ? "#007bff" : "#f8f9fa",
      color: active ? "white" : "#333",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontWeight: active ? "600" : "400",
      boxShadow: active ? "0 4px 6px rgba(0,0,0,0.1)" : "none",
    }),
    portfolioItems: {
      display: "flex",
      flexWrap: "wrap",
      margin: "0 -15px",
    },
    portfolioItem: (index) => ({
      width: "100%", // Full width on mobile by default
      padding: "0 15px",
      marginBottom: "30px",
      opacity: animated ? 1 : 0,
      transform: animated ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.6s ease",
      transitionDelay: `${0.1 + (index % 6) * 0.1}s`, // Reset delay every 6 items for better performance
    }),
    portfolioItemInner: {
      position: "relative",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: "all 0.5s ease",
      height: "100%",
      backgroundColor: "#fff",
    },
    loadingContainer: {
      padding: "60px 0",
      textAlign: "center",
      width: "100%",
    },
    loadingDot: (index) => ({
      display: "inline-block",
      width: "12px",
      height: "12px",
      margin: "0 6px",
      borderRadius: "50%",
      backgroundColor: "#007bff",
      opacity: 0.6,
      animation: "pulse 1.5s infinite ease-in-out",
      animationDelay: `${index * 0.2}s`,
    }),
    noResults: {
      textAlign: "center",
      padding: "40px",
      width: "100%",
      color: "#666",
    },
    "@media (min-width: 576px)": {
      portfolioItem: {
        width: "50%", // 2 items per row on small screens
      },
    },
    "@media (min-width: 992px)": {
      portfolioItem: {
        width: "33.33%", // 3 items per row on larger screens
      },
    },
  };

  // Add hover effect
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-10px)";
    e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.2)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
  };

  // Dynamic inline media queries
  const getResponsiveItemStyle = (index) => {
    const baseStyle = styles.portfolioItem(index);

    // Only apply these in the browser environment
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 992) {
        return { ...baseStyle, width: "33.33%" };
      } else if (window.innerWidth >= 576) {
        return { ...baseStyle, width: "50%" };
      }
    }

    return baseStyle;
  };

  return (
    <div
      id="portfolio"
      className="text-center"
      ref={sectionRef}
      style={{ paddingTop: "60px", paddingBottom: "60px" }}
    >
      <div style={styles.container}>
        <div style={styles.sectionTitle}>
          <h2>Projects</h2>
          <p>
            23 Years International MEP Expertise – Associated with more than 500
            projects.
          </p>
        </div>

        {/* Category filter buttons - only show if we have categories */}
        {categories.length > 1 && (
          <div style={styles.filterContainer}>
            {categories.map((cat) => (
              <button
                key={cat}
                style={styles.filterButton(filter === cat)}
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                aria-label={`Filter by ${cat}`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        )}

        <div style={styles.portfolioItems}>
          {isLoading ? (
            <div style={styles.loadingContainer}>
              <div role="status" aria-label="Loading projects">
                {[0, 1, 2].map((i) => (
                  <span key={i} style={styles.loadingDot(i)} />
                ))}
              </div>
            </div>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((d, i) => (
              <div key={`${d.title}-${i}`} style={getResponsiveItemStyle(i)}>
                <div
                  style={styles.portfolioItemInner}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  tabIndex="0" // Make focusable for keyboard navigation
                >
                  <Image
                    title={d.title}
                    largeImage={d.largeImage}
                    smallImage={d.smallImage}
                  />
                </div>
              </div>
            ))
          ) : (
            <div style={styles.noResults}>
              <p>
                No projects found in this category. Please try another filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
