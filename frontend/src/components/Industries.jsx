import React from 'react';
import { industriesData } from '../data/mock';
import { TrendingUp, Home, Zap, Building2 } from 'lucide-react';

const industryIcons = {
  "Real Estate": Home,
  "Hard Money Lending": TrendingUp,
  "Solar Energy": Zap,
  "Government Contracting": Building2
};

const Industries = () => {
  return (
    <section id="industries" className="bg-black py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            Industries we <span className="text-[#00FFD1]">dominate</span>
          </h2>
          <p className="text-xl text-white/85 font-medium max-w-3xl mx-auto leading-relaxed">
            Deep industry expertise that drives results. We understand your market, 
            your challenges, and what it takes to convert prospects into customers.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {industriesData.map((industry, index) => {
            const IconComponent = industryIcons[industry.name];
            
            return (
              <div key={index} 
                   className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-all duration-500 hover:border-[#00FFD1]/30 hover:shadow-2xl hover:shadow-[#00FFD1]/10 transform hover:-translate-y-2">
                
                {/* Industry Icon */}
                <div className="mb-6">
                  <div className="w-14 h-14 bg-[#00FFD1]/10 backdrop-blur-sm rounded-none flex items-center justify-center group-hover:bg-[#00FFD1]/20 transition-all duration-400">
                    <IconComponent className="w-7 h-7 text-[#00FFD1]" />
                  </div>
                </div>

                {/* Industry Content */}
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 leading-tight">
                  {industry.name}
                </h3>
                
                <p className="text-base text-white/75 font-medium leading-relaxed mb-4">
                  {industry.description}
                </p>

                {/* Metrics */}
                <div className="pt-4 border-t border-white/10">
                  <div className="text-sm text-[#00FFD1] font-bold">
                    {industry.metrics}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Success Metrics */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl lg:text-5xl font-bold text-[#00FFD1]">250%</div>
            <div className="text-lg text-white/75 font-medium">Avg. Growth</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl lg:text-5xl font-bold text-[#00FFD1]">500+</div>
            <div className="text-lg text-white/75 font-medium">Active Clients</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl lg:text-5xl font-bold text-[#00FFD1]">28%</div>
            <div className="text-lg text-white/75 font-medium">Conversion Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl lg:text-5xl font-bold text-[#00FFD1]">$50M+</div>
            <div className="text-lg text-white/75 font-medium">Revenue Generated</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;