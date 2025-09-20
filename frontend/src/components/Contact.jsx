import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { contactData } from '../data/mock';
import { Button } from './ui/button';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';
import apiService from '../services/api';

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, loading, success, error
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      company: '',
      industry: '',
      service: '',
      message: ''
    }
  });

  const onSubmit = async (data) => {
    setSubmitStatus('loading');
    setSubmitMessage('');

    try {
      // Submit form data to Firebase via API
      const response = await apiService.submitContactForm(data);
      
      if (response) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
        reset(); // Clear form
        
        // Reset status after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
          setSubmitMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage(
        error.message || 'Sorry, there was an error sending your message. Please try again.'
      );
      
      // Reset error status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
    }
  };

  const isFormValid = () => {
    const formData = watch();
    return formData.first_name && 
           formData.last_name && 
           formData.email && 
           formData.message &&
           !errors.email;
  };

  const getSubmitButtonContent = () => {
    switch (submitStatus) {
      case 'loading':
        return (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Sending...</span>
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle className="w-5 h-5" />
            <span>Message Sent!</span>
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle className="w-5 h-5" />
            <span>Try Again</span>
          </>
        );
      default:
        return (
          <>
            <Send className="w-5 h-5" />
            <span>Send Message</span>
          </>
        );
    }
  };

  const getSubmitButtonClass = () => {
    const baseClass = "w-full flex items-center justify-center space-x-2 px-8 py-4 text-lg font-medium transition-all duration-400 rounded-none";
    
    switch (submitStatus) {
      case 'loading':
        return `${baseClass} bg-gray-500 text-white cursor-not-allowed`;
      case 'success':
        return `${baseClass} bg-green-500 text-white`;
      case 'error':
        return `${baseClass} bg-red-500 text-white hover:bg-red-600`;
      default:
        return `${baseClass} bg-[#00FFD1] text-black hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] border-none ${
          !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
        }`;
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-6 lg:px-16">
        
        {/* Header */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Get In <span className="text-[#00FFD1]">Touch</span>
            </h1>
            <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business with expert lead generation? 
              Let's discuss how we can help you achieve your growth goals.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Information - Centered */}
        <div className="max-w-4xl mx-auto">
          <ScrollReveal delay={0.4}>
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Contact Details */}
              <GlassBox 
                className="p-8"
                blur={16}
                opacity={0.1}
              >
                <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <GlassBox className="w-12 h-12 rounded-none flex items-center justify-center flex-shrink-0" opacity={0.2}>
                      <Mail className="w-5 h-5 text-[#00FFD1]" />
                    </GlassBox>
                    <div>
                      <h4 className="text-white font-medium mb-1">Email</h4>
                      <a 
                        href={`mailto:${contactData.email}`}
                        className="text-white/70 hover:text-[#00FFD1] transition-colors duration-300"
                      >
                        {contactData.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <GlassBox className="w-12 h-12 rounded-none flex items-center justify-center flex-shrink-0" opacity={0.2}>
                      <Phone className="w-5 h-5 text-[#00FFD1]" />
                    </GlassBox>
                    <div>
                      <h4 className="text-white font-medium mb-1">Phone</h4>
                      <div className="space-y-1">
                        <a 
                          href={`tel:${contactData.phone.canada.replace(/\D/g, '')}`}
                          className="block text-white/70 hover:text-[#00FFD1] transition-colors duration-300"
                        >
                          {contactData.phone.canada}
                        </a>
                        <p className="text-white/50 text-sm">{contactData.phone.bangladesh}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <GlassBox className="w-12 h-12 rounded-none flex items-center justify-center flex-shrink-0" opacity={0.2}>
                      <MapPin className="w-5 h-5 text-[#00FFD1]" />
                    </GlassBox>
                    <div>
                      <h4 className="text-white font-medium mb-1">Offices</h4>
                      <div className="space-y-2">
                        <p className="text-white/70 text-sm leading-relaxed">
                          <strong>Canada:</strong><br />
                          {contactData.address.canada}
                        </p>
                        <p className="text-white/50 text-sm leading-relaxed">
                          <strong>Bangladesh:</strong><br />
                          {contactData.address.bangladesh}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassBox>

              {/* Business Hours */}
              <GlassBox 
                className="p-8"
                blur={16}
                opacity={0.1}
              >
                <h3 className="text-xl font-bold text-white mb-4">Business Hours</h3>
                <p className="text-white/70">
                  {contactData.hours}
                </p>
                <p className="text-white/50 text-sm mt-2">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </GlassBox>

              {/* Why Choose Us */}
              <GlassBox 
                className="p-8"
                blur={16}
                opacity={0.1}
              >
                <h3 className="text-xl font-bold text-white mb-4">Why Choose Lead G?</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#00FFD1] flex-shrink-0" />
                    <span>8+ years of industry experience</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#00FFD1] flex-shrink-0" />
                    <span>500+ successful client partnerships</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#00FFD1] flex-shrink-0" />
                    <span>$50M+ in revenue generated</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#00FFD1] flex-shrink-0" />
                    <span>Dedicated account management</span>
                  </li>
                </ul>
              </GlassBox>
              
              {/* Quick Actions */}
              <GlassBox 
                className="p-8"
                blur={16}
                opacity={0.1}
              >
                <h3 className="text-xl font-bold text-white mb-6">Ready to Get Started?</h3>
                
                <div className="space-y-4">
                  <a 
                    href="/book-appointment"
                    className="flex items-center justify-center space-x-3 bg-[#00FFD1] text-black px-6 py-4 hover:bg-[#00FFD1]/90 transition-all duration-300 rounded-none text-lg font-medium"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Book Appointment</span>
                  </a>
                  
                  <a 
                    href={`mailto:${contactData.email}`}
                    className="flex items-center justify-center space-x-3 bg-white/10 text-white px-6 py-4 hover:bg-white hover:text-black transition-all duration-300 rounded-none text-lg font-medium border border-white/20"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Send Email</span>
                  </a>
                  
                  <a 
                    href={`tel:${contactData.phone.canada.replace(/\D/g, '')}`}
                    className="flex items-center justify-center space-x-3 bg-white/5 text-white px-6 py-4 hover:bg-white/10 transition-all duration-300 rounded-none text-lg font-medium border border-white/10"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call Now</span>
                  </a>
                </div>
              </GlassBox>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;