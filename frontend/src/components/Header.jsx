import React, { useState, useEffect } from 'react';
import { navigationData } from '../data/mock';
import { Button } from './ui/button';
import { ChevronDown, Menu, X, Phone, Building, Share2, Home, DollarSign, Zap, Users } from 'lucide-react';
import GlassBox from './GlassBox';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Icon mapping for services and industries
  const serviceIcons = {
    "Telemarketing": Phone,
    "Gov Contracting": Building,
    "Social Media": Share2
  };

  const industryIcons = {
    "Real Estate": Home,
    "Hard Money": DollarSign,
    "Solar": Zap,
    "Gov Contracting": Users
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };
    
    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeDropdown]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownToggle = (itemName, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-400 ${
      isScrolled ? 'pt-4 px-4' : 'pt-6 px-6'
    }`}>
      {/* Glass Card Navigation */}
      <GlassBox 
        className="container mx-auto max-w-6xl px-6 lg:px-8 transition-all duration-400"
        blur={isScrolled ? 16 : 12}
        opacity={isScrolled ? 0.15 : 0.1}
        border={true}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-white tracking-tight">
              {navigationData.logo}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationData.menuItems.slice(0, 6).map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      className="flex items-center space-x-1 text-white/70 hover:text-white transition-colors duration-300 py-2 px-4 rounded-none hover:bg-white/5"
                      onClick={() => handleDropdownToggle(item.name)}
                    >
                      <span className="text-sm font-medium">{item.name}</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-48">
                        <GlassBox className="py-2">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 text-sm font-medium"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </GlassBox>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium py-2 px-4 rounded-none hover:bg-white/5"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Button className="btn-primary bg-[#00FFD1] text-black border-none rounded-none px-5 py-2 text-sm font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 min-h-[40px]">
              Book Free Call
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 hover:bg-white/5 rounded-none transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <GlassBox className="mt-4 p-4" opacity={0.05}>
              <nav className="space-y-2">
                {navigationData.menuItems.slice(0, 6).map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div>
                        <button
                          className="flex items-center justify-between w-full text-white/70 hover:text-white transition-colors duration-300 py-2 text-sm font-medium"
                          onClick={() => handleDropdownToggle(item.name)}
                        >
                          <span>{item.name}</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>
                        {activeDropdown === item.name && (
                          <div className="ml-4 mt-2 space-y-1">
                            {item.dropdown.map((subItem) => (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                className="block text-white/60 hover:text-white transition-colors duration-300 py-1 text-sm"
                              >
                                {subItem.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        className="block text-white/70 hover:text-white transition-colors duration-300 py-2 text-sm font-medium"
                      >
                        {item.name}
                      </a>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-white/10">
                  <Button className="w-full btn-primary bg-[#00FFD1] text-black border-none rounded-none px-4 py-2 text-sm font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 min-h-[40px]">
                    Book Free Call
                  </Button>
                </div>
              </nav>
            </GlassBox>
          </div>
        )}
      </GlassBox>
    </header>
  );
};

export default Header;