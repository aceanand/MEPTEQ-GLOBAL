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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [formErrors, setFormErrors] = useState({});

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
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      position: 'relative',
      zIndex: 1
    },
    header: {
      textAlign: 'center',
      marginBottom: '80px',
      animation: 'slideInUp 1s ease-out'
    },
    brandContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '40px',
      animation: 'fadeInScale 1.2s ease-out'
    },
    brandName: {
      fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
      fontWeight: '800',
      color: '#ffffff',
      letterSpacing: '4px',
      marginBottom: '15px',
      textShadow: '2px 2px 12px rgba(0,0,0,0.3)',
      background: 'linear-gradient(135deg, #ffffff, #e3f2fd)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    brandLine: {
      width: '120px',
      height: '4px',
      background: 'linear-gradient(90deg, #4FC3F7, #29B6F6, #1976d2)',
      borderRadius: '2px',
      animation: 'expandWidth 1.5s ease-out 0.5s both'
    },
    mainTitle: {
      fontSize: 'clamp(3rem, 10vw, 5rem)',
      fontWeight: '900',
      color: '#ffffff',
      marginBottom: '30px',
      textShadow: '3px 3px 15px rgba(0,0,0,0.4)',
      animation: 'slideInUp 1.2s ease-out 0.3s both',
      letterSpacing: '3px',
      background: 'linear-gradient(135deg, #ffffff, #4FC3F7)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      position: 'relative'
    },
    subtitle: {
      fontSize: 'clamp(1.1rem, 4vw, 1.3rem)',
      color: '#f8f9fa',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: 1.6,
      animation: 'slideInRight 1s ease-out 0.3s both',
      padding: '0 20px',
      fontWeight: '300'
    },
    sectionTitle: {
      fontSize: 'clamp(2rem, 6vw, 3rem)',
      textAlign: 'center',
      color: '#ffffff',
      marginBottom: '50px',
      fontWeight: '700',
      textShadow: '2px 2px 6px rgba(0,0,0,0.3)',
      animation: 'slideInUp 1.2s ease-out',
      letterSpacing: '1px'
    },
    positionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '40px',
      marginBottom: '80px',
      padding: '0 10px'
    },
    positionCard: {
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '40px',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      position: 'relative',
      overflow: 'hidden',
      animation: 'slideInUp 1s ease-out',
      boxShadow: '0 20px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.1)',
      cursor: 'pointer',
      border: '1px solid rgba(79,195,247,0.1)'
    },
    positionHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '25px',
      flexWrap: 'wrap',
      gap: '15px'
    },
    positionIcon: {
      fontSize: '3rem',
      marginRight: '15px'
    },
    positionTitle: {
      fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
      fontWeight: '700',
      margin: 0,
      flex: 1,
      minWidth: '200px',
      lineHeight: 1.2,
      color: '#2d3748'
    },
    positionDescription: {
      color: '#4a5568',
      lineHeight: 1.7,
      marginBottom: '30px',
      fontSize: '1.1rem',
      fontWeight: '400'
    },
    requirementsTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '20px',
      color: '#2d3748'
    },
    requirementsList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      marginBottom: '35px'
    },
    requirementChip: {
      padding: '10px 18px',
      border: '2px solid',
      borderRadius: '25px',
      fontSize: '0.95rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      color: '#4a5568'
    },
    applyBtn: {
      width: '100%',
      padding: '16px',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    contactSection: {
      textAlign: 'center',
      padding: '30px 20px',
      background: 'rgba(255,255,255,0.12)',
      backdropFilter: 'blur(30px)',
      borderRadius: '52px',
      border: '1px solid rgba(255,255,255,0.2)',
      animation: 'slideInUp 2s ease-out',
      position: 'relative',
      overflow: 'hidden'
    },
    contactTitle: {
      fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
      color: '#ffffff',
      marginBottom: '40px',
      fontWeight: '400'
    },
    contactInfo: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '30px'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      color: '#f8f9fa',
      fontSize: '1.2rem',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
      padding: '15px 25px',
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)'
    },
    floatingContact: {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 999
    },
    floatingBtn: {
      background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
      color: 'white',
      border: 'none',
      padding: '15px 25px',
      borderRadius: '50px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
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
      padding: '20px',
      backdropFilter: 'blur(10px)'
    },
    modalContent: {
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '24px',
      padding: '40px',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      animation: openApplication ? 'slideInUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none',
      boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
      border: '1px solid rgba(255,255,255,0.2)'
    },
    modalHeader: {
      background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
      color: 'white',
      padding: '25px',
      borderRadius: '16px',
      margin: '-40px -40px 30px -40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)'
    },
    closeBtn: {
      background: 'rgba(255,255,255,0.2)',
      border: 'none',
      color: 'white',
      fontSize: '1.5rem',
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
      marginBottom: '8px',
      fontWeight: '600',
      color: '#2d3748',
      fontSize: '1rem'
    },
    formInput: {
      width: '100%',
      padding: '14px',
      border: '2px solid #e2e8f0',
      borderRadius: '10px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
      boxSizing: 'border-box',
      backgroundColor: '#fafafa',
      color: '#2d3748'
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
      padding: '16px 30px',
      borderRadius: '12px',
      fontSize: '1.1rem',
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
      borderRadius: '10px',
      fontSize: '1rem',
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
      fontSize: '0.9rem',
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

    @keyframes fadeInScale {
      0% { transform: scale(0.8); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }

    @keyframes expandWidth {
      0% { width: 0; }
      100% { width: 120px; }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }

    .position-card:hover {
      transform: translateY(-15px) scale(1.02) !important;
      box-shadow: 0 30px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(79,195,247,0.2) !important;
      background: rgba(255,255,255,0.98) !important;
    }

    .position-card::before {
      content: '';
      position: 'absolute';
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--card-color), var(--card-color-light));
      border-radius: 24px 24px 0 0;
      opacity: 0.8;
    }

    .position-card::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent, rgba(79,195,247,0.03), transparent);
      transform: rotate(45deg);
      transition: all 0.6s ease;
      opacity: 0;
    }

    .position-card:hover::after {
      opacity: 1;
      animation: shimmer 1.5s ease-in-out;
    }

    .requirement-chip:hover {
      background: var(--chip-color) !important;
      color: white !important;
      transform: translateY(-2px) scale(1.02) !important;
      box-shadow: 0 5px 15px rgba(0,0,0,0.15) !important;
    }

    .contact-item:hover {
      transform: scale(1.05) translateY(-2px) !important;
      background: rgba(255,255,255,0.2) !important;
    }

    .floating-btn:hover {
      transform: scale(1.05) !important;
      box-shadow: 0 12px 35px rgba(0,0,0,0.4) !important;
    }

    .apply-btn:hover {
      transform: scale(1.02) translateY(-2px) !important;
      box-shadow: 0 12px 30px rgba(0,0,0,0.25) !important;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-2px) scale(1.01) !important;
      box-shadow: 0 10px 25px rgba(25, 118, 210, 0.4) !important;
    }

    .submit-btn:disabled {
      cursor: not-allowed;
      opacity: 0.8;
    }

    .form-input:focus {
      outline: none !important;
      border-color: #1976d2 !important;
      box-shadow: 0 0 12px rgba(25, 118, 210, 0.3) !important;
      background-color: white !important;
    }

    .form-input.error {
      border-color: #e53e3e !important;
      box-shadow: 0 0 8px rgba(229, 62, 62, 0.3) !important;
    }

    .close-btn:hover {
      background: rgba(255,255,255,0.3) !important;
      transform: scale(1.1) !important;
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
    .electrical-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--card-color), var(--card-color-light));
      border-radius: 20px 20px 0 0;
    }

    /* Mobile Responsiveness */
    @media (max-width: 768px) {
      .floating-contact {
        bottom: 20px !important;
        right: 20px !important;
      }
      
      .floating-btn {
        padding: 12px 20px !important;
        font-size: 0.9rem !important;
      }
      
      .positions-grid {
        grid-template-columns: 1fr !important;
        gap: 30px !important;
        padding: 0 5px !important;
      }
      
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
      
      .requirement-chip {
        font-size: 0.85rem !important;
        padding: 8px 15px !important;
      }
      
      .modal {
        padding: 15px !important;
      }
      
      .modal-content {
        padding: 30px 25px !important;
        border-radius: 20px !important;
        max-height: 95vh !important;
      }
      
      .modal-header {
        margin: -30px -25px 25px -25px !important;
        padding: 20px !important;
      }
      
      .modal-header h3 {
        font-size: 1.2rem !important;
      }

      .contact-info {
        flex-direction: column !important;
        gap: 20px !important;
      }

      .content {
        padding: 15px !important;
      }

      .header {
        margin-bottom: 50px !important;
      }

      .brand-name {
        font-size: 1.3rem !important;
        letter-spacing: 2px !important;
      }

      .brand-line {
        width: 80px !important;
        height: 3px !important;
      }
    }

    @media (max-width: 480px) {
      .positions-grid {
        gap: 25px !important;
      }
      
      .position-card {
        padding: 25px !important;
      }
      
      .requirement-chip {
        font-size: 0.8rem !important;
        padding: 7px 12px !important;
      }
      
      .modal-content {
        padding: 25px 20px !important;
      }
      
      .modal-header {
        margin: -25px -20px 20px -20px !important;
        padding: 18px !important;
      }
    }

    /* Custom Scrollbar */
    .modal-content::-webkit-scrollbar {
      width: 6px;
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
          top: '10%',
          right: '-150px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,195,247,0.15) 0%, transparent 70%)',
          animation: 'float 12s ease-in-out infinite',
          filter: 'blur(1px)'
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '-100px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,107,0.12) 0%, transparent 70%)',
          animation: 'float 10s ease-in-out infinite reverse',
          filter: 'blur(1px)'
        }}></div>

        <div style={{
          position: 'absolute',
          top: '30%',
          left: '5%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76,175,80,0.1) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
          filter: 'blur(0.5px)'
        }}></div>

        {/* Geometric Shapes */}
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(45deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
          borderRadius: '12px',
          animation: 'float 6s ease-in-out infinite',
          transform: 'rotate(45deg)'
        }}></div>

        <div style={{
          position: 'absolute',
          top: '80%',
          left: '15%',
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, rgba(79,195,247,0.05), transparent)',
          borderRadius: '50%',
          animation: 'float 9s ease-in-out infinite reverse'
        }}></div>

        <div style={styles.content}>
          {/* Header Section */}
          <header style={styles.header}>
            <div style={styles.brandContainer}>
              <h1 style={styles.brandName}>MEPTEQ GLOBAL</h1>
              <div style={styles.brandLine}></div>
            </div>
            
            <h1 style={styles.mainTitle}>WE ARE HIRING</h1>
            
            <p style={styles.subtitle}>
              Join our leading MEP consultancy where innovation meets expertise. We're seeking talented draftsmen who are passionate about precision, creativity, and building the future of engineering design.
            </p>
          </header>

          {/* Positions Section */}
          <h2 style={styles.sectionTitle}>Open Positions</h2>

          <div style={styles.positionsGrid}>
            {positions.map((position, index) => (
              <div 
                key={index}
                className={`position-card ${
                  position.title.toLowerCase().includes('mechanical') ? 'mechanical-card' : 
                  'electrical-card'
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
                  className="apply-btn"
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

          {/* Contact Section */}
          <div style={styles.contactSection}>
            <h2 style={styles.contactTitle}>Ready to Join Our Team?</h2>
            
            <div style={styles.contactInfo}>
              <div className="contact-item" style={styles.contactItem}>
                <span style={{ marginRight: '15px', color: '#4FC3F7', fontSize: '1.5rem' }}>📧</span>
                <span>info@mepteq.com</span>
              </div>
            </div>
          </div>
        </div>

        

        {/* Application Modal */}
        {openApplication && (
          <div style={styles.modal} onClick={(e) => e.target === e.currentTarget && closeApplication()}>
            <div style={styles.modalContent}>
              <div style={styles.modalHeader} className="modal-header">
                <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700' }}>
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
                  <div style={{fontSize: '0.85rem', color: '#666', marginTop: '5px'}}>
                    {formData.motivation.length}/50 characters minimum
                  </div>
                  {formErrors.motivation && <div style={styles.fieldError}>{formErrors.motivation}</div>}
                </div>
                
                <button 
                  onClick={handleSubmit}
                  className="submit-btn"
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