import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigationData } from '../data/mock';
import { Button } from './ui/button';
import { ChevronDown, Menu, X, Phone, Building, Share2, Home, DollarSign, Zap, Users } from 'lucide-react';
import GlassBox from './GlassBox';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const handleBookCall = () => {
    // Navigate to contact page
    window.location.href = '/contact';
  };

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
    const handleClickOutside = (event) => {
      // Only close if clicking outside the dropdown area
      if (activeDropdown && !event.target.closest('[data-dropdown]') && !event.target.closest('button')) {
        setActiveDropdown(null);
      }
    };
    
    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeDropdown]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownToggle = (itemName, e) => {
    e.preventDefault();
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
            <Link to="/" className="text-xl font-bold text-white tracking-tight hover:text-[#00FFD1] transition-colors duration-300">
              {navigationData.logo}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationData.menuItems.map((item) => (
              <div key={item.name} className="relative" data-dropdown>
                {item.dropdown ? (
                  <>
                    <button
                      className="flex items-center space-x-1 text-white/70 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/5"
                      onClick={(e) => handleDropdownToggle(item.name, e)}
                    >
                      <span className="text-sm font-medium">{item.name}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                    {activeDropdown === item.name && (
                      <div 
                        className="fixed left-0 mt-2 w-56" 
                        data-dropdown 
                        style={{
                          top: '100%',
                          zIndex: 9999,
                          position: 'absolute',
                          transform: 'translateY(8px)'
                        }}
                      >
                        <GlassBox 
                          className="py-2 shadow-2xl backdrop-blur-md"
                          blur={16}
                          opacity={0.5}
                          border={true}
                        >
                          {item.dropdown.map((subItem, index) => {
                            const IconComponent = item.name === 'Services' ? serviceIcons[subItem.name] : industryIcons[subItem.name];
                            return (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                className="flex items-center space-x-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm font-medium group"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {IconComponent && (
                                  <IconComponent className="w-4 h-4 text-[#00FFD1] group-hover:scale-110 transition-transform duration-200" />
                                )}
                                <span>{subItem.name}</span>
                              </a>
                            );
                          })}
                        </GlassBox>
                      </div>
                    )}
                  </>
                ) : (
                  item.href.startsWith('/') ? (
                    <Link
                      to={item.href}
                      className={`text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300 ${
                        location.pathname === item.href 
                          ? 'text-[#00FFD1] bg-white/10' 
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium py-2 px-4 rounded-lg hover:bg-white/5"
                    >
                      {item.name}
                    </a>
                  )
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Button 
              onClick={handleBookCall}
              className="btn-primary bg-[#00FFD1] text-black border-none rounded-none px-5 py-2 text-sm font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 min-h-[40px] cursor-pointer"
            >
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
            <GlassBox 
              className="mt-4 p-4" 
              opacity={0.1}
              blur={16}
              border={true}
            >
              <nav className="space-y-2">
                {navigationData.menuItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div>
                        <button
                          className="flex items-center justify-between w-full text-white/70 hover:text-white transition-colors duration-300 py-3 px-2 text-sm font-medium rounded-lg hover:bg-white/5"
                          onClick={(e) => handleDropdownToggle(item.name, e)}
                        >
                          <span>{item.name}</span>
                          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`} />
                        </button>
                        {activeDropdown === item.name && (
                          <div className="ml-2 mt-2 space-y-1 pl-4 border-l border-white/20">
                            {item.dropdown.map((subItem) => {
                              const IconComponent = item.name === 'Services' ? serviceIcons[subItem.name] : industryIcons[subItem.name];
                              return (
                                <a
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="flex items-center space-x-3 text-white/60 hover:text-white transition-colors duration-300 py-2 px-2 text-sm rounded-lg hover:bg-white/5"
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    setIsMobileMenuOpen(false);
                                  }}
                                >
                                  {IconComponent && (
                                    <IconComponent className="w-4 h-4 text-[#00FFD1]" />
                                  )}
                                  <span>{subItem.name}</span>
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      item.href.startsWith('/') ? (
                        <Link
                          to={item.href}
                          className={`block py-3 px-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                            location.pathname === item.href 
                              ? 'text-[#00FFD1] bg-white/10' 
                              : 'text-white/70 hover:text-white hover:bg-white/5'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          className="block text-white/70 hover:text-white transition-colors duration-300 py-3 px-2 text-sm font-medium rounded-lg hover:bg-white/5"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      )
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-white/10">
                  <Button 
                    onClick={() => {
                      handleBookCall();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full btn-primary bg-[#00FFD1] text-black border-none rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 min-h-[40px] cursor-pointer"
                  >
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