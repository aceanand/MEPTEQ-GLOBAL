import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
  Hidden,
  Divider,
  Collapse,
  useScrollTrigger,
  styled,
  alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { keyframes } from "@emotion/react";

// Logo import
import logo from "../img/logo.ico";

// More subtle gradient animation
const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Custom styled components
const StyledAppBar = styled(AppBar)(({ theme, trigger }) => ({
  transition: "all 0.3s ease",
  boxShadow: trigger ? "0 4px 20px rgba(0, 0, 0, 0.08)" : "none",
  backgroundColor: "white",
  borderBottom: trigger
    ? "none"
    : `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

const StyledToolbar = styled(Toolbar)(({ theme, trigger }) => ({
  minHeight: trigger ? 64 : 80,
  transition: "min-height 0.3s ease",
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(0, 3),
  },
}));

const Logo = styled("img")(({ theme, trigger }) => ({
  height: trigger ? 45 : 52,
  transition: "height 0.3s ease",
  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08))",
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  margin: theme.spacing(0, 0.8),
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.8, 1.8),
  textTransform: "none",
  fontSize: "0.95rem",
  letterSpacing: "0.3px",
  position: "relative",
  backgroundColor: active
    ? alpha(theme.palette.primary.main, 0.08)
    : "transparent",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 6,
    left: active ? 12 : "50%",
    width: active ? "calc(100% - 24px)" : 0,
    height: 2,
    backgroundColor: theme.palette.primary.main,
    transform: active ? "none" : "translateX(-50%)",
    transition: "all 0.3s ease",
    borderRadius: 1,
  },
  "&:hover::after": {
    width: "calc(100% - 24px)",
    left: 12,
    transform: "none",
  },
}));

const TopBarButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: 500,
  fontSize: "0.85rem",
  padding: theme.spacing(0.4, 1.2),
  borderRadius: 4,
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: alpha("#ffffff", 0.15),
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: "white",
  padding: theme.spacing(0.6),
  margin: theme.spacing(0, 0.3),
  backgroundColor: alpha("#ffffff", 0.1),
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: alpha("#ffffff", 0.2),
  },
}));

const TopBar = styled(Box)(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
  backgroundSize: "200% 200%",
  animation: `${gradient} 20s ease infinite`,
  padding: theme.spacing(0.8, 0),
  color: "white",
}));

const MobileTopBar = styled(Box)(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
  backgroundSize: "200% 200%",
  animation: `${gradient} 20s ease infinite`,
  padding: theme.spacing(0.8, 0),
  color: "white",
}));

const MobileNavItem = styled(ListItem)(({ theme, active }) => ({
  borderLeft: active
    ? `4px solid ${theme.palette.primary.main}`
    : "4px solid transparent",
  transition: "all 0.2s ease",
  padding: theme.spacing(1.2, 2),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    borderLeft: `4px solid ${theme.palette.primary.main}`,
  },
}));

const MobileContactButton = styled(Button)(({ theme }) => ({
  borderRadius: 4,
  backgroundColor: alpha("#ffffff", 0.15),
  color: "white",
  padding: theme.spacing(0.5, 1.6),
  fontSize: "0.8rem",
  fontWeight: 500,
  textTransform: "none",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: alpha("#ffffff", 0.25),
  },
}));

const CallNowButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: 600,
  padding: theme.spacing(0.8, 2.4),
  borderRadius: 4,
  marginLeft: theme.spacing(2),
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
  textTransform: "none",
  transition: "all 0.2s ease",
  "&:hover": {
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    filter: "brightness(1.05)",
  },
}));

export const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.hash || "/");
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  useEffect(() => {
    // Set initial path
    setCurrentPath(window.location.hash || "/");

    // Add listener for hash changes
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || "/");
    };

    // Hide/show navbar on scroll
    const controlNavbar = () => {
      if (window.scrollY > 100) {
        if (window.scrollY > lastScrollY && !mobileOpen) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        setLastScrollY(window.scrollY);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", controlNavbar);

    // Lock body scroll when mobile drawer is open
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [mobileOpen, lastScrollY]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleServicesToggle = () => {
    setServicesOpen(!servicesOpen);
  };

  const handleNavClick = (path) => {
    setCurrentPath(path);
    setMobileOpen(false);
  };

  // Navigation items
  const navItems = [
    { name: "Home", link: "/", active: currentPath === "/" },
    { name: "About", link: "#about", active: currentPath === "#about" },
    {
      name: "Projects",
      link: "#Portfolio",
      active: currentPath === "#Portfolio",
    },
    { name: "Services", link: "#HVAC", active: currentPath === "#HVAC" },
    {
      name: "Clients",
      link: "#Testimonials",
      active: currentPath === "#Testimonials",
    },
    { name: "Contact", link: "#Contact", active: currentPath === "#Contact" },
  ];

  const drawer = (
    <Box sx={{ width: 270, height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          backgroundColor: (theme) => theme.palette.primary.main,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Logo src={logo} alt="HVAC Pro Logo" sx={{ height: 38, mr: 1 }} />
          <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
            HVAC Pro
          </Typography>
        </Box>
        <IconButton
          onClick={handleDrawerToggle}
          size="medium"
          sx={{ color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ pt: 0.5 }}>
        {navItems.map((item) => (
          <React.Fragment key={item.name}>
            <MobileNavItem
              button
              onClick={
                item.name === "Services"
                  ? handleServicesToggle
                  : () => handleNavClick(item.link)
              }
              active={item.active ? 1 : 0}
              component={item.name !== "Services" ? "a" : "div"}
              href={item.name !== "HVAC" ? item.link : undefined}
            >
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: item.active ? 700 : 500,
                  color: item.active ? "primary.main" : "text.primary",
                  fontSize: "0.95rem",
                }}
              />
              {item.name === "Services" &&
                (servicesOpen ? <ExpandLess /> : <ExpandMore />)}
            </MobileNavItem>

            {item.name === "Services" && (
              <Collapse in={servicesOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component="a"
                    href="#hvac-service-1"
                    onClick={() => handleNavClick("#hvac-service-1")}
                    sx={{ pl: 4, py: 1 }}
                  >
                    <ListItemText
                      primary="HVAC Design"
                      primaryTypographyProps={{
                        fontSize: "0.9rem",
                      }}
                    />
                  </ListItem>
                  <ListItem
                    button
                    component="a"
                    href="#hvac-service-2"
                    onClick={() => handleNavClick("#hvac-service-2")}
                    sx={{ pl: 4, py: 1 }}
                  >
                    <ListItemText
                      primary="Ventilation Systems"
                      primaryTypographyProps={{
                        fontSize: "0.9rem",
                      }}
                    />
                  </ListItem>
                  <ListItem
                    button
                    component="a"
                    href="#hvac-service-3"
                    onClick={() => handleNavClick("#hvac-service-3")}
                    sx={{ pl: 4, py: 1 }}
                  >
                    <ListItemText
                      primary="Air Conditioning"
                      primaryTypographyProps={{
                        fontSize: "0.9rem",
                      }}
                    />
                  </ListItem>
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>

      <Divider />

      <Box sx={{ p: 3, backgroundColor: "grey.50" }}>
        <Typography
          variant="subtitle2"
          color="primary"
          sx={{
            mb: 2,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Contact Us
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              backgroundColor: "primary.main",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
            }}
          >
            <PhoneIcon fontSize="small" sx={{ color: "white" }} />
          </Box>
          <Typography
            variant="body2"
            component="a"
            href="tel:+917798097620"
            sx={{
              color: "text.primary",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            +91-7798097620
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              backgroundColor: "primary.main",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
            }}
          >
            <EmailIcon fontSize="small" sx={{ color: "white" }} />
          </Box>
          <Typography
            variant="body2"
            component="a"
            href="mailto:dhake9322@gmail.com"
            sx={{
              color: "text.primary",
              textDecoration: "none",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "190px",
              display: "block",
              fontWeight: 500,
            }}
          >
            dhake9322@gmail.com
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.08),
        }}
      >
        {[
          FacebookIcon,
          TwitterIcon,
          LinkedInIcon,
          InstagramIcon,
          YouTubeIcon,
        ].map((Icon, index) => (
          <IconButton
            key={index}
            color="primary"
            size="small"
            component="a"
            href="/"
            sx={{
              backgroundColor: "white",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
              "&:hover": {
                backgroundColor: "white",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.12)",
              },
            }}
          >
            <Icon fontSize="small" />
          </IconButton>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Top Bar with Contact Info and Social Media - Desktop */}
      <Hidden smDown>
        <TopBar>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TopBarButton
                  startIcon={<PhoneIcon sx={{ fontSize: 18 }} />}
                  href="tel:+917798097620"
                >
                  +91-7798097620
                </TopBarButton>
                <TopBarButton
                  startIcon={<EmailIcon sx={{ fontSize: 18 }} />}
                  href="mailto:dhake9322@gmail.com"
                >
                  dhake9322@gmail.com
                </TopBarButton>
                <TopBarButton
                  startIcon={<LocationOnIcon sx={{ fontSize: 18 }} />}
                  href="https://maps.google.com"
                >
                  Mumbai, India
                </TopBarButton>
              </Box>

              <Box>
                {[
                  FacebookIcon,
                  TwitterIcon,
                  YouTubeIcon,
                  LinkedInIcon,
                  InstagramIcon,
                ].map((Icon, index) => (
                  <SocialIcon
                    key={index}
                    size="small"
                    aria-label="Social Media"
                    href="/"
                  >
                    <Icon sx={{ fontSize: 18 }} />
                  </SocialIcon>
                ))}
              </Box>
            </Box>
          </Container>
        </TopBar>
      </Hidden>

      {/* Mobile Top Bar */}
      <Hidden smUp>
        <MobileTopBar>
          <Container maxWidth="lg" disableGutters>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
                py: 0.8,
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <MobileContactButton
                  startIcon={<PhoneIcon sx={{ fontSize: 16 }} />}
                  href="tel:+917798097620"
                >
                  Call Now
                </MobileContactButton>

                <MobileContactButton
                  startIcon={<WhatsAppIcon sx={{ fontSize: 16 }} />}
                  href="https://wa.me/917798097620"
                >
                  WhatsApp
                </MobileContactButton>
              </Box>

              <IconButton
                size="small"
                sx={{
                  color: "white",
                  backgroundColor: alpha("#ffffff", 0.15),
                  width: 30,
                  height: 30,
                  "&:hover": {
                    backgroundColor: alpha("#ffffff", 0.25),
                  },
                }}
                component="a"
                href="mailto:dhake9322@gmail.com"
              >
                <EmailIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Container>
        </MobileTopBar>
      </Hidden>

      {/* Main Navigation Bar */}
      <StyledAppBar
        position="sticky"
        trigger={trigger ? 1 : 0}
        elevation={0}
        sx={{
          top: visible ? 0 : -100,
          transition: "top 0.3s ease",
        }}
      >
        <Container maxWidth="lg">
          <StyledToolbar trigger={trigger ? 1 : 0} disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
              <Box
                component="a"
                href="#page-top"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <Logo
                  src={logo}
                  alt="HVAC Pro Logo"
                  trigger={trigger ? 1 : 0}
                />
                <Typography
                  variant="h6"
                  sx={{
                    ml: 1,
                    fontWeight: 700,
                    color: "primary.main",
                    display: { xs: "none", sm: "block" },
                    fontSize: trigger ? "1.2rem" : "1.35rem",
                    transition: "font-size 0.3s ease",
                  }}
                >
                  HVAC Pro
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation */}
            <Hidden mdDown>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {navItems.map((item) => (
                  <NavButton
                    key={item.name}
                    component="a"
                    href={item.link}
                    active={item.active ? 1 : 0}
                    onClick={() => handleNavClick(item.link)}
                  >
                    {item.name}
                  </NavButton>
                ))}
                <CallNowButton
                  component="a"
                  href="tel:+917798097620"
                  startIcon={<PhoneIcon />}
                >
                  Call Now
                </CallNowButton>
              </Box>
            </Hidden>

            {/* Mobile Menu Toggle Button */}
            <Hidden mdUp>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  color: "primary.main",
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.08),
                  "&:hover": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.12),
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </StyledToolbar>
        </Container>
      </StyledAppBar>

      {/* Mobile Navigation Drawer */}
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 270,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </Box>
  );
};
