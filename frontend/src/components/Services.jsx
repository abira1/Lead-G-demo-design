import React from 'react';
import { servicesData } from '../data/mock';
import { Phone, Building, Share2, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

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
          <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            Services that <span className="text-[#00FFD1]">deliver results</span>
          </h2>
          <p className="text-xl text-white/85 font-medium max-w-3xl mx-auto leading-relaxed">
            From telemarketing to government contracting, we provide comprehensive lead generation 
            solutions tailored to your industry's unique challenges.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            
            return (
              <div key={service.id} 
                   className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 lg:p-10 hover:bg-white/10 transition-all duration-500 hover:border-[#00FFD1]/30 hover:shadow-2xl hover:shadow-[#00FFD1]/10 transform hover:-translate-y-2">
                
                {/* Service Icon */}
                <div className="mb-8">
                  <div className="w-16 h-16 bg-[#00FFD1]/10 backdrop-blur-sm rounded-none flex items-center justify-center group-hover:bg-[#00FFD1]/20 transition-all duration-400">
                    <IconComponent className="w-8 h-8 text-[#00FFD1]" />
                  </div>
                </div>

                {/* Service Content */}
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                  {service.title}
                </h3>
                
                <p className="text-lg text-white/75 font-medium leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#00FFD1] flex-shrink-0" />
                      <span className="text-white/85 font-medium text-lg">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Learn More Button */}
                <Button className="btn-secondary bg-white/5 text-white border-none rounded-none px-6 py-3 text-lg font-medium hover:bg-white hover:text-black transition-all duration-400 min-h-[48px] flex items-center space-x-3 group w-full justify-center">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 p-12 lg:p-16">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
            Ready to scale your outbound efforts?
          </h3>
          <p className="text-xl text-white/85 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            Book a free consultation to discuss your specific needs and see how we can help 
            you generate more qualified leads than ever before.
          </p>
          <Button className="btn-primary bg-[#00FFD1] text-black border-none rounded-none px-8 py-4 text-xl font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 min-h-[64px] flex items-center space-x-3 mx-auto">
            <Phone className="w-5 h-5" />
            <span>Book Free Consultation</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;