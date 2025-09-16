import React from 'react';
import { navigationData, contactData } from '../data/mock';
import { Button } from './ui/button';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-16 py-20">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              <span className="text-3xl font-bold text-white tracking-tight">
                {navigationData.logo}
              </span>
            </div>
            <p className="text-lg text-white/75 font-medium leading-relaxed mb-8">
              Your global partner in telemarketing, marketing, and government contracting support. 
              Turning conversations into customers since 2017.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white">Stay Updated</h4>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-3 focus:outline-none focus:border-[#00FFD1] transition-colors duration-300 rounded-none"
                />
                <Button className="btn-primary bg-[#00FFD1] text-black border-none rounded-none px-6 py-3 text-base font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 flex items-center space-x-2">
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold text-white mb-8">Quick Links</h4>
            <nav className="space-y-4">
              {navigationData.menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-lg text-white/75 hover:text-[#00FFD1] transition-colors duration-300 font-medium"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold text-white mb-8">Services</h4>
            <nav className="space-y-4">
              <a href="#telemarketing" className="block text-lg text-white/75 hover:text-[#00FFD1] transition-colors duration-300 font-medium">
                Telemarketing
              </a>
              <a href="#government" className="block text-lg text-white/75 hover:text-[#00FFD1] transition-colors duration-300 font-medium">
                Government Contracting
              </a>
              <a href="#social-media" className="block text-lg text-white/75 hover:text-[#00FFD1] transition-colors duration-300 font-medium">
                Social Media Marketing
              </a>
              <a href="#lead-generation" className="block text-lg text-white/75 hover:text-[#00FFD1] transition-colors duration-300 font-medium">
                Lead Generation
              </a>
              <a href="#consultation" className="block text-lg text-white/75 hover:text-[#00FFD1] transition-colors duration-300 font-medium">
                Strategy Consultation
              </a>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold text-white mb-8">Contact Us</h4>
            <div className="space-y-6">
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-[#00FFD1]/10 rounded-none flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#00FFD1]" />
                </div>
                <div>
                  <p className="text-white/85 font-medium text-lg">{contactData.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-[#00FFD1]/10 rounded-none flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#00FFD1]" />
                </div>
                <div>
                  <p className="text-white/85 font-medium text-lg">{contactData.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-[#00FFD1]/10 rounded-none flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#00FFD1]" />
                </div>
                <div>
                  <p className="text-white/85 font-medium text-lg leading-relaxed">
                    {contactData.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-[#00FFD1]/10 rounded-none flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#00FFD1]" />
                </div>
                <div>
                  <p className="text-white/85 font-medium text-lg leading-relaxed">
                    {contactData.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-16 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            
            <div className="text-white/75 font-medium text-lg">
              © {currentYear} Lead G. All rights reserved.
            </div>

            <div className="flex items-center space-x-8">
              <a href="/privacy" className="text-white/75 hover:text-[#00FFD1] transition-colors duration-300 font-medium text-lg">
                Privacy Policy
              </a>
              <a href="/terms" className="text-white/75 hover:text-[#00FFD1] transition-colors duration-300 font-medium text-lg">
                Terms of Service
              </a>
              <a href="/cookies" className="text-white/75 hover:text-[#00FFD1] transition-colors duration-300 font-medium text-lg">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;