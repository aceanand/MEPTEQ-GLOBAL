import React, { useEffect, useRef, useState } from "react";

export const Testimonials = (props) => {
  const scrollRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!props.data || props.data.length === 0) return;

    // Set component as visible for animation entrance
    setIsVisible(true);

    // Clone testimonials for continuous scroll
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollTrack = scrollContainer.querySelector(".testimonial-track");
    const items = scrollContainer.querySelectorAll(".testimonial-item");

    items.forEach((item) => {
      const clone = item.cloneNode(true);
      scrollTrack.appendChild(clone);
    });
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
        padding: "70px 0",
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
          top: "-150px",
          left: "-150px",
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
        }}
      ></div>

      <div
        className="container"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}
      >
        <div
          className="section-title"
          style={{
            textAlign: "center",
            marginBottom: "50px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#333",
              position: "relative",
              display: "inline-block",
              padding: "0 0 15px 0",
            }}
          >
            What our clients say
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
          className="testimonial-scroll-container"
          ref={scrollRef}
          style={{
            width: "100%",
            overflow: "hidden",
            position: "relative",
            marginTop: "30px",
            padding: "20px 0",
          }}
        >
          <div
            className="testimonial-track"
            style={{
              display: "flex",
              animation: "scroll 25s linear infinite",
              width: "fit-content",
            }}
          >
            {props.data ? (
              props.data.map((d, i) => (
                <div
                  key={`${d.name}-${i}`}
                  className="testimonial-item"
                  style={{
                    flex: "0 0 350px",
                    margin: "0 20px",
                    transition: "all 0.5s ease",
                  }}
                >
                  <div
                    className="testimonial"
                    style={{
                      background: "white",
                      borderRadius: "12px",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                      padding: "30px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      transform: "translateY(0)",
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* Decorative accent */}
                    <div
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "6px",
                        background: gradients[i % gradients.length],
                      }}
                    ></div>

                    <div
                      className="testimonial-image"
                      style={{
                        width: "80px",
                        height: "80px",
                        overflow: "hidden",
                        borderRadius: "50%",
                        margin: "15px auto 25px",
                        border: "4px solid #f8f8f8",
                        boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <img
                        src={d.img}
                        alt={`${d.name}'s testimonial`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <div
                      className="testimonial-content"
                      style={{
                        flexGrow: "1",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        zIndex: "1",
                      }}
                    >
                      {/* Quote icon */}
                      <div
                        style={{
                          position: "absolute",
                          top: "-40px",
                          right: "-10px",
                          fontSize: "120px",
                          opacity: "0.07",
                          fontFamily: "Georgia",
                          zIndex: "-1",
                        }}
                      >
                        "
                      </div>

                      <p
                        style={{
                          fontStyle: "italic",
                          marginBottom: "20px",
                          fontSize: "16px",
                          lineHeight: "1.8",
                          color: "#555",
                          flexGrow: "1",
                        }}
                      >
                        "{d.text}"
                      </p>

                      <div
                        className="testimonial-meta"
                        style={{
                          fontWeight: "700",
                          fontSize: "16px",
                          textAlign: "right",
                          background: "linear-gradient(90deg, #333, #777)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        - {d.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "20px" }}>
                Loading testimonials...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Style for animation */}
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .testimonial-item:hover {
            transform: translateY(-10px) scale(1.03);
          }
          
          .testimonial-item:hover .testimonial {
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }
          
          .testimonial-scroll-container:hover .testimonial-track {
            animation-play-state: paused;
          }
        `}
      </style>
    </div>
  );
};
