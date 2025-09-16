import React from 'react';
import { motion } from 'framer-motion';
import { heroData } from '../data/mock';
import { Button } from './ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import LiquidEther from './LiquidEther';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';
import { ShinyCard } from './ui/shiny-card';

const Hero = () => {
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
      <div className="relative z-10 container mx-auto px-6 lg:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          


          {/* Main Headline - Reduced size and spacing */}
          <div className="mb-8">
            <ScrollReveal delay={0.2}>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-[0.9] tracking-tight">
                Turn conversations into customers
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <h1 className="text-4xl lg:text-6xl font-bold leading-[0.9] tracking-tight mt-2">
                <span className="text-[#00FFD1]">Expert outbound</span>
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

          {/* Compact Success Metrics */}
          <ScrollReveal delay={0.6}>
            <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
              <GlassBox className="p-4 text-center" hover={true} hoverScale={1.05}>
                <div className="text-xl lg:text-2xl font-bold text-[#00FFD1] mb-1">250%</div>
                <div className="text-xs text-white/60 font-medium">Growth</div>
              </GlassBox>
              <GlassBox className="p-4 text-center" hover={true} hoverScale={1.05}>
                <div className="text-xl lg:text-2xl font-bold text-[#00FFD1] mb-1">500+</div>
                <div className="text-xs text-white/60 font-medium">Clients</div>
              </GlassBox>
              <GlassBox className="p-4 text-center" hover={true} hoverScale={1.05}>
                <div className="text-xl lg:text-2xl font-bold text-[#00FFD1] mb-1">$50M+</div>
                <div className="text-xs text-white/60 font-medium">Generated</div>
              </GlassBox>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;