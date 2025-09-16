import React, { useState } from 'react';
import { contactData, contactFormFields } from '../data/mock';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';
import { Button } from './ui/button';

const Contact = () => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({});
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0B1E] via-[#1A1B3E] to-[#0A0B1E]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,119,198,0.3),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(0,255,209,0.1),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              Get In <span className="bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-lg text-white/60 font-medium max-w-3xl mx-auto">
              Ready to transform your lead generation? Let's discuss how we can help your business grow.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <ScrollReveal delay={0.2}>
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-white mb-8">Contact Information</h3>
              
              {/* Office Locations */}
              <div className="space-y-6">
                <GlassBox className="p-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-[#00FFD1] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Canada Office</h4>
                      <p className="text-white/70">{contactData.address.canada}</p>
                    </div>
                  </div>
                </GlassBox>

                <GlassBox className="p-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-[#00FFD1] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Bangladesh Office</h4>
                      <p className="text-white/70">{contactData.address.bangladesh}</p>
                    </div>
                  </div>
                </GlassBox>
              </div>

              {/* Phone Numbers */}
              <GlassBox className="p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-[#00FFD1] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Phone Numbers</h4>
                    <p className="text-white/70 mb-1">Canada/USA: {contactData.phone.canada}</p>
                    <p className="text-white/70">Bangladesh: {contactData.phone.bangladesh}</p>
                  </div>
                </div>
              </GlassBox>

              {/* Email */}
              <GlassBox className="p-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-[#00FFD1] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Email</h4>
                    <p className="text-white/70">{contactData.email}</p>
                  </div>
                </div>
              </GlassBox>

              {/* Business Hours */}
              <GlassBox className="p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-[#00FFD1] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Business Hours</h4>
                    <p className="text-white/70">{contactData.hours}</p>
                  </div>
                </div>
              </GlassBox>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal delay={0.4}>
            <GlassBox className="p-8">
              <h3 className="text-3xl font-bold text-white mb-8">Send us a Message</h3>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-[#00FFD1] mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-white/70">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {contactFormFields.slice(0, 2).map((field) => (
                      <div key={field.name}>
                        <label className="block text-white/80 font-medium mb-2">
                          {field.label} {field.required && <span className="text-[#00FFD1]">*</span>}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={handleInputChange}
                          required={field.required}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00FFD1] focus:bg-white/20 transition-all duration-300"
                          placeholder={field.label}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {contactFormFields.slice(2, 4).map((field) => (
                      <div key={field.name}>
                        <label className="block text-white/80 font-medium mb-2">
                          {field.label} {field.required && <span className="text-[#00FFD1]">*</span>}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={handleInputChange}
                          required={field.required}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00FFD1] focus:bg-white/20 transition-all duration-300"
                          placeholder={field.label}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-white/80 font-medium mb-2">
                      Company Name <span className="text-[#00FFD1]">*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00FFD1] focus:bg-white/20 transition-all duration-300"
                      placeholder="Company Name"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 font-medium mb-2">
                        Industry <span className="text-[#00FFD1]">*</span>
                      </label>
                      <select
                        name="industry"
                        value={formData.industry || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#00FFD1] focus:bg-white/20 transition-all duration-300"
                      >
                        <option value="">Select Industry</option>
                        {contactFormFields[5].options.map((option) => (
                          <option key={option} value={option} className="bg-[#1A1B3E] text-white">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-white/80 font-medium mb-2">
                        Service Interested In <span className="text-[#00FFD1]">*</span>
                      </label>
                      <select
                        name="service"
                        value={formData.service || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#00FFD1] focus:bg-white/20 transition-all duration-300"
                      >
                        <option value="">Select Service</option>
                        {contactFormFields[6].options.map((option) => (
                          <option key={option} value={option} className="bg-[#1A1B3E] text-white">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 font-medium mb-2">
                      Message <span className="text-[#00FFD1]">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message || ''}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00FFD1] focus:bg-white/20 transition-all duration-300 resize-none"
                      placeholder="Tell us about your lead generation goals..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#00FFD1] text-black font-medium py-4 px-8 rounded-lg hover:bg-[#00FFD1]/90 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </GlassBox>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;