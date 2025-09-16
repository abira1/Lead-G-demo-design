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
                  className="group p-8 lg:p-12 hover:scale-[1.02] transition-all duration-500 h-full flex flex-col"
                  blur={16}
                  opacity={0.1}
                  noise={true}
                >
                  
                  {/* Service Icon */}
                  <div className="mb-8 text-center">
                    <GlassBox className="w-20 h-20 mx-auto bg-[#00FFD1]/20 backdrop-blur-sm rounded-none flex items-center justify-center group-hover:bg-[#00FFD1]/30 transition-all duration-400">
                      <IconComponent className="w-10 h-10 text-[#00FFD1]" />
                    </GlassBox>
                  </div>

                  {/* Service Content */}
                  <div className="text-center flex-grow">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
                      {service.title}
                    </h3>
                    
                    <p className="text-base text-white/70 font-medium leading-relaxed mb-8">
                      {service.description}
                    </p>
                  </div>

                  {/* Learn More Button */}
                  <div className="mt-auto">
                    <Button className="btn-secondary bg-white/10 text-white border-none rounded-none px-6 py-3 text-base font-medium hover:bg-white hover:text-black transition-all duration-400 min-h-[48px] flex items-center space-x-3 group w-full justify-center">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
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