import React, { useState } from 'react';
import { pricingData } from '../data/mock';
import { Button } from './ui/button';
import { CheckCircle, ArrowRight, Star } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <section id="pricing" className="bg-black py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            Transparent <span className="text-[#00FFD1]">pricing</span>
          </h2>
          <p className="text-xl text-white/85 font-medium max-w-3xl mx-auto leading-relaxed mb-8">
            No hidden fees, no surprises. Choose the plan that fits your business 
            and scale your lead generation with confidence.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-none p-1">
            <button
              className={`px-6 py-3 text-lg font-medium transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-[#00FFD1] text-black'
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-3 text-lg font-medium transition-all duration-300 ${
                billingCycle === 'quarterly'
                  ? 'bg-[#00FFD1] text-black'
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setBillingCycle('quarterly')}
            >
              Quarterly
              <span className="ml-2 text-sm bg-[#FF6EB4] text-white px-2 py-1 rounded-full">Save 15%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {pricingData.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white/5 backdrop-blur-sm border p-8 lg:p-10 transition-all duration-500 hover:border-[#00FFD1]/30 hover:shadow-2xl hover:shadow-[#00FFD1]/10 transform hover:-translate-y-2 ${
                plan.popular
                  ? 'border-[#00FFD1]/50 bg-white/10 scale-105'
                  : 'border-white/10'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#00FFD1] text-black px-6 py-2 text-sm font-bold flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>MOST POPULAR</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-5xl lg:text-6xl font-bold text-white">
                    {plan.price}
                  </span>
                  {plan.price !== 'Custom' && (
                    <span className="text-xl text-white/70 ml-2">/{plan.period}</span>
                  )}
                </div>
                <p className="text-lg text-white/75 font-medium leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#00FFD1] flex-shrink-0 mt-0.5" />
                    <span className="text-white/85 font-medium text-lg leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                className={`w-full transition-all duration-400 min-h-[56px] flex items-center justify-center space-x-3 text-lg font-medium border-none rounded-none ${
                  plan.popular
                    ? 'bg-[#00FFD1] text-black hover:bg-[#00FFD1]/10 hover:text-[#00FFD1]'
                    : 'bg-white/10 text-white hover:bg-white hover:text-black'
                }`}
              >
                <span>
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom Trust Elements */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 text-white/75">
              <CheckCircle className="w-6 h-6 text-[#00FFD1]" />
              <span className="text-lg font-medium">No Setup Fees</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white/75">
              <CheckCircle className="w-6 h-6 text-[#00FFD1]" />
              <span className="text-lg font-medium">Cancel Anytime</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white/75">
              <CheckCircle className="w-6 h-6 text-[#00FFD1]" />
              <span className="text-lg font-medium">30-Day Money Back</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;