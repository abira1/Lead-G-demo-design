import React from 'react';
import { motion } from 'framer-motion';
import { heroData } from '../data/mock';
import { Button } from './ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import LiquidEther from './LiquidEther';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
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
          
          {/* Credibility Strip */}
          <ScrollReveal delay={0.2}>
            <GlassBox className="inline-flex items-center space-x-4 px-6 py-3 mb-12">
              <span className="text-white/60 text-sm font-medium">Since 2017</span>
              <div className="w-1 h-1 bg-[#00FFD1] rounded-full"></div>
              <span className="text-white/60 text-sm font-medium">500+ Meetings</span>
              <div className="w-1 h-1 bg-[#00FFD1] rounded-full"></div>
              <span className="text-white/60 text-sm font-medium">28% Conversion</span>
            </GlassBox>
          </ScrollReveal>

          {/* Main Headline - Centered */}
          <div className="mb-12">
            <ScrollReveal delay={0.4}>
              <h1 className="text-6xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight mb-4">
                Turn conversations
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.6}>
              <h1 className="text-6xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight mb-4">
                into customers
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.8}>
              <h1 className="text-6xl lg:text-8xl font-bold leading-[0.9] tracking-tight">
                <span className="text-[#00FFD1]">Expert outbound</span>
                <span className="text-white"> that scales</span>
              </h1>
            </ScrollReveal>
          </div>

          {/* Tagline - Centered */}
          <ScrollReveal delay={1.0}>
            <p className="text-xl text-white/75 font-medium leading-relaxed mb-16 max-w-2xl mx-auto">
              Global partner in telemarketing, marketing, and government contracting
            </p>
          </ScrollReveal>

          {/* Centered CTA Buttons */}
          <ScrollReveal delay={1.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <Button className="btn-primary bg-[#00FFD1] text-black border-none rounded-none px-8 py-4 text-xl font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 min-h-[64px] flex items-center space-x-3 group">
                <Phone className="w-5 h-5" />
                <span>Book Free Call</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button className="btn-secondary bg-white/10 text-white border-none rounded-none px-8 py-4 text-xl font-medium hover:bg-white hover:text-black transition-all duration-400 min-h-[64px] flex items-center space-x-3">
                <span>See Pricing</span>
              </Button>
            </div>
          </ScrollReveal>

          {/* Centered Success Metrics */}
          <ScrollReveal delay={1.4}>
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <GlassBox className="p-6 text-center">
                <div className="text-2xl lg:text-3xl font-bold text-[#00FFD1] mb-1">250%</div>
                <div className="text-xs text-white/60 font-medium">Growth</div>
              </GlassBox>
              <GlassBox className="p-6 text-center">
                <div className="text-2xl lg:text-3xl font-bold text-[#00FFD1] mb-1">500+</div>
                <div className="text-xs text-white/60 font-medium">Clients</div>
              </GlassBox>
              <GlassBox className="p-6 text-center">
                <div className="text-2xl lg:text-3xl font-bold text-[#00FFD1] mb-1">$50M+</div>
                <div className="text-xs text-white/60 font-medium">Generated</div>
              </GlassBox>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-6 left-6 right-6 z-50 lg:hidden">
        <GlassBox className="p-1">
          <Button className="w-full btn-primary bg-[#00FFD1] text-black border-none rounded-none px-6 py-4 text-lg font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 min-h-[56px] flex items-center justify-center space-x-3">
            <Phone className="w-5 h-5" />
            <span>Book Free Call</span>
          </Button>
        </GlassBox>
      </div>
    </section>
  );
};

export default Hero;