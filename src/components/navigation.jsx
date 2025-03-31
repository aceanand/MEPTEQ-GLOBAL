import React, { useState, useEffect } from "react";
import logo from "../img/logo.ico";

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Styles
  const styles = {
    navigationWrapper: {
      width: "100%",
    },
    topBar: {
      backgroundColor: "#0b3c5d",
      padding: "8px 0",
      color: "#fff",
    },
    container: {
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 15px",
    },
    row: {
      display: "flex",
      flexWrap: "wrap",
      margin: "0 -15px",
    },
    colLg6: {
      flex: "0 0 50%",
      maxWidth: "50%",
      padding: "0 15px",
      "@media (max-width: 991px)": {
        flex: "0 0 100%",
        maxWidth: "100%",
        textAlign: "center",
      },
    },
    contactInfo: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      "@media (max-width: 991px)": {
        justifyContent: "center",
        marginBottom: "10px",
      },
    },
    contactItem: {
      display: "flex",
      alignItems: "center",
      marginRight: "20px",
      color: "#fff",
      textDecoration: "none",
      transition: "color 0.3s ease",
    },
    icon: {
      marginRight: "8px",
      fontSize: "16px",
    },
    socialMedia: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      "@media (max-width: 991px)": {
        justifyContent: "center",
      },
    },
    socialLink: {
      color: "#fff",
      marginLeft: "15px",
      fontSize: "16px",
      transition: "all 0.3s ease",
    },
    mainNav: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      padding: "15px 0",
      position: "sticky",
      top: 0,
      width: "100%",
      zIndex: 1000,
      transition: "all 0.3s ease",
    },
    scrolledNav: {
      padding: "10px 0",
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    },
    navContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logoContainer: {
      flex: "0 0 auto",
    },
    logo: {
      display: "block",
    },
    logoImg: {
      height: scrolled ? "40px" : "50px",
      width: "auto",
      transition: "all 0.3s ease",
    },
    menuToggle: {
      display: "none",
      flexDirection: "column",
      cursor: "pointer",
      position: "relative",
      width: "30px",
      height: "20px",
      "@media (max-width: 991px)": {
        display: "flex",
      },
    },
    menuBar: {
      display: "block",
      height: "3px",
      width: "100%",
      backgroundColor: "#333",
      marginBottom: "5px",
      borderRadius: "3px",
      transition: "all 0.3s ease",
    },
    menuBarTop: {
      transform: isOpen ? "rotate(45deg) translate(5px, 6px)" : "none",
    },
    menuBarMiddle: {
      opacity: isOpen ? 0 : 1,
    },
    menuBarBottom: {
      transform: isOpen ? "rotate(-45deg) translate(5px, -6px)" : "none",
      marginBottom: 0,
    },
    navigationMenu: {
      "@media (max-width: 991px)": {
        position: "absolute",
        top: "100%",
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
        maxHeight: isOpen ? "400px" : "0",
        overflow: "hidden",
        transition: "max-height 0.5s ease",
      },
    },
    navList: {
      display: "flex",
      margin: 0,
      padding: 0,
      listStyle: "none",
      "@media (max-width: 991px)": {
        flexDirection: "column",
        padding: isOpen ? "10px 0" : "0",
      },
    },
    navItem: {
      margin: "0 5px",
      "@media (max-width: 991px)": {
        margin: 0,
        textAlign: "center",
      },
    },
    navLink: {
      display: "block",
      padding: "10px 15px",
      color: "#333",
      fontWeight: 500,
      textDecoration: "none",
      transition: "all 0.3s ease",
      position: "relative",
      "@media (max-width: 991px)": {
        padding: "12px 15px",
      },
    },
    activeNavLink: {
      color: "#0b3c5d",
    },
    hideOnMobile: {
      "@media (max-width: 767px)": {
        display: "none",
      },
    },
  };

  // Media query management for inline styles
  const isMobile = window.innerWidth <= 767;
  const isTablet = window.innerWidth <= 991;

  return (
    <div style={styles.navigationWrapper}>
      {/* Top Bar with Contact Info and Social Media */}
      <div style={{ ...styles.topBar, ...(isMobile && { display: "none" }) }}>
        <div style={styles.container}>
          <div style={styles.row}>
            <div
              style={{
                flex: isTablet ? "0 0 100%" : "0 0 50%",
                maxWidth: isTablet ? "100%" : "50%",
                padding: "0 15px",
                textAlign: isTablet ? "center" : "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: isTablet ? "center" : "flex-start",
                  marginBottom: isTablet ? "10px" : 0,
                }}
              >
                <a href="tel:+917798097620" style={styles.contactItem}>
                  <i className="fa fa-phone" style={styles.icon}></i>
                  <span>+91-7798097620</span>
                </a>
                <a
                  href="mailto:Info.mepteq@gmail.com"
                  style={styles.contactItem}
                >
                  <i className="fa fa-envelope" style={styles.icon}></i>
                  <span>Info.mepteq@gmail.com</span>
                </a>
              </div>
            </div>
            <div
              style={{
                flex: isTablet ? "0 0 100%" : "0 0 50%",
                maxWidth: isTablet ? "100%" : "50%",
                padding: "0 15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: isTablet ? "center" : "flex-end",
                  alignItems: "center",
                }}
              >
                <a href="/" aria-label="Facebook" style={styles.socialLink}>
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="/" aria-label="Twitter" style={styles.socialLink}>
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="/" aria-label="YouTube" style={styles.socialLink}>
                  <i className="fa fa-youtube"></i>
                </a>
                <a href="/" aria-label="LinkedIn" style={styles.socialLink}>
                  <i className="fa fa-linkedin"></i>
                </a>
                <a href="/" aria-label="Instagram" style={styles.socialLink}>
                  <i className="fa fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        style={{
          ...styles.mainNav,
          ...(scrolled && styles.scrolledNav),
        }}
      >
        <div style={styles.container}>
          <div style={styles.navContainer}>
            <div style={styles.logoContainer}>
              <a href="#page-top" style={styles.logo}>
                <img
                  src={logo}
                  alt="Company Logo"
                  style={{
                    height: scrolled ? "40px" : "50px",
                    width: "auto",
                    transition: "all 0.3s ease",
                  }}
                />
              </a>
            </div>

            <div
              style={{
                display: isTablet ? "flex" : "none",
                flexDirection: "column",
                cursor: "pointer",
                position: "relative",
                width: "30px",
                height: "20px",
              }}
              onClick={toggleMenu}
            >
              <span
                style={{
                  ...styles.menuBar,
                  ...(isOpen && {
                    transform: "rotate(45deg) translate(5px, 6px)",
                  }),
                }}
              ></span>
              <span
                style={{
                  ...styles.menuBar,
                  ...(isOpen && { opacity: 0 }),
                }}
              ></span>
              <span
                style={{
                  ...styles.menuBar,
                  marginBottom: 0,
                  ...(isOpen && {
                    transform: "rotate(-45deg) translate(5px, -6px)",
                  }),
                }}
              ></span>
            </div>

            <div
              style={{
                ...(isTablet && {
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  backgroundColor: "#fff",
                  boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
                  maxHeight: isOpen ? "400px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.5s ease",
                }),
              }}
            >
              <ul
                style={{
                  display: "flex",
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  ...(isTablet && {
                    flexDirection: "column",
                    padding: isOpen ? "10px 0" : "0",
                  }),
                }}
              >
                <li
                  style={{
                    margin: "0 5px",
                    ...(isTablet && {
                      margin: 0,
                      textAlign: "center",
                    }),
                  }}
                >
                  <a
                    href="/"
                    style={{
                      ...styles.navLink,
                      ...styles.activeNavLink,
                    }}
                  >
                    Home
                  </a>
                </li>
                <li
                  style={{
                    margin: "0 5px",
                    ...(isTablet && {
                      margin: 0,
                      textAlign: "center",
                    }),
                  }}
                >
                  <a href="#about" style={styles.navLink}>
                    About
                  </a>
                </li>
                <li
                  style={{
                    margin: "0 5px",
                    ...(isTablet && {
                      margin: 0,
                      textAlign: "center",
                    }),
                  }}
                >
                  <a href="#hvac-system" style={styles.navLink}>
                    Services
                  </a>
                </li>
                <li
                  style={{
                    margin: "0 5px",
                    ...(isTablet && {
                      margin: 0,
                      textAlign: "center",
                    }),
                  }}
                >
                  <a href="#Portfolio" style={styles.navLink}>
                    Projects
                  </a>
                </li>
                <li
                  style={{
                    margin: "0 5px",
                    ...(isTablet && {
                      margin: 0,
                      textAlign: "center",
                    }),
                  }}
                >
                  <a href="#testimonials" style={styles.navLink}>
                    Testimonials
                  </a>
                </li>
                <li
                  style={{
                    margin: "0 5px",
                    ...(isTablet && {
                      margin: 0,
                      textAlign: "center",
                    }),
                  }}
                >
                  <a href="#contact" style={styles.navLink}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
