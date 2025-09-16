import React from 'react';
import { caseStudiesData } from '../data/mock';
import { Button } from './ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const CaseStudies = () => {
  return (
    <section id="case-studies" className="bg-black py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-20">
          <ScrollReveal delay={0.2}>
            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              Proven <span className="text-[#00FFD1]">results</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <p className="text-lg text-white/60 font-medium max-w-2xl mx-auto">
              Real success stories from real businesses
            </p>
          </ScrollReveal>
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {caseStudiesData.map((study, index) => (
            <ScrollReveal key={study.id} delay={0.2 * (index + 1)}>
              <GlassBox className="group overflow-hidden hover:scale-[1.02] transition-all duration-500">
                
                {/* Case Study Header */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="inline-block bg-[#00FFD1]/20 text-[#00FFD1] px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-none">
                      {study.industry}
                    </span>
                    <TrendingUp className="w-5 h-5 text-[#00FFD1]" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 leading-tight">
                    {study.title}
                  </h3>

                  <GlassBox className="p-4 mb-6" opacity={0.05}>
                    <div className="text-2xl font-bold text-[#00FFD1] mb-1">{study.result}</div>
                    <div className="text-sm text-white/60">Key Result</div>
                  </GlassBox>

                  {/* Simplified Metrics */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Revenue Impact</span>
                      <span className="text-white font-bold">{study.metrics.revenue}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Conversion Rate</span>
                      <span className="text-white font-bold">{study.metrics.conversion}</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Button className="w-full btn-secondary bg-white/10 text-white border-none rounded-none px-6 py-3 text-sm font-medium hover:bg-white hover:text-black transition-all duration-400 min-h-[40px] flex items-center justify-center space-x-3">
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </GlassBox>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.8}>
          <div className="text-center">
            <GlassBox className="p-12 lg:p-16 max-w-3xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Ready to write your success story?
              </h3>
              <p className="text-base text-white/70 mb-8 max-w-xl mx-auto">
                Join hundreds of businesses transforming their lead generation
              </p>
              <Button className="btn-primary bg-[#00FFD1] text-black border-none rounded-none px-8 py-4 text-lg font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 min-h-[56px] flex items-center space-x-3 mx-auto">
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </GlassBox>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CaseStudies;