import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Container,
  Typography,
  Grid,
  Box,
  Alert,
  AlertTitle,
  Paper,
  IconButton,
  Snackbar,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import {
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
} from "@mui/icons-material";

const initialState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    errorMessage: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    const { name, email, message } = formData;

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    // Clear error on change
    if (errors[name]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  // Clear form
  const clearForm = () => {
    setFormData({ ...initialState });
    setErrors({});
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitStatus({
      isSubmitting: true,
      isSuccess: false,
      errorMessage: "",
    });

    if (!validateForm()) {
      setSubmitStatus((prev) => ({
        ...prev,
        isSubmitting: false,
      }));
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted with:", formData);
      clearForm();
      setSubmitStatus({
        isSubmitting: false,
        isSuccess: true,
        errorMessage: "",
      });
      setSnackbarOpen(true);
    }, 1500);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      id="Contact"
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        pt: 8,
        pb: 10,
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "linear-gradient(45deg, #4a90e2, #63b3ed)",
          opacity: 0.1,
          top: "-100px",
          right: "-100px",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "linear-gradient(45deg, #f97316, #fb923c)",
          opacity: 0.1,
          bottom: "-50px",
          left: "-50px",
          zIndex: 0,
        }}
      />

      {/* Contact Section */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
              background: "linear-gradient(45deg, #3b82f6, #2563eb)",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0px 2px 5px rgba(0,0,0,0.2)",
              mb: 2,
            }}
          >
            Get In Touch
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              lineHeight: 1.8,
              color: "#4b5563",
              mb: 4,
              fontWeight: 400,
            }}
          >
            We'd love to hear from you! Whether you have a question about our
            services, pricing, or anything else, our team is ready to answer all
            your questions.
          </Typography>
          <Divider
            sx={{
              width: "100px",
              mx: "auto",
              borderColor: "#3b82f6",
              borderWidth: "2px",
              mb: 6,
            }}
          />
        </Box>

        <Grid
          container
          spacing={isMobile ? 6 : 8}
          justifyContent="space-between"
        >
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={10}
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                borderRadius: 4,
                background: "white",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  mb: 4,
                  fontWeight: 700,
                  color: "#1e3a8a",
                  fontSize: { xs: "1.75rem", sm: "2.5rem" },
                }}
              >
                Send Us A Message
              </Typography>

              {submitStatus.isSuccess && (
                <Alert
                  severity="success"
                  icon={<CheckCircleIcon fontSize="large" />}
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    backgroundColor: "rgba(84, 214, 44, 0.16)",
                    color: "#229A16",
                    "& .MuiAlert-icon": {
                      color: "#229A16",
                    },
                  }}
                >
                  <AlertTitle sx={{ fontWeight: 600 }}>Success</AlertTitle>
                  Thank you! Your message has been sent successfully. We'll get
                  back to you shortly.
                </Alert>
              )}

              {submitStatus.errorMessage && (
                <Alert
                  severity="error"
                  icon={<ErrorIcon fontSize="large" />}
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 86, 48, 0.16)",
                    color: "#B71D18",
                    "& .MuiAlert-icon": {
                      color: "#B71D18",
                    },
                  }}
                >
                  <AlertTitle sx={{ fontWeight: 600 }}>Error</AlertTitle>
                  {submitStatus.errorMessage}
                </Alert>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      variant="outlined"
                      required
                      InputProps={{
                        sx: {
                          borderRadius: "12px",
                          backgroundColor: "#f8fafc",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#f1f5f9",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          },
                          "&.Mui-focused": {
                            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)",
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          color: "#64748b",
                          fontWeight: 500,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      variant="outlined"
                      required
                      InputProps={{
                        sx: {
                          borderRadius: "12px",
                          backgroundColor: "#f8fafc",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#f1f5f9",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          },
                          "&.Mui-focused": {
                            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)",
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          color: "#64748b",
                          fontWeight: 500,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        sx: {
                          borderRadius: "12px",
                          backgroundColor: "#f8fafc",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#f1f5f9",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          },
                          "&.Mui-focused": {
                            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)",
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          color: "#64748b",
                          fontWeight: 500,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        sx: {
                          borderRadius: "12px",
                          backgroundColor: "#f8fafc",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#f1f5f9",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          },
                          "&.Mui-focused": {
                            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)",
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          color: "#64748b",
                          fontWeight: 500,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      multiline
                      rows={5}
                      variant="outlined"
                      required
                      InputProps={{
                        sx: {
                          borderRadius: "12px",
                          backgroundColor: "#f8fafc",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#f1f5f9",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          },
                          "&.Mui-focused": {
                            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)",
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          color: "#64748b",
                          fontWeight: 500,
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <Box mt={4} textAlign="center">
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={submitStatus.isSubmitting}
                    startIcon={
                      submitStatus.isSubmitting ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <SendIcon />
                      )
                    }
                    sx={{
                      background: "linear-gradient(45deg, #3b82f6, #2563eb)",
                      borderRadius: "12px",
                      py: 1.5,
                      px: 4,
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "1rem",
                      boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "linear-gradient(45deg, #2563eb, #1d4ed8)",
                        boxShadow: "0 15px 20px -3px rgba(59, 130, 246, 0.4)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {submitStatus.isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Paper
                elevation={10}
                sx={{
                  p: { xs: 3, sm: 4 },
                  borderRadius: 4,
                  background:
                    "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                  color: "white",
                  mb: 4,
                  flex: 1,
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: "white",
                    mb: 3,
                  }}
                >
                  Contact Information
                </Typography>
                <ContactInfo
                  icon={
                    <LocationOnIcon sx={{ color: "white", fontSize: 38 }} />
                  }
                  title="Mumbai Office"
                  text="A-101, Kiran Kunj Chs, Dombivli, Thane, Maharashtra"
                />
                <ContactInfo
                  icon={
                    <LocationOnIcon sx={{ color: "white", fontSize: 38 }} />
                  }
                  title="Bangalore Office"
                  text="G M infinite Daffoldis, Hessragatta Road,Jalhali, Bangalore"
                />

                <ContactInfo
                  icon={<PhoneIcon sx={{ color: "white", fontSize: 38 }} />}
                  title="Phone"
                  text="+91 7798097620"
                />

                <ContactInfo
                  icon={<EmailIcon sx={{ color: "white", fontSize: 38 }} />}
                  title="Email"
                  text="dhake9322@gmail.com"
                />
              </Paper>

              <Paper
                elevation={10}
                sx={{
                  p: { xs: 3, sm: 4 },
                  borderRadius: 4,
                  background:
                    "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
                  color: "white",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: "white",
                    mb: 3,
                  }}
                >
                  Connect With Us
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    maxWidth: "220px",
                  }}
                >
                  <SocialButton icon={<FacebookIcon />} />
                  <SocialButton icon={<TwitterIcon />} />
                  <SocialButton icon={<LinkedInIcon />} />
                  <SocialButton icon={<InstagramIcon />} />
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          }}
        >
          Thank you for your message! We'll get back to you soon.
        </Alert>
      </Snackbar>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

// Contact Info Component
const ContactInfo = ({ icon, title, text }) => (
  <Box
    display="flex"
    alignItems="flex-start"
    mb={3}
    sx={{
      transition: "transform 0.2s ease",
      "&:hover": {
        transform: "translateX(5px)",
      },
    }}
  >
    <Box
      sx={{
        mr: 2,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        p: 1.5,
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        sx={{
          color: "white",
          fontSize: "18px", // Increased font size for title
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "rgba(255, 255, 255, 0.8)",
          mt: 0.5,
          fontSize: "12px", // Increased font size for text
        }}
      >
        {text}
      </Typography>
    </Box>
  </Box>
);

// Social Button Component
const SocialButton = ({ icon }) => (
  <IconButton
    sx={{
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: "white",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        transform: "translateY(-3px)",
        boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
      },
      transition: "all 0.3s ease",
    }}
  >
    {icon}
  </IconButton>
);

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        backgroundColor: "#0f172a",
        color: "#e2e8f0",
        py: 6,
        mt: 10,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: "white",
                mb: 3,
                fontSize: { xs: "1.5rem", sm: "1.75rem" },
              }}
            >
              Mepteq
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#94a3b8",
                mb: 3,
                maxWidth: "300px",
                fontSize: { xs: "0.875rem", sm: "1.5rem" },
              }}
            >
              MepTeq specializes in providing high-quality solutions in HVAC
              (Heating, Ventilation, and Air Conditioning), plumbing, electrical
              systems, and fire protection services. Our expertise ensures
              efficient design, installation, and maintenance for residential,
              commercial, and industrial projects, ensuring compliance with
              safety standards and optimal system performance.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 900,
                color: "#3b82f6",
                mb: 4,
              }}
            >
              Quick Links
            </Typography>
            <FooterLink text="About Us" />
            <FooterLink text="Services" />
            <FooterLink text="Portfolio" />
            <FooterLink text="Testimonials" />
            <FooterLink text="Contact" />
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} md={2}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: "#3b82f6",
                mb: 3,
              }}
            >
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton
                size="small"
                sx={{ color: "#3b82f6", "&:hover": { color: "white" } }}
              >
                <FacebookIcon sx={{ fontSize: 28 }} />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: "#3b82f6", "&:hover": { color: "white" } }}
              >
                <TwitterIcon sx={{ fontSize: 28 }} />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: "#3b82f6", "&:hover": { color: "white" } }}
              >
                <LinkedInIcon sx={{ fontSize: 28 }} />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: "#3b82f6", "&:hover": { color: "white" } }}
              >
                <InstagramIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "#334155" }} />

        <Typography
          variant="body2"
          align="center"
          sx={{ color: "#64748b", fontSize: "14px" }}
        >
          © {currentYear} Mepteq.com | All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

// Footer Link Component
const FooterLink = ({ text }) => (
  <Typography
    variant="body2"
    sx={{
      cursor: "pointer",
      color: "#94a3b8",
      transition: "all 0.2s ease",
      display: "block",
      fontSize: "14px",
      mb: 1.5,
      "&:hover": {
        color: "white",
        transform: "translateX(5px)",
      },
    }}
  >
    {text}
  </Typography>
);

export default Contact;
