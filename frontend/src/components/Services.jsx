import React from 'react';
import { servicesData } from '../data/mock';
import { Phone, Building, Share2, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const iconMap = {
  Phone: Phone,
  Building: Building,
  Share2: Share2
};

const Services = () => {
  return (
    <section id="services" className="bg-black py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-20">
          <ScrollReveal delay={0.2}>
            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              What we <span className="text-[#00FFD1]">deliver</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <p className="text-lg text-white/60 font-medium max-w-2xl mx-auto">
              Comprehensive solutions for modern business growth
            </p>
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            
            return (
              <ScrollReveal key={service.id} delay={0.2 * (index + 1)}>
                <GlassBox 
                  className="group p-8 lg:p-12 h-full flex flex-col cursor-pointer"
                  blur={16}
                  opacity={0.1}
                  noise={false}
                  hover={true}
                  glow={true}
                  shine={true}
                  hoverScale={1.05}
                >
                  
                  {/* Service Icon */}
                  <div className="mb-8 text-center">
                    <GlassBox 
                      className="w-20 h-20 mx-auto bg-[#00FFD1]/20 backdrop-blur-sm rounded-none flex items-center justify-center transition-all duration-500 group-hover:bg-[#00FFD1]/40 group-hover:scale-110 group-hover:rotate-3" 
                      hover={true}
                      glow={true}
                    >
                      <IconComponent className="w-10 h-10 text-[#00FFD1] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg" />
                    </GlassBox>
                  </div>

                  {/* Service Content */}
                  <div className="text-center flex-grow">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight transition-all duration-300 group-hover:text-[#00FFD1] group-hover:scale-105">
                      {service.title}
                    </h3>
                    
                    <p className="text-base text-white/70 font-medium leading-relaxed mb-8 transition-all duration-300 group-hover:text-white/90">
                      {service.description}
                    </p>
                  </div>

                  {/* Learn More Button */}
                  <div className="mt-auto">
                    <Button className="bg-white/10 text-white border-none rounded-none px-6 py-3 text-base font-medium hover:bg-[#00FFD1] hover:text-black transition-all duration-400 min-h-[48px] flex items-center space-x-3 group w-full justify-center transform hover:scale-105 hover:shadow-lg hover:shadow-[#00FFD1]/25">
                      <span className="transition-all duration-300">Learn More</span>
                      <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
                    </Button>
                  </div>
                </GlassBox>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;