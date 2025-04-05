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
  ListItemIcon,
  Collapse,
  useScrollTrigger,
  styled,
  alpha,
  Badge
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

// Logo import
import logo from "../img/logo.ico";

// Custom styled components
const StyledAppBar = styled(AppBar)(({ theme, trigger }) => ({
  transition: "all 0.3s ease",
  boxShadow: trigger ? theme.shadows[4] : theme.shadows[1],
  backgroundColor: "white",
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
  height: trigger ? 40 : 50,
  transition: "height 0.3s ease",
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  margin: theme.spacing(0, 0.5),
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  fontWeight: 500,
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 4,
    left: 8,
    right: 8,
    height: 2,
    backgroundColor: theme.palette.primary.main,
    transform: active ? "scaleX(1)" : "scaleX(0)",
    transformOrigin: "bottom left",
    transition: "transform 0.3s ease",
  },
  "&:hover::after": {
    transform: "scaleX(1)",
  },
}));

const TopBarButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: 500,
  fontSize: "0.875rem",
  padding: theme.spacing(0.5, 1),
  "&:hover": {
    backgroundColor: alpha("#ffffff", 0.1),
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: "white",
  padding: theme.spacing(0.75),
  "&:hover": {
    backgroundColor: alpha("#ffffff", 0.1),
    transform: "scale(1.1)",
    transition: "transform 0.2s",
  },
}));

const TopBar = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  padding: theme.spacing(1, 0),
  color: "white",
}));

const MobileTopBar = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  padding: theme.spacing(1, 0),
  color: "white",
}));

const MobileNavItem = styled(ListItem)(({ theme, active }) => ({
  borderLeft: active ? `4px solid ${theme.palette.primary.main}` : "4px solid transparent",
  transition: "border-left 0.2s ease, background-color 0.2s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    borderLeft: `4px solid ${theme.palette.primary.main}`,
  },
}));

const MobileContactButton = styled(Button)(({ theme }) => ({
  minWidth: 0,
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha("#ffffff", 0.15),
  color: "white",
  padding: theme.spacing(0.5, 1.5),
  fontSize: "0.75rem",
  fontWeight: 500,
  textTransform: "none",
  "&:hover": {
    backgroundColor: alpha("#ffffff", 0.25),
  },
}));

export const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  useEffect(() => {
    // Lock body scroll when mobile drawer is open
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleServicesToggle = () => {
    setServicesOpen(!servicesOpen);
  };

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  const navItems = [
    { name: "Home", link: "/", active: true },
    { name: "About", link: "#about", active: false },
    { name: "Projects", link: "#Portfolio", active: false },
    { name: "Services", link: "#HVAC", active: false },
    
    { name: "Clients", link: "#Testimonials", active: false },
    // { name: "Contact", link: "#Contact", active: false },
  ];

  const drawer = (
    <Box sx={{ width: 270, height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton onClick={handleDrawerToggle} size="large">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <React.Fragment key={item.name}>
            <MobileNavItem
              button
              onClick={item.name === "Services" ? handleServicesToggle : handleNavClick}
              active={item.active ? 1 : 0}
              component={item.name !== "Services" ? "a" : "div"}
              href={item.name !== "HVAC" ? item.link : undefined}
            >
              <ListItemText 
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: item.active ? 600 : 500,
                  color: item.active ? "primary.main" : "text.primary",
                }}
              />
              {item.name === "Services" && (servicesOpen ? <ExpandLess /> : <ExpandMore />)}
            </MobileNavItem>
            
            {item.name === "Services" && (
              <Collapse in={servicesOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button component="a" href="#hvac-service-1" onClick={handleNavClick} sx={{ pl: 4 }}>
                    <ListItemText primary="HVAC Design" />
                  </ListItem>
                  <ListItem button component="a" href="#hvac-service-2" onClick={handleNavClick} sx={{ pl: 4 }}>
                    <ListItemText primary="Ventilation Systems" />
                  </ListItem>
                  <ListItem button component="a" href="#hvac-service-3" onClick={handleNavClick} sx={{ pl: 4 }}>
                    <ListItemText primary="Air Conditioning" />
                  </ListItem>
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
      
      <Divider />
      
      <Box sx={{ p: 2, backgroundColor: "grey.100" }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
          Contact Us
        </Typography>
        
        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
          <PhoneIcon fontSize="small" color="primary" sx={{ mr: 1.5 }} />
          <Typography variant="body2" component="a" href="tel:+917798097620" sx={{ color: "text.primary", textDecoration: "none" }}>
            +91-7798097620
          </Typography>
        </Box>
        
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <EmailIcon fontSize="small" color="primary" sx={{ mr: 1.5 }} />
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
              display: "block"
            }}
          >
            dhake9322@gmail.com
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-around" }}>
        <IconButton color="primary" size="small" component="a" href="/" aria-label="Facebook">
          <FacebookIcon fontSize="small" />
        </IconButton>
        <IconButton color="primary" size="small" component="a" href="/" aria-label="Twitter">
          <TwitterIcon fontSize="small" />
        </IconButton>
        <IconButton color="primary" size="small" component="a" href="/" aria-label="LinkedIn">
          <LinkedInIcon fontSize="small" />
        </IconButton>
        <IconButton color="primary" size="small" component="a" href="/" aria-label="Instagram">
          <InstagramIcon fontSize="small" />
        </IconButton>
        <IconButton color="primary" size="small" component="a" href="/" aria-label="YouTube">
          <YouTubeIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Top Bar with Contact Info and Social Media - Desktop */}
      <Hidden smDown>
      <TopBar>
  <Container maxWidth="lg">
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TopBarButton
          startIcon={<PhoneIcon sx={{ fontSize: 20 }} />}
          href="tel:+917798097620"
          sx={{ fontSize: 16 }} // Set text size here
        >
          +91-7798097620
        </TopBarButton>
        <TopBarButton
          startIcon={<EmailIcon sx={{ fontSize: 20 }} />}
          href="mailto:dhake9322@gmail.com"
          sx={{ fontSize: 16 }} // Set text size here
        >
          dhake9322@gmail.com
        </TopBarButton>
      </Box>

      <Box>
        <SocialIcon size="small" aria-label="Facebook" href="/">
          <FacebookIcon sx={{ fontSize: 20 }} />
        </SocialIcon>
        <SocialIcon size="small" aria-label="Twitter" href="/">
          <TwitterIcon sx={{ fontSize: 20 }} />
        </SocialIcon>
        <SocialIcon size="small" aria-label="YouTube" href="/">
          <YouTubeIcon sx={{ fontSize: 20 }} />
        </SocialIcon>
        <SocialIcon size="small" aria-label="LinkedIn" href="/">
          <LinkedInIcon sx={{ fontSize: 20 }} />
        </SocialIcon>
        <SocialIcon size="small" aria-label="Instagram" href="/">
          <InstagramIcon sx={{ fontSize: 20 }} />
        </SocialIcon>
      </Box>
    </Box>
  </Container>
</TopBar>

      </Hidden>

      {/* Enhanced Mobile Top Bar */}
      <Hidden smUp>
        <MobileTopBar>
          <Container maxWidth="lg" disableGutters>
            <Box 
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                px: 2,
                py: 0.5
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <MobileContactButton 
                  startIcon={<PhoneIcon sx={{ fontSize: 16 }} />} 
                  href="tel:+917798097620"
                >
                  Call
                </MobileContactButton>
                
                <MobileContactButton 
                  startIcon={<WhatsAppIcon sx={{ fontSize: 16 }} />} 
                  href="https://wa.me/917798097620"
                >
                  Chat
                </MobileContactButton>
              </Box>
              
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                {/* <Badge color="secondary" variant="dot" invisible={false}>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      color: "white", 
                      backgroundColor: alpha("#ffffff", 0.12),
                      width: 28, 
                      height: 28 
                    }}
                    component="a"
                    href="#contact"
                  >
                    <LocationOnIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Badge> */}
                
                <IconButton 
                  size="small" 
                  sx={{ 
                    color: "white", 
                    backgroundColor: alpha("#ffffff", 0.12),
                    width: 28, 
                    height: 28 
                  }}
                  component="a"
                  href="dhake9322@gmail.com"
                >
                  <EmailIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </Box>
          </Container>
        </MobileTopBar>
      </Hidden>

      {/* Main Navigation Bar */}
      <StyledAppBar position="sticky" trigger={trigger ? 1 : 0} elevation={trigger ? 4 : 1}>
        <Container maxWidth="lg">
          <StyledToolbar trigger={trigger ? 1 : 0} disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
              <Box component="a" href="#page-top" sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                <Logo src={logo} alt="Company Logo" trigger={trigger ? 1 : 0} />
              </Box>
            </Box>

            {/* Desktop Navigation */}
            <Hidden mdDown>
            <Box sx={{ display: "flex" }}>
  {navItems.map((item) => (
    <NavButton 
      key={item.name}
      component="a"
      href={item.link}
      active={item.active ? 1 : 0}
      sx={{ fontSize: 14 }} // Increase text size here (e.g., 18px)
    >
      {item.name}
    </NavButton>
  ))}
</Box>

            </Hidden>

            {/* Mobile Menu Toggle Button */}
            <Hidden mdUp>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: "text.primary" }}
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
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
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