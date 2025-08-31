import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const Hire = () => {
  const [openApplication, setOpenApplication] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    motivation: '',
    position: ''
  });
  const [animateStats, setAnimateStats] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("38Wr0pXGcLDRtVP9o");
  }, []);

  const positions = [
    {
      title: 'Mechanical Draftsmen',
      icon: '⚙️',
      description: 'Create detailed technical drawings and blueprints for mechanical systems and components. Work with cutting-edge CAD software to bring innovative designs to life.',
      requirements: ['AutoCAD Proficiency', '2+ Years Experience', 'Technical Drawing Skills', 'Attention to Detail'],
      color: '#1976d2',
      colorLight: '#42a5f5'
    },
    {
      title: 'Electrical Draftsmen',
      icon: '⚡',
      description: 'Design electrical schematics and layouts for complex building systems. Collaborate with engineers to create precise electrical documentation.',
      requirements: ['Electrical CAD', '3+ Years Experience', 'Circuit Design', 'Code Knowledge'],
      color: '#ed6c02',
      colorLight: '#ff9800'
    }
  ];

  const companyStats = [
    { number: '50+', label: 'Projects Completed', icon: '✓' },
    { number: '15+', label: 'Years Experience', icon: '⭐' },
    { number: '200+', label: 'Happy Clients', icon: '👥' },
    { number: '95%', label: 'Success Rate', icon: '📈' }
  ];

  const benefits = [
    {
      icon: '💼',
      title: 'Career Growth',
      description: 'Continuous learning opportunities and clear advancement paths in a growing company.'
    },
    {
      icon: '🎓',
      title: 'Training & Development',
      description: 'Regular training sessions and skill development programs to enhance your expertise.'
    },
    {
      icon: '👥',
      title: 'Dynamic Team',
      description: 'Collaborative environment with passionate professionals who support each other.'
    },
    {
      icon: '💰',
      title: 'Competitive Benefits',
      description: 'Attractive salary packages with comprehensive benefits and performance incentives.'
    },
    {
      icon: '🏢',
      title: 'Modern Office',
      description: 'State-of-the-art facilities with latest technology and comfortable working environment.'
    },
    {
      icon: '⏰',
      title: 'Work-Life Balance',
      description: 'Flexible working hours and policies that support your personal and professional life.'
    }
  ];

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!formData.experience) {
      errors.experience = 'Experience is required';
    } else if (formData.experience < 0) {
      errors.experience = 'Experience cannot be negative';
    }
    if (!formData.motivation.trim()) {
      errors.motivation = 'Please tell us why you want to join';
    } else if (formData.motivation.trim().length < 50) {
      errors.motivation = 'Please provide at least 50 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleApply = (position) => {
    setSelectedPosition(position);
    setFormData({ ...formData, position });
    setOpenApplication(true);
    setSubmitStatus('');
    setFormErrors({});
    document.body.style.overflow = 'hidden';
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: '' });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const serviceId = 'service_zr7oaba';
      const templateId = 'template_1epmvcf';
      
      const currentDate = new Date();
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        position: formData.position,
        experience: formData.experience,
        motivation: formData.motivation,

        application_date: currentDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        application_time: currentDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      };

      const result = await emailjs.send(serviceId, templateId, templateParams);
      
      if (result.text === 'OK') {
        setSubmitStatus('success');
        setTimeout(() => {
          closeApplication();
        }, 3000);
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeApplication = () => {
    setOpenApplication(false);
    document.body.style.overflow = 'auto';
    setFormData({ name: '', email: '', phone: '', experience: '', motivation: '', position: '' });
    setSubmitStatus('');
    setFormErrors({});
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    bgAnimation: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.08,
      background: `
        radial-gradient(circle at 25% 25%, #ffffff 2px, transparent 2px),
        radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, #ffffff 1.5px, transparent 1.5px)
      `,
      backgroundSize: '60px 60px, 80px 80px, 100px 100px',
      animation: 'float 8s ease-in-out infinite'
    },
    content: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: 'clamp(10px, 3vw, 30px)',
      position: 'relative',
      zIndex: 1
    },
    header: {
      textAlign: 'center',
      marginBottom: 'clamp(40px, 8vw, 80px)',
      animation: 'slideInUp 1s ease-out'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 'clamp(20px, 4vw, 40px)',
      animation: 'pulse 3s ease-in-out infinite'
    },
    logo: {
      width: 'clamp(60px, 12vw, 100px)',
      height: 'clamp(60px, 12vw, 100px)',
      background: 'linear-gradient(45deg, #8B4513, #D2691E)',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      boxShadow: '0 10px 40px rgba(0,0,0,0.4)'
    },
    logoOverlay: {
      width: '75%',
      height: '75%',
      background: 'linear-gradient(45deg, #4FC3F7, #29B6F6)',
      borderRadius: '12px',
      position: 'absolute',
      top: '15%',
      left: '25%'
    },
    logoText: {
      color: 'white',
      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
      fontWeight: 'bold',
      zIndex: 1
    },
    mainTitle: {
      fontSize: 'clamp(2rem, 10vw, 5rem)',
      fontWeight: '900',
      color: 'white',
      marginBottom: 'clamp(15px, 3vw, 30px)',
      textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
      animation: 'slideInRight 1s ease-out',
      letterSpacing: '2px'
    },
    subtitle: {
      fontSize: 'clamp(1rem, 3vw, 1.4rem)',
      color: 'rgba(255,255,255,0.95)',
      maxWidth: '900px',
      margin: '0 auto',
      lineHeight: 1.8,
      animation: 'slideInRight 1s ease-out 0.3s both',
      padding: '0 20px',
      fontWeight: '300'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 'clamp(15px, 4vw, 30px)',
      marginBottom: 'clamp(50px, 10vw, 100px)',
      padding: '0 10px'
    },
    statCard: {
      padding: 'clamp(20px, 5vw, 40px)',
      textAlign: 'center',
      background: 'rgba(255,255,255,0.12)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.25)',
      borderRadius: '24px',
      color: 'white',
      transition: 'all 0.4s ease',
      animation: animateStats ? 'slideInUp 1s ease-out' : 'none',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    statNumber: {
      fontSize: 'clamp(2rem, 6vw, 3.5rem)',
      fontWeight: '800',
      marginBottom: '15px',
      color: '#4FC3F7',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    },
    statLabel: {
      fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
      opacity: 0.95,
      fontWeight: '500'
    },
    sectionTitle: {
      fontSize: 'clamp(2rem, 8vw, 4rem)',
      textAlign: 'center',
      color: 'white',
      marginBottom: 'clamp(40px, 8vw, 80px)',
      fontWeight: '800',
      textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
      animation: 'slideInUp 1.2s ease-out',
      letterSpacing: '1px'
    },
    positionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: 'clamp(25px, 5vw, 50px)',
      marginBottom: 'clamp(60px, 12vw, 120px)',
      padding: '0 10px'
    },
    positionCard: {
      background: 'rgba(255,255,255,0.98)',
      borderRadius: '28px',
      padding: 'clamp(25px, 5vw, 50px)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      position: 'relative',
      overflow: 'hidden',
      animation: 'slideInUp 1s ease-out',
      boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
      cursor: 'pointer',
      border: '1px solid rgba(0,0,0,0.05)'
    },
    positionHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '25px',
      flexWrap: 'wrap',
      gap: '15px'
    },
    positionIcon: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      marginRight: '15px'
    },
    positionTitle: {
      fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
      fontWeight: '700',
      margin: 0,
      flex: 1,
      minWidth: '200px',
      lineHeight: 1.2
    },
    positionDescription: {
      color: '#555',
      lineHeight: 1.8,
      marginBottom: '30px',
      fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
      fontWeight: '400'
    },
    requirementsTitle: {
      fontSize: 'clamp(1.1rem, 2.8vw, 1.4rem)',
      fontWeight: '600',
      marginBottom: '20px',
      color: '#333'
    },
    requirementsList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      marginBottom: '35px'
    },
    requirementChip: {
      padding: '10px 20px',
      border: '2px solid',
      borderRadius: '30px',
      fontSize: 'clamp(0.85rem, 2vw, 1rem)',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    },
    applyBtn: {
      width: '100%',
      padding: '18px',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    whyChooseUs: {
      background: 'rgba(255,255,255,0.12)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.25)',
      borderRadius: '32px',
      padding: 'clamp(40px, 8vw, 80px) clamp(25px, 5vw, 50px)',
      marginBottom: 'clamp(60px, 12vw, 120px)',
      color: 'white',
      animation: 'slideInUp 1.5s ease-out',
      position: 'relative',
      overflow: 'hidden'
    },
    benefitsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 'clamp(25px, 5vw, 50px)'
    },
    benefitItem: {
      textAlign: 'center',
      transition: 'transform 0.4s ease',
      padding: '20px',
      borderRadius: '20px',
      background: 'rgba(255,255,255,0.08)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.15)'
    },
    benefitIcon: {
      fontSize: 'clamp(3rem, 6vw, 4.5rem)',
      marginBottom: '25px',
      display: 'block',
      animation: 'bounce 3s ease-in-out infinite'
    },
    benefitTitle: {
      fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
      fontWeight: '700',
      marginBottom: '20px'
    },
    benefitDescription: {
      opacity: 0.95,
      lineHeight: 1.7,
      fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)',
      fontWeight: '400'
    },
    contactSection: {
      textAlign: 'center',
      padding: 'clamp(40px, 8vw, 60px)',
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(20px)',
      borderRadius: '32px',
      border: '1px solid rgba(255,255,255,0.25)',
      animation: 'slideInUp 2s ease-out'
    },
    contactTitle: {
      fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
      color: 'white',
      marginBottom: '40px',
      fontWeight: '700'
    },
    contactInfo: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '40px'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      color: 'white',
      fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
      padding: '15px 25px',
      borderRadius: '15px',
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)'
    },
    floatingContact: {
      position: 'fixed',
      bottom: 'clamp(20px, 4vw, 40px)',
      right: 'clamp(20px, 4vw, 40px)',
      zIndex: 999
    },
    floatingBtn: {
      background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
      color: 'white',
      border: 'none',
      padding: 'clamp(12px, 3vw, 18px) clamp(20px, 4vw, 30px)',
      borderRadius: '50px',
      fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      animation: 'float 4s ease-in-out infinite',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    modal: {
      display: openApplication ? 'flex' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.8)',
      zIndex: 1000,
      alignItems: 'center',
      justifyContent: 'center',
      animation: openApplication ? 'fadeIn 0.4s ease' : 'none',
      padding: 'clamp(15px, 3vw, 25px)',
      backdropFilter: 'blur(10px)'
    },
    modalContent: {
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '28px',
      padding: 'clamp(25px, 6vw, 50px)',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '95vh',
      overflowY: 'auto',
      position: 'relative',
      animation: openApplication ? 'slideInUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none',
      boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
      border: '1px solid rgba(255,255,255,0.2)'
    },
    modalHeader: {
      background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
      color: 'white',
      padding: 'clamp(20px, 4vw, 30px)',
      borderRadius: '20px',
      margin: 'calc(-1 * clamp(25px, 6vw, 50px)) calc(-1 * clamp(25px, 6vw, 50px)) 40px calc(-1 * clamp(25px, 6vw, 50px))',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)'
    },
    closeBtn: {
      background: 'rgba(255,255,255,0.2)',
      border: 'none',
      color: 'white',
      fontSize: '1.8rem',
      cursor: 'pointer',
      padding: '8px 12px',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    formGroup: {
      marginBottom: '25px'
    },
    formLabel: {
      display: 'block',
      marginBottom: '10px',
      fontWeight: '600',
      color: '#2d3748',
      fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)'
    },
    formInput: {
      width: '100%',
      padding: 'clamp(12px, 3vw, 16px)',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
      boxSizing: 'border-box',
      backgroundColor: '#fafafa'
    },
    fileUpload: {
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',
      width: '100%'
    },
    fileInput: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      cursor: 'pointer'
    },
    fileLabel: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      padding: 'clamp(12px, 3vw, 16px)',
      border: '2px dashed #cbd5e0',
      borderRadius: '12px',
      backgroundColor: '#fafafa',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)'
    },
    submitBtn: {
      background: isSubmitting 
        ? '#4caf50' 
        : submitStatus === 'success' 
        ? '#4caf50' 
        : submitStatus === 'error' 
        ? '#f44336' 
        : 'linear-gradient(135deg, #1976d2, #42a5f5)',
      color: 'white',
      border: 'none',
      padding: 'clamp(15px, 3vw, 20px) clamp(25px, 5vw, 40px)',
      borderRadius: '15px',
      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    statusMessage: {
      textAlign: 'center',
      marginBottom: '25px',
      padding: '15px',
      borderRadius: '12px',
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      fontWeight: '500'
    },
    successMessage: {
      background: '#e8f5e8',
      color: '#2e7d32',
      border: '2px solid #4caf50'
    },
    errorMessage: {
      background: '#ffebee',
      color: '#c62828',
      border: '2px solid #f44336'
    },
    fieldError: {
      color: '#e53e3e',
      fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
      marginTop: '5px',
      fontWeight: '500'
    }
  };

  const cssStyles = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-8px) rotate(1deg); }
      66% { transform: translateY(-4px) rotate(-1deg); }
    }

    @keyframes slideInUp {
      from { transform: translateY(60px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @keyframes slideInRight {
      from { transform: translateX(100px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-25px); }
      60% { transform: translateY(-15px); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .hover-lift:hover {
      transform: translateY(-15px) scale(1.02) !important;
      box-shadow: 0 20px 45px rgba(0,0,0,0.2) !important;
    }

    .hover-scale:hover {
      transform: scale(1.08) !important;
    }

    .hover-glow:hover {
      box-shadow: 0 15px 35px rgba(0,0,0,0.3) !important;
      transform: translateY(-3px) !important;
    }

    .position-card:hover {
      transform: translateY(-20px) scale(1.03) !important;
      box-shadow: 0 30px 60px rgba(0,0,0,0.25) !important;
    }

    .stat-card:hover {
      transform: translateY(-15px) scale(1.05) !important;
      background: rgba(255,255,255,0.2) !important;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2) !important;
    }

    .requirement-chip:hover {
      background: var(--chip-color) !important;
      color: white !important;
      transform: translateY(-3px) scale(1.05) !important;
      box-shadow: 0 8px 20px rgba(0,0,0,0.2) !important;
    }

    .contact-item:hover {
      transform: scale(1.1) translateY(-5px) !important;
      background: rgba(255,255,255,0.2) !important;
    }

    .floating-btn:hover {
      transform: scale(1.1) !important;
      box-shadow: 0 15px 40px rgba(0,0,0,0.4) !important;
    }

    .apply-btn:hover {
      transform: scale(1.03) translateY(-2px) !important;
      box-shadow: 0 15px 35px rgba(0,0,0,0.3) !important;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-3px) scale(1.02) !important;
      box-shadow: 0 12px 30px rgba(25, 118, 210, 0.4) !important;
    }

    .submit-btn:disabled {
      cursor: not-allowed;
      opacity: 0.8;
    }

    .form-input:focus {
      outline: none !important;
      border-color: #1976d2 !important;
      box-shadow: 0 0 15px rgba(25, 118, 210, 0.3) !important;
      background-color: white !important;
    }

    .form-input.error {
      border-color: #e53e3e !important;
      box-shadow: 0 0 10px rgba(229, 62, 62, 0.3) !important;
    }

    .file-label:hover {
      border-color: #1976d2 !important;
      background-color: #f0f8ff !important;
    }

    .close-btn:hover {
      background: rgba(255,255,255,0.3) !important;
      transform: scale(1.1) !important;
    }

    .benefit-item:hover {
      transform: translateY(-10px) scale(1.05) !important;
      background: rgba(255,255,255,0.15) !important;
    }

    .mechanical-card {
      --card-color: #1976d2;
      --card-color-light: #42a5f5;
      --chip-color: #1976d2;
    }

    .electrical-card {
      --card-color: #ed6c02;
      --card-color-light: #ff9800;
      --chip-color: #ed6c02;
    }

   

    .mechanical-card::before,
    .electrical-card::before,
    .plumbing-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, var(--card-color), var(--card-color-light));
      border-radius: 28px 28px 0 0;
    }

    /* Enhanced Mobile Responsiveness */
    @media (max-width: 480px) {
      .floating-contact {
        bottom: 15px !important;
        right: 15px !important;
      }
      
      .floating-btn {
        padding: 10px 18px !important;
        font-size: 0.85rem !important;
      }
      
      .positions-grid {
        grid-template-columns: 1fr !important;
        gap: 20px !important;
        padding: 0 5px !important;
      }
      
      .stats-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 12px !important;
      }
      
      .benefits-grid {
        grid-template-columns: 1fr !important;
        gap: 20px !important;
      }
      
      .requirement-chip {
        font-size: 0.75rem !important;
        padding: 8px 14px !important;
      }
      
      .modal {
        padding: 8px !important;
      }
      
      .modal-content {
        border-radius: 20px !important;
        max-height: 98vh !important;
      }
      
      .modal-header h3 {
        font-size: 1.1rem !important;
      }

      .contact-info {
        flex-direction: column !important;
        gap: 15px !important;
      }
    }

    @media (max-width: 768px) {
      .position-header {
        flex-direction: column !important;
        align-items: flex-start !important;
        text-align: left !important;
        gap: 10px !important;
      }
      
      .position-icon {
        margin-right: 0 !important;
        margin-bottom: 5px !important;
      }
      
      .benefits-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }

    @media (max-width: 600px) {
      .benefits-grid {
        grid-template-columns: 1fr !important;
      }
    }

    @media (min-width: 1200px) {
      .positions-grid {
        grid-template-columns: repeat(3, 1fr) !important;
      }
    }

    @media (min-width: 1400px) {
      .benefits-grid {
        grid-template-columns: repeat(3, 1fr) !important;
      }
    }

    /* Custom Scrollbar */
    .modal-content::-webkit-scrollbar {
      width: 8px;
    }

    .modal-content::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }

    .modal-content::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 10px;
    }

    .modal-content::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
  `;

  return (
    <>
      <style>{cssStyles}</style>
      <div style={styles.container}>
        <div style={styles.bgAnimation}></div>
        
        {/* Enhanced Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '-120px',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,195,247,0.4) 0%, transparent 70%)',
          animation: 'float 10s ease-in-out infinite'
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '-120px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,107,0.4) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '80%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76,175,80,0.3) 0%, transparent 70%)',
          animation: 'float 6s ease-in-out infinite'
        }}></div>

        <div style={styles.content}>
          {/* Enhanced Header Section */}
          <header style={styles.header}>
            <div style={styles.logoContainer}>
              <div style={styles.logo}>
                <div style={styles.logoOverlay}></div>
                <div style={styles.logoText}>M</div>
              </div>
            </div>
            
            <h1 style={styles.mainTitle}>WE ARE HIRING</h1>
            
            <p style={styles.subtitle}>
              Join Mepteq Global, a leading MEP consultancy where innovation meets expertise. We're seeking talented draftsmen who are passionate about precision, creativity, and building the future of engineering design.
            </p>
          </header>

          {/* Enhanced Company Stats */}
          <div style={styles.statsGrid}>
            {companyStats.map((stat, index) => (
              <div 
                key={index}
                className="stat-card hover-lift"
                style={{
                  ...styles.statCard,
                  animationDelay: `${index * 0.15}s`
                }}
              >
                <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '15px', color: '#4FC3F7' }}>
                  {stat.icon}
                </div>
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Enhanced Positions Section */}
          <h2 style={styles.sectionTitle}>Open Positions</h2>

          <div style={styles.positionsGrid}>
            {positions.map((position, index) => (
              <div 
                key={index}
                className={`position-card ${
                  position.title.toLowerCase().includes('mechanical') ? 'mechanical-card' : 
                  position.title.toLowerCase().includes('electrical') ? 'electrical-card' : 
                  'plumbing-card'
                }`}
                style={{
                  ...styles.positionCard,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div style={styles.positionHeader}>
                  <span style={{...styles.positionIcon, color: position.color}}>{position.icon}</span>
                  <h3 style={{...styles.positionTitle, color: position.color}}>{position.title}</h3>
                </div>
                
                <p style={styles.positionDescription}>
                  {position.description}
                </p>
                
                <h4 style={styles.requirementsTitle}>Requirements:</h4>
                <div style={styles.requirementsList}>
                  {position.requirements.map((req, reqIndex) => (
                    <span
                      key={reqIndex}
                      className="requirement-chip"
                      style={{
                        ...styles.requirementChip,
                        borderColor: position.color,
                        color: position.color,
                        '--chip-color': position.color
                      }}
                    >
                      {req}
                    </span>
                  ))}
                </div>
                
                <button
                  className="apply-btn hover-glow"
                  style={{
                    ...styles.applyBtn,
                    background: `linear-gradient(135deg, ${position.color}, ${position.colorLight})`
                  }}
                  onClick={() => handleApply(position.title)}
                >
                  Apply Now →
                </button>
              </div>
            ))}
          </div>

          {/* Enhanced Why Choose Us Section */}
          <div style={styles.whyChooseUs}>
            <h2 style={{...styles.sectionTitle, marginBottom: '50px'}}>Why Choose Mepteq Global?</h2>
            
            <div style={styles.benefitsGrid}>
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="benefit-item hover-lift"
                  style={{
                    ...styles.benefitItem,
                    animationDelay: `${index * 0.3}s`
                  }}
                >
                  <span style={{...styles.benefitIcon, animationDelay: `${index * 0.3}s`}}>
                    {benefit.icon}
                  </span>
                  <h3 style={styles.benefitTitle}>{benefit.title}</h3>
                  <p style={styles.benefitDescription}>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Contact Section */}
          <div style={styles.contactSection}>
            <h2 style={styles.contactTitle}>Ready to Join Our Team?</h2>
            
            <div style={styles.contactInfo}>
              <div className="contact-item hover-scale" style={styles.contactItem}>
                <span style={{ marginRight: '15px', color: '#4FC3F7', fontSize: '1.8rem' }}>📧</span>
                <span>info@mepteq.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Floating Contact Button */}
        <div style={styles.floatingContact} className="floating-contact">
          <button 
            className="floating-btn hover-scale"
            style={styles.floatingBtn}
            onClick={() => window.open('mailto:info@mepteq.com')}
          >
            <span>📧</span>
            Quick Contact
          </button>
        </div>

        {/* Enhanced Application Modal */}
        {openApplication && (
          <div style={styles.modal} onClick={(e) => e.target === e.currentTarget && closeApplication()}>
            <div style={styles.modalContent}>
              <div style={styles.modalHeader} className="modal-header">
                <h3 style={{ margin: 0, fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', fontWeight: '700' }}>
                  Apply for {selectedPosition}
                </h3>
                <button 
                  className="close-btn"
                  style={styles.closeBtn}
                  onClick={closeApplication}
                >
                  ✕
                </button>
              </div>
              
              {submitStatus && (
                <div 
                  style={{
                    ...styles.statusMessage,
                    ...(submitStatus === 'success' ? styles.successMessage : styles.errorMessage)
                  }}
                >
                  {submitStatus === 'success' 
                    ? '🎉 Application submitted successfully! We will contact you within 2-3 business days.' 
                    : '⚠️ Failed to send application. Please check your internet connection and try again.'}
                </div>
              )}
              
              <div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Full Name *</label>
                  <input
                    type="text"
                    className={`form-input ${formErrors.name ? 'error' : ''}`}
                    style={styles.formInput}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={isSubmitting}
                    placeholder="Enter your full name"
                  />
                  {formErrors.name && <div style={styles.fieldError}>{formErrors.name}</div>}
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Email Address *</label>
                  <input
                    type="email"
                    className={`form-input ${formErrors.email ? 'error' : ''}`}
                    style={styles.formInput}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={isSubmitting}
                    placeholder="your.email@example.com"
                  />
                  {formErrors.email && <div style={styles.fieldError}>{formErrors.email}</div>}
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Phone Number *</label>
                  <input
                    type="tel"
                    className={`form-input ${formErrors.phone ? 'error' : ''}`}
                    style={styles.formInput}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={isSubmitting}
                    placeholder="+1 (555) 123-4567"
                  />
                  {formErrors.phone && <div style={styles.fieldError}>{formErrors.phone}</div>}
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Years of Experience *</label>
                  <input
                    type="number"
                    className={`form-input ${formErrors.experience ? 'error' : ''}`}
                    style={styles.formInput}
                    min="0"
                    max="50"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    disabled={isSubmitting}
                    placeholder="0"
                  />
                  {formErrors.experience && <div style={styles.fieldError}>{formErrors.experience}</div>}
                </div>

                
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Why do you want to join Mepteq Global? * (min 50 characters)</label>
                  <textarea
                    className={`form-input ${formErrors.motivation ? 'error' : ''}`}
                    style={{...styles.formInput, minHeight: '120px', resize: 'vertical'}}
                    value={formData.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    disabled={isSubmitting}
                    placeholder="Tell us about your passion for MEP design, career goals, and what attracts you to our company..."
                  />
                  <div style={{fontSize: '0.8rem', color: '#666', marginTop: '5px'}}>
                    {formData.motivation.length}/50 characters minimum
                  </div>
                  {formErrors.motivation && <div style={styles.fieldError}>{formErrors.motivation}</div>}
                </div>
                
                <button 
                  onClick={handleSubmit}
                  className="submit-btn hover-glow"
                  style={styles.submitBtn}
                  disabled={isSubmitting || submitStatus === 'success'}
                >
                  {isSubmitting 
                    ? '🔄 Submitting...' 
                    : submitStatus === 'success' 
                    ? '✅ Application Sent!' 
                    : submitStatus === 'error'
                    ? '🔄 Retry Submission'
                    : '🚀 Submit Application'
                  }
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Hire;