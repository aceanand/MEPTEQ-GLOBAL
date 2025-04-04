import { Image } from "./image";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import { styled, keyframes } from "@mui/material/styles";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import BalconyIcon from "@mui/icons-material/Balcony";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import WaterIcon from "@mui/icons-material/Water";
import SanitizerIcon from "@mui/icons-material/Sanitizer";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { motion } from "framer-motion";
import Fade from "@mui/material/Fade";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

// Enhanced animations
const shimmer = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const glowBorder = keyframes`
  0% { box-shadow: 0 0 0 rgba(33, 150, 243, 0); }
  50% { box-shadow: 0 0 10px rgba(33, 150, 243, 0.5); }
  100% { box-shadow: 0 0 0 rgba(33, 150, 243, 0); }
`;

// Styled components with improved design
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.8),
  height: "100%",
  borderRadius: "10px",
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  overflow: "hidden",
  position: "relative",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  display: "flex",
  alignItems: "center",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #2196f3, #00bcd4, #2196f3)",
    backgroundSize: "200% 100%",
    animation: `${shimmer} 3s infinite linear`,
  },
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
    animation: `${glowBorder} 1.5s infinite`,
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
  border: "1px solid rgba(33, 150, 243, 0.2)",
  "&:hover": {
    transform: "translateY(-10px) scale(1.02)",
    boxShadow: "0 15px 30px rgba(33, 150, 243, 0.15)",
    "& .card-media": {
      transform: "scale(1.08)",
    },
    "& .card-overlay": {
      opacity: 0.7,
    },
    "& .card-title": {
      color: theme.palette.primary.main,
    },
  },
}));

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
}));

const TitleBox = styled(Box)(({ theme }) => ({
  position: "relative",
  marginBottom: theme.spacing(4),

  padding: theme.spacing(1),
  "&::after": {
    content: '""',
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: "-12px",
    width: "80px",
    height: "4px",
    background: "linear-gradient(90deg, #2196f3, #00bcd4, #2196f3)",
    backgroundSize: "200% 100%",
    animation: `${shimmer} 3s infinite linear`,
    borderRadius: "4px",
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "rgba(33, 150, 243, 0.1)",
  marginRight: theme.spacing(1.5),
  transition: "all 0.3s ease",
  "& .MuiSvgIcon-root": {
    fontSize: "1.5rem",
    transition: "transform 0.3s ease",
  },
  "&:hover": {
    background: "rgba(33, 150, 243, 0.2)",
    transform: "scale(1.1)",
    "& .MuiSvgIcon-root": {
      transform: "rotate(10deg)",
    },
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: "-8px",
    width: "40px",
    height: "3px",
    backgroundColor: theme.palette.primary.main,
  },
}));

export const Plumber = (props) => {
  const [loaded, setLoaded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setLoaded(true);
  }, []);

  const services = [
    {
      icon: <WaterDropIcon style={{ color: "#2196f3" }} />,
      text: "Water Supply",
    },
    {
      icon: <PlumbingIcon style={{ color: "#3f51b5" }} />,
      text: "Drainage & Sewerage",
    },
    {
      icon: <BalconyIcon style={{ color: "#673ab7" }} />,
      text: "Building Plumbing",
    },
    {
      icon: <FilterAltIcon style={{ color: "#009688" }} />,
      text: "Water Filtration",
    },
    {
      icon: <WaterIcon style={{ color: "#03a9f4" }} />,
      text: "Waste Water Treatment",
    },
    { icon: <SanitizerIcon style={{ color: "#4caf50" }} />, text: "RO Plant" },
    {
      icon: <LocalFireDepartmentIcon style={{ color: "#f44336" }} />,
      text: "Gas Distribution",
    },
  ];

  // Animation variants - enhanced for visual appeal
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10,
      },
    },
  };

  return (
    <Box
      id="portfolio"
      sx={{
        py: { xs: 4, md: 6 },
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        borderTop: "1px solid rgba(0,0,0,0.05)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <Container maxWidth="lg">
        <Fade in={loaded} timeout={800}>
          <TitleBox textAlign="center">
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
                fontWeight: 700,
                color: theme.palette.primary.dark,
                letterSpacing: "1px",
                textShadow: "0px 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              PLUMBING & FIRE PROTECTION
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 1, fontSize: { xs: "0.875rem", md: "1rem" } }}
            >
              State-of-the-art solutions for all your needs
            </Typography>
          </TitleBox>
        </Fade>

        <Box mb={5}>
          <SectionTitle
            variant="h5"
            sx={{
              ml: { xs: 1, md: 2 },
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            Our Services
          </SectionTitle>
          <Box
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            sx={{ mt: 3 }}
          >
            <Grid
              container
              spacing={{ xs: 2, sm: 2, md: 3 }}
              alignItems="stretch"
            >
              {services.map((service, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  component={motion.div}
                  variants={itemVariants}
                >
                  <StyledPaper elevation={2}>
                    <IconContainer>{service.icon}</IconContainer>
                    <ListItemText
                      primary={service.text}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                      }}
                    />
                  </StyledPaper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        <Divider sx={{ my: 4, opacity: 0.6 }} />

        <Box mb={2}>
          <SectionTitle
            variant="h5"
            sx={{
              ml: { xs: 1, md: 2 },
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            Our Projects
          </SectionTitle>
          <Box
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            sx={{ mt: 3 }}
          >
            <Grid
              container
              spacing={{ xs: 2, sm: 3, md: 3 }}
              alignItems="stretch"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              {props.data ? (
                props.data.map((d, i) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={`${d.title}-${i}`}
                    component={motion.div}
                    variants={itemVariants}
                    sx={{ display: "flex" }}
                  >
                    <StyledCard elevation={3} sx={{ width: "100%" }}>
                      <CardMediaStyled
                        component="div"
                        className="card-media"
                        sx={{
                          position: "relative",
                          paddingTop: { xs: "60%", md: "65%" },
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundImage: `url(${d.smallImage})`,
                        }}
                      >
                        <Box
                          className="card-overlay"
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "50%",
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                            opacity: 0.5,
                            transition: "opacity 0.3s ease",
                          }}
                        />
                      </CardMediaStyled>
                      <CardContent
                        sx={{
                          py: { xs: 2, md: 2.5 },
                          px: { xs: 2, md: 2.5 },
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          background:
                            "linear-gradient(to bottom, #fff 0%, #f5f7fa 100%)",
                        }}
                      >
                        <Typography
                          className="card-title"
                          variant="h6"
                          component="h3"
                          textAlign="center"
                          fontWeight="600"
                          sx={{
                            fontSize: {
                              xs: "1rem",
                              sm: "1.125rem",
                              md: "1.25rem",
                            },
                            color: theme.palette.text.primary,
                            transition: "color 0.3s ease",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {d.title}
                        </Typography>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    py: { xs: 4, md: 6 },
                  }}
                >
                  <CircularProgress
                    size={isMobile ? 32 : 40}
                    thickness={4}
                    sx={{
                      color: theme.palette.primary.main,
                      animation: `${pulse} 1.5s infinite ease-in-out`,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      ml: 2,
                      fontSize: { xs: "1rem", md: "1.125rem" },
                      fontWeight: 500,
                      color: theme.palette.primary.main,
                    }}
                  >
                    Loading projects...
                  </Typography>
                </Box>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
