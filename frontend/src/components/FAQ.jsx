import React from 'react';
import { faqData } from '../data/mock';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const FAQ = () => {
  return (
    <section id="faq" className="bg-black py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            Frequently asked <span className="text-[#00FFD1]">questions</span>
          </h2>
          <p className="text-xl text-white/85 font-medium max-w-3xl mx-auto leading-relaxed">
            Got questions? We've got answers. Find everything you need to know 
            about our lead generation services and how we can help your business grow.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`item-${faq.id}`}
                className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#00FFD1]/30 transition-all duration-300 rounded-none"
              >
                <AccordionTrigger className="px-8 py-6 text-left text-xl font-bold text-white hover:text-[#00FFD1] transition-colors duration-300 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-lg text-white/85 font-medium leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 p-12 lg:p-16">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
            Still have questions?
          </h3>
          <p className="text-xl text-white/85 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            Our team is here to help. Schedule a free consultation to discuss 
            your specific needs and get personalized answers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="tel:+1-555-123-4567"
              className="btn-primary bg-[#00FFD1] text-black border-none rounded-none px-8 py-4 text-xl font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 min-h-[64px] flex items-center space-x-3 text-decoration-none"
            >
              <span>Call Now: (555) 123-4567</span>
            </a>
            <a
              href="mailto:hello@leadg.com"
              className="btn-secondary bg-white/10 text-white border-none rounded-none px-8 py-4 text-xl font-medium hover:bg-white hover:text-black transition-all duration-400 min-h-[64px] flex items-center space-x-3 text-decoration-none"
            >
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;