import React, { useState, useEffect } from "react";

export const Testimonials = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!props.data || props.data.length === 0) return;
    // Set component as visible for animation entrance
    setIsVisible(true);
  }, [props.data]);

  // Gradient colors for testimonial cards
  const gradients = [
    "linear-gradient(135deg, #6e8efb, #a777e3)",
    "linear-gradient(135deg, #13f1fc, #0470dc)",
    "linear-gradient(135deg, #f6d365, #fda085)",
    "linear-gradient(135deg, #f093fb, #f5576c)",
    "linear-gradient(135deg, #5ee7df, #b490ca)",
  ];

  return (
    <div
      id="testimonials"
      style={{
        padding: "4rem 2rem",
        background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(125, 211, 252, 0.1)",
          top: "-50px",
          left: "-50px",
          zIndex: "0",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(167, 139, 250, 0.1)",
          bottom: "-100px",
          right: "-100px",
          zIndex: "0",
        }}
      ></div>

      <div
        className="container"
        style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          padding: "0 15px",
          position: "relative",
          zIndex: "1"
        }}
      >
        <div
          className="section-title"
          style={{
            textAlign: "center",
            marginBottom: "2.5rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.75rem, 5vw, 2.25rem)",
              fontWeight: "700",
              color: "#333",
              position: "relative",
              display: "inline-block",
              padding: "0 0 15px 0",
            }}
          >
            Our Clients
            <span
              style={{
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "4px",
                background: "linear-gradient(90deg, #6e8efb, #a777e3)",
                borderRadius: "2px",
              }}
            ></span>
          </h2>
        </div>

        <div
          className="testimonials-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "0.5rem",
            margin: "0.5rem 0",
          }}
        >
          {props.data ? (
            props.data.map((d, i) => (
              <div
                key={`${d.name}-${i}`}
                className="testimonial-item"
                style={{
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  className="testimonial"
                  style={{
                    background: "white",
                    borderRadius: "72px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                    padding: "1.5rem",
                    height: "100%",
                    
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  {/* Decorative accent */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "10",
                      width: "100%",
                      height: "3px",
                      background: gradients[i % gradients.length],
                    }}
                  ></div>

                  {/* Logo Section */}
                  <div
                    className="logo-container"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "0.3rem",
                      height: "100px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="company-logo"
                      style={{
                        maxWidth: "120px",
                        maxHeight: "80px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={d.img}
                        alt={`${d.name} logo`}
                        style={{
                          maxWidth: "110%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Company name */}
                  {/* <div
                    className="company-name"
                    style={{
                      textAlign: "center",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <h3
                      style={{
                        margin: "0 0 0.25rem 0",
                        fontSize: "clamp(1rem, 3vw, 1.25rem)",
                        fontWeight: "700",
                        background: gradients[i % gradients.length],
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {d.name}
                    </h3>
                    {d.position && (
                      <p
                        style={{
                          margin: "0",
                          fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                          color: "#777",
                        }}
                      >
                        {d.position}
                      </p>
                    )}
                  </div> */}

                  {/* Testimonial text */}
                  {/* <div
                    className="testimonial-text"
                    style={{
                      fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
                      color: "#555",
                      lineHeight: "1.6",
                      flex: "1",
                      textAlign: "center",
                    }}
                  >
                    {d.text}
                  </div> */}

                  <div
                    className="testimonial-rating"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      color: "#FFD700",
                      fontSize: "clamp(1rem, 3vw, 1.125rem)",
                      marginTop: "1rem",
                    }}
                  >
                    {d.rating && Array.from({ length: d.rating }, (_, i) => (
                      <span key={i} style={{ margin: "0 2px" }}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ 
              textAlign: "center", 
              padding: "2rem", 
              gridColumn: "1 / -1",
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)"
            }}>
              Loading partners...
            </div>
          )}
        </div>
      </div>

      {/* Style for hover effects and responsive design */}
      <style>
        {`
          .testimonial-item:hover {
            transform: translateY(-2px);
          }
          
          .testimonial-item:hover .testimonial {
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
          }
          
          @media (max-width: 768px) {
            .testimonials-grid {
              grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
              gap: 1rem;
            }
            
            .testimonial {
              padding: 1.25rem;
            }
            
            .logo-container {
              height: 80px;
              margin-bottom: 1.5rem;
            }
            
            .company-logo {
              max-width: 150px;
              max-height: 90px;
            }
          }
          
          @media (max-width: 480px) {
            .testimonials-grid {
              grid-template-columns: 1fr;
            }
            
            #testimonials {
              padding: 3rem 0.75rem;
            }
          }
        `}
      </style>
    </div>
  );
};