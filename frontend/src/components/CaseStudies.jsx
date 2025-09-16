import React from 'react';
import { caseStudiesData } from '../data/mock';
import { Button } from './ui/button';
import { ArrowRight, TrendingUp, Users, DollarSign } from 'lucide-react';

const CaseStudies = () => {
  return (
    <section id="case-studies" className="bg-black py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            Proven <span className="text-[#00FFD1]">success stories</span>
          </h2>
          <p className="text-xl text-white/85 font-medium max-w-3xl mx-auto leading-relaxed">
            Real results from real businesses. See how we've helped companies across 
            industries transform their lead generation and scale their revenue.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {caseStudiesData.map((study) => (
            <div
              key={study.id}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500 hover:border-[#00FFD1]/30 hover:shadow-2xl hover:shadow-[#00FFD1]/10 transform hover:-translate-y-2"
            >
              {/* Case Study Header */}
              <div className="p-8 lg:p-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-block bg-[#00FFD1]/10 text-[#00FFD1] px-4 py-2 text-sm font-bold uppercase tracking-wide">
                    {study.industry}
                  </span>
                  <TrendingUp className="w-6 h-6 text-[#00FFD1]" />
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                  {study.title}
                </h3>

                <p className="text-lg text-white/75 font-medium leading-relaxed mb-6">
                  {study.description}
                </p>

                <div className="bg-[#00FFD1]/5 border border-[#00FFD1]/20 p-6 mb-6">
                  <h4 className="text-xl font-bold text-[#00FFD1] mb-2">Key Result:</h4>
                  <p className="text-2xl font-bold text-white">{study.result}</p>
                </div>

                {/* Metrics */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-[#00FFD1]" />
                      <span className="text-white/75 font-medium">Qualified Leads</span>
                    </div>
                    <span className="text-white font-bold">{study.metrics.leads}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-[#00FFD1]" />
                      <span className="text-white/75 font-medium">Conversion Rate</span>
                    </div>
                    <span className="text-white font-bold">{study.metrics.conversion}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-5 h-5 text-[#00FFD1]" />
                      <span className="text-white/75 font-medium">Revenue Impact</span>
                    </div>
                    <span className="text-white font-bold">{study.metrics.revenue}</span>
                  </div>
                </div>

                {/* View Details Button */}
                <Button className="w-full btn-secondary bg-white/5 text-white border-none rounded-none px-6 py-3 text-lg font-medium hover:bg-white hover:text-black transition-all duration-400 min-h-[48px] flex items-center justify-center space-x-3">
                  <span>View Full Case Study</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 p-12 lg:p-16">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
            Ready to write your success story?
          </h3>
          <p className="text-xl text-white/85 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of businesses that have transformed their lead generation 
            with our proven strategies and expert team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button className="btn-primary bg-[#00FFD1] text-black border-none rounded-none px-8 py-4 text-xl font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 min-h-[64px] flex items-center space-x-3">
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button className="btn-secondary bg-white/10 text-white border-none rounded-none px-8 py-4 text-xl font-medium hover:bg-white hover:text-black transition-all duration-400 min-h-[64px] flex items-center space-x-3">
              <span>View All Case Studies</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;