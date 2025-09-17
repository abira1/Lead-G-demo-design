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

        {/* Contact Form and Info Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          
          {/* Contact Form */}
          <ScrollReveal delay={0.4}>
            <GlassBox 
              className="p-8 lg:p-12"
              blur={20}
              opacity={0.1}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Send us a message</h2>
                <p className="text-white/60">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              {/* Status Message */}
              {submitMessage && (
                <div className={`mb-6 p-4 rounded-lg border ${
                  submitStatus === 'success' 
                    ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}>
                  <div className="flex items-center space-x-2">
                    {submitStatus === 'success' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    <span className="text-sm font-medium">{submitMessage}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      First Name *
                    </label>
                    <input
                      {...register('first_name', { 
                        required: 'First name is required',
                        minLength: { value: 2, message: 'First name must be at least 2 characters' }
                      })}
                      type="text"
                      className="w-full bg-white/5 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all duration-300 rounded-none"
                      placeholder="John"
                      disabled={isSubmitting}
                    />
                    {errors.first_name && (
                      <p className="text-red-400 text-sm mt-1">{errors.first_name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Last Name *
                    </label>
                    <input
                      {...register('last_name', { 
                        required: 'Last name is required',
                        minLength: { value: 2, message: 'Last name must be at least 2 characters' }
                      })}
                      type="text"
                      className="w-full bg-white/5 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all duration-300 rounded-none"
                      placeholder="Doe"
                      disabled={isSubmitting}
                    />
                    {errors.last_name && (
                      <p className="text-red-400 text-sm mt-1">{errors.last_name.message}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    type="email"
                    className="w-full bg-white/5 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all duration-300 rounded-none"
                    placeholder="john@company.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full bg-white/5 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all duration-300 rounded-none"
                    placeholder="+1 (555) 123-4567"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Company and Industry */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Company
                    </label>
                    <input
                      {...register('company')}
                      type="text"
                      className="w-full bg-white/5 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all duration-300 rounded-none"
                      placeholder="Your Company"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Industry
                    </label>
                    <select
                      {...register('industry')}
                      className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all duration-300 rounded-none"
                      disabled={isSubmitting}
                    >
                      <option value="">Select Industry</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="hard-money">Hard Money Lending</option>
                      <option value="solar">Solar Energy</option>
                      <option value="government">Government Contracting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Service Interest */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Service Interest
                  </label>
                  <select
                    {...register('service')}
                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all duration-300 rounded-none"
                    disabled={isSubmitting}
                  >
                    <option value="">Select Service</option>
                    <option value="telemarketing">Telemarketing</option>
                    <option value="government-contracting">Government Contracting</option>
                    <option value="social-media">Social Media Marketing</option>
                    <option value="consultation">Strategy Consultation</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message', { 
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message must be at least 10 characters' }
                    })}
                    rows={5}
                    className="w-full bg-white/5 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all duration-300 rounded-none resize-vertical"
                    placeholder="Tell us about your project and how we can help..."
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormValid() || submitStatus === 'success'}
                  className={getSubmitButtonClass()}
                >
                  {getSubmitButtonContent()}
                </Button>
              </form>
            </GlassBox>
          </ScrollReveal>

          {/* Contact Information */}
          <ScrollReveal delay={0.6}>
            <div className="space-y-8">
              
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
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;