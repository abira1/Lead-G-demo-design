import React, { useState } from 'react';
import { pricingData } from '../data/mock';
import { Button } from './ui/button';
import { CheckCircle, ArrowRight, Star } from 'lucide-react';
import LiquidEther from './LiquidEther';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <section id="pricing" className="relative bg-black py-24 lg:py-32 overflow-hidden">
      {/* Liquid Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <LiquidEther
          colors={['#00FFD1', '#8E66FF', '#FF6EB4']}
          mouseForce={15}
          cursorSize={80}
          isViscous={true}
          viscous={25}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.4}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.8}
          takeoverDuration={0.4}
          autoResumeDelay={3000}
          autoRampDuration={1.0}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-20">
          <ScrollReveal delay={0.2}>
            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              <span className="text-[#00FFD1]">Pricing</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <p className="text-lg text-white/60 font-medium max-w-2xl mx-auto mb-8">
              Simple, transparent pricing for every business size
            </p>
          </ScrollReveal>

          {/* Billing Toggle */}
          <ScrollReveal delay={0.6}>
            <GlassBox 
              className="inline-flex items-center p-1 max-w-fit mx-auto"
              blur={20}
              opacity={0.15}
              noise={true}
            >
              <button
                className={`px-6 py-3 text-base font-medium transition-all duration-300 rounded-none ${
                  billingCycle === 'monthly'
                    ? 'bg-[#00FFD1] text-black'
                    : 'text-white/70 hover:text-white'
                }`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-3 text-base font-medium transition-all duration-300 rounded-none ${
                  billingCycle === 'quarterly'
                    ? 'bg-[#00FFD1] text-black'
                    : 'text-white/70 hover:text-white'
                }`}
                onClick={() => setBillingCycle('quarterly')}
              >
                Quarterly
                <span className="ml-2 text-xs bg-[#FF6EB4] text-white px-2 py-1 rounded-full">Save 15%</span>
              </button>
            </GlassBox>
          </ScrollReveal>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {pricingData.map((plan, index) => (
            <ScrollReveal key={plan.id} delay={0.2 * (index + 1)}>
              <GlassBox 
                className={`relative p-8 lg:p-10 h-full flex flex-col cursor-pointer ${
                  plan.popular ? 'scale-105' : ''
                }`}
                blur={plan.popular ? 20 : 16}
                opacity={plan.popular ? 0.2 : 0.15}
                noise={true}
                hover={true}
                glow={plan.popular}
                hoverScale={plan.popular ? 1.08 : 1.05}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <GlassBox 
                      className="bg-[#00FFD1] text-black px-4 py-2 text-sm font-bold flex items-center space-x-2" 
                      opacity={1}
                      blur={0}
                    >
                      <Star className="w-4 h-4" />
                      <span>POPULAR</span>
                    </GlassBox>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl lg:text-5xl font-bold text-white">
                      {plan.price}
                    </span>
                    {plan.price !== 'Custom' && (
                      <span className="text-lg text-white/70 ml-2">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-sm text-white/60 font-medium">
                    {plan.description}
                  </p>
                </div>

                {/* Features List - Simplified */}
                <div className="space-y-3 mb-8 flex-grow">
                  {plan.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-[#00FFD1] flex-shrink-0" />
                      <span className="text-white/75 font-medium text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                  {plan.features.length > 4 && (
                    <div className="text-white/50 text-xs pt-2">
                      +{plan.features.length - 4} more features
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <Button 
                    className={`w-full min-h-[48px] flex items-center justify-center space-x-3 text-base font-medium border-none rounded-none transition-all duration-500 transform hover:scale-105 hover:shadow-lg ${
                      plan.popular
                        ? 'bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 hover:shadow-[#00FFD1]/30 hover:text-black'
                        : 'bg-white/10 text-white hover:bg-[#00FFD1] hover:text-black hover:shadow-[#00FFD1]/25'
                    }`}
                  >
                    <span>
                      {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </GlassBox>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;