import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { heroData } from '../data/mock';
import { Button } from './ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import LiquidEther from './LiquidEther';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';
import { ShinyCard } from './ui/shiny-card';
import VariableProximity from './VariableProximity';

const Hero = () => {
  const containerRef = useRef(null);
  
  return (
    <section id="home" className="relative h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Liquid Background */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#00FFD1', '#FF6EB4', '#8E66FF']}
          mouseForce={25}
          cursorSize={120}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.6}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.4}
          autoIntensity={2.5}
          takeoverDuration={0.3}
          autoResumeDelay={2000}
          autoRampDuration={0.8}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Centered Content Container */}
      <div ref={containerRef} className="relative z-10 container mx-auto px-6 lg:px-16 text-center" style={{ position: 'relative' }}>
        <div className="max-w-4xl mx-auto">
          


          {/* Main Headline with Variable Proximity Effect */}
          <div className="mb-8">
            <ScrollReveal delay={0.2}>
              <h1 className="text-4xl lg:text-6xl font-bold leading-[0.9] tracking-tight">
                <VariableProximity
                  label="Turn conversations into customers"
                  className="variable-proximity-hero text-white"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 900, 'opsz' 40"
                  containerRef={containerRef}
                  radius={120}
                  falloff="exponential"
                  style={{ 
                    display: 'block',
                    lineHeight: '0.9',
                    letterSpacing: '-0.025em'
                  }}
                />
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <h1 className="text-4xl lg:text-6xl font-bold leading-[0.9] tracking-tight mt-2">
                <VariableProximity
                  label="Expert outbound"
                  className="variable-proximity-hero text-[#00FFD1]"
                  fromFontVariationSettings="'wght' 500, 'opsz' 12"
                  toFontVariationSettings="'wght' 1000, 'opsz' 50"
                  containerRef={containerRef}
                  radius={100}
                  falloff="gaussian"
                  style={{ 
                    display: 'inline',
                    lineHeight: '0.9',
                    letterSpacing: '-0.025em'
                  }}
                />
                <span className="text-white"> that scales</span>
              </h1>
            </ScrollReveal>
          </div>

          {/* Tagline */}
          <ScrollReveal delay={0.4}>
            <p className="text-lg text-white/75 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
              Global partner in telemarketing, marketing, and government contracting
            </p>
          </ScrollReveal>

          {/* CTA Buttons - Immediate load */}
          <ScrollReveal delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <Button className="bg-[#00FFD1] text-black border-none rounded-none px-8 py-4 text-lg font-medium hover:bg-[#00FFD1]/90 hover:scale-105 transition-all duration-300 min-h-[56px] flex items-center space-x-3 group">
                <Phone className="w-5 h-5" />
                <span>Book Free Call</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button className="bg-white/10 text-white border-none rounded-none px-8 py-4 text-lg font-medium hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 min-h-[56px] flex items-center space-x-3">
                <span>See Pricing</span>
              </Button>
            </div>
          </ScrollReveal>

          {/* Compact Success Metrics with Shiny Effects */}
          <ScrollReveal delay={0.6}>
            <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
              <ShinyCard className="p-4 text-center" intensity="normal">
                <div className="text-xl lg:text-2xl font-bold text-[#00FFD1] mb-1 group-hover:scale-110 transition-transform duration-300">250%</div>
                <div className="text-xs text-white/60 font-medium group-hover:text-white/80 transition-colors duration-300">Growth</div>
              </ShinyCard>
              <ShinyCard className="p-4 text-center" intensity="normal">
                <div className="text-xl lg:text-2xl font-bold text-[#00FFD1] mb-1 group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="text-xs text-white/60 font-medium group-hover:text-white/80 transition-colors duration-300">Clients</div>
              </ShinyCard>
              <ShinyCard className="p-4 text-center" intensity="normal">
                <div className="text-xl lg:text-2xl font-bold text-[#00FFD1] mb-1 group-hover:scale-110 transition-transform duration-300">$50M+</div>
                <div className="text-xs text-white/60 font-medium group-hover:text-white/80 transition-colors duration-300">Generated</div>
              </ShinyCard>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;