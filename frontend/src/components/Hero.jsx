import React from 'react';
import { heroData } from '../data/mock';
import { Button } from './ui/button';
import { ArrowRight, Phone, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px),
                 repeating-linear-gradient(-90deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)
               `,
               backgroundSize: '60px 60px'
             }}>
        </div>
      </div>

      {/* Flowing Ribbon Gradient */}
      <div className="absolute top-20 -right-40 w-96 h-96 opacity-20">
        <div className="w-full h-full rounded-full"
             style={{
               background: 'linear-gradient(135deg, #FF9A6B 0%, #FF6EB4 50%, #8E66FF 100%)',
               filter: 'blur(80px)'
             }}>
        </div>
      </div>

      <div className="absolute bottom-20 -left-40 w-80 h-80 opacity-15">
        <div className="w-full h-full rounded-full"
             style={{
               background: 'linear-gradient(45deg, #00FFD1 0%, #FF6EB4 50%, #8E66FF 100%)',
               filter: 'blur(100px)'
             }}>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-16 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Credibility Strip */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-4 text-white/60 text-lg font-medium">
              <span>{heroData.credibility.split(' • ')[0]}</span>
              <div className="w-1 h-1 bg-[#00FFD1] rounded-full"></div>
              <span>{heroData.credibility.split(' • ')[1]}</span>
              <div className="w-1 h-1 bg-[#00FFD1] rounded-full"></div>
              <span>{heroData.credibility.split(' • ')[2]}</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-8">
            <span className="block">Turn conversations</span>
            <span className="block">into customers —</span>
            <span className="block">
              <span className="text-[#00FFD1]">expert outbound</span> that scales.
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-2xl text-white/85 font-medium leading-relaxed mb-12 max-w-3xl">
            {heroData.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Button className="btn-primary bg-[#00FFD1] text-black border-none rounded-none px-8 py-4 text-xl font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 min-h-[64px] flex items-center space-x-3 group">
              <Phone className="w-5 h-5" />
              <span>{heroData.primaryCTA}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            <Button className="btn-secondary bg-white/10 text-white border-none rounded-none px-8 py-4 text-xl font-medium hover:bg-white hover:text-black transition-all duration-400 min-h-[64px] flex items-center space-x-3">
              <Play className="w-5 h-5" />
              <span>{heroData.secondaryCTA}</span>
            </Button>
          </div>

          {/* Animated Flow Visualization */}
          <div className="flex items-center space-x-6 text-white/60">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-none flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#00FFD1]" />
              </div>
              <span className="text-lg font-medium">Outbound Calls</span>
            </div>
            
            <div className="w-8 h-px bg-gradient-to-r from-[#00FFD1] to-transparent animate-pulse"></div>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-none flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-[#FF6EB4]" />
              </div>
              <span className="text-lg font-medium">Qualified Leads</span>
            </div>
            
            <div className="w-8 h-px bg-gradient-to-r from-[#FF6EB4] to-transparent animate-pulse delay-300"></div>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-none flex items-center justify-center">
                <div className="w-6 h-6 bg-[#8E66FF] rounded-full animate-pulse"></div>
              </div>
              <span className="text-lg font-medium">Closed Customers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-6 left-6 right-6 z-50 lg:hidden">
        <Button className="w-full btn-primary bg-[#00FFD1] text-black border-none rounded-none px-6 py-4 text-lg font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 min-h-[56px] flex items-center justify-center space-x-3 shadow-2xl">
          <Phone className="w-5 h-5" />
          <span>{heroData.primaryCTA}</span>
        </Button>
      </div>
    </section>
  );
};

export default Hero;