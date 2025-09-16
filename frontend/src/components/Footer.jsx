import React from 'react';
import { navigationData, contactData } from '../data/mock';
import { Button } from './ui/button';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-16 py-20">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Company Info */}
          <ScrollReveal delay={0.2}>
            <div className="lg:col-span-1">
              <div className="mb-8">
                <span className="text-2xl font-bold text-white tracking-tight">
                  {navigationData.logo}
                </span>
              </div>
              <p className="text-base text-white/60 font-medium leading-relaxed mb-8">
                Global partner in telemarketing, marketing, and government contracting since 2017.
              </p>
              
              {/* Newsletter Signup */}
              <GlassBox className="p-4">
                <h4 className="text-lg font-bold text-white mb-4">Stay Updated</h4>
                <div className="flex flex-col space-y-3">
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-2 focus:outline-none focus:border-[#00FFD1] transition-colors duration-300 rounded-none text-sm"
                  />
                  <Button className="btn-primary bg-[#00FFD1] text-black border-none rounded-none px-4 py-2 text-sm font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 flex items-center justify-center space-x-2">
                    <span>Subscribe</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </GlassBox>
            </div>
          </ScrollReveal>

          {/* Quick Navigation */}
          <ScrollReveal delay={0.4}>
            <div className="lg:col-span-1">
              <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
              <nav className="space-y-3">
                {navigationData.menuItems.slice(0, 6).map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-sm text-white/60 hover:text-[#00FFD1] transition-colors duration-300 font-medium"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </ScrollReveal>

          {/* Services */}
          <ScrollReveal delay={0.6}>
            <div className="lg:col-span-1">
              <h4 className="text-lg font-bold text-white mb-6">Services</h4>
              <nav className="space-y-3">
                <a href="#telemarketing" className="block text-sm text-white/60 hover:text-[#00FFD1] transition-colors duration-300 font-medium">
                  Telemarketing
                </a>
                <a href="#government" className="block text-sm text-white/60 hover:text-[#00FFD1] transition-colors duration-300 font-medium">
                  Government Contracting
                </a>
                <a href="#social-media" className="block text-sm text-white/60 hover:text-[#00FFD1] transition-colors duration-300 font-medium">
                  Social Media Marketing
                </a>
                <a href="#consultation" className="block text-sm text-white/60 hover:text-[#00FFD1] transition-colors duration-300 font-medium">
                  Strategy Consultation
                </a>
              </nav>
            </div>
          </ScrollReveal>

          {/* Contact Information */}
          <ScrollReveal delay={0.8}>
            <div className="lg:col-span-1">
              <h4 className="text-lg font-bold text-white mb-6">Contact</h4>
              <div className="space-y-4">
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#00FFD1]/20 rounded-none flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#00FFD1]" />
                  </div>
                  <div>
                    <p className="text-white/70 font-medium text-sm">{contactData.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#00FFD1]/20 rounded-none flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#00FFD1]" />
                  </div>
                  <div>
                    <p className="text-white/70 font-medium text-sm">{contactData.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#00FFD1]/20 rounded-none flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#00FFD1]" />
                  </div>
                  <div>
                    <p className="text-white/70 font-medium text-sm leading-relaxed">
                      Austin, TX 78701
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-16 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            
            <div className="text-white/60 font-medium text-sm">
              © {currentYear} Lead G. All rights reserved.
            </div>

            <div className="flex items-center space-x-6">
              <a href="/privacy" className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300 font-medium text-sm">
                Privacy
              </a>
              <a href="/terms" className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300 font-medium text-sm">
                Terms
              </a>
              <a href="/cookies" className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300 font-medium text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;