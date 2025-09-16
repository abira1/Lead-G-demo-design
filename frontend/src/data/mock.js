// Mock data for Lead G - Global Lead Generation & Marketing Agency

export const heroData = {
  headline: "Turn conversations into customers — expert outbound that scales.",
  tagline: "Lead G — Your global partner in telemarketing, marketing, and government contracting support.",
  credibility: "Since 2017 • 500+ meetings booked • Avg. 28% qualified conversion",
  primaryCTA: "Book a Free Call",
  secondaryCTA: "See Pricing"
};

export const navigationData = {
  logo: "Lead G",
  menuItems: [
    { name: "Home", href: "/" },
    { 
      name: "Services", 
      href: "/#services",
      dropdown: [
        { name: "Telemarketing", href: "/#services" },
        { name: "Gov Contracting", href: "/#services" },
        { name: "Social Media", href: "/#services" }
      ]
    },
    { 
      name: "Industries", 
      href: "/#industries",
      dropdown: [
        { name: "Real Estate", href: "/#industries" },
        { name: "Hard Money", href: "/#industries" },
        { name: "Solar", href: "/#industries" },
        { name: "Gov Contracting", href: "/#industries" }
      ]
    },
    { name: "Pricing", href: "/#pricing" },
    { name: "Case Studies", href: "/#case-studies" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ]
};

export const servicesData = [
  {
    id: 1,
    title: "Telemarketing Excellence",
    description: "Professional outbound calling campaigns that convert prospects into qualified leads with our proven scripts and experienced agents. Our telemarketing team specializes in B2B lead generation across multiple industries.",
    features: ["Cold calling campaigns", "Lead qualification", "Appointment setting", "CRM integration", "Call scripting & optimization", "Real-time reporting & analytics"],
    icon: "Phone",
    results: "28% average conversion rate",
    pricing: "Starting at $2,999/month"
  },
  {
    id: 2,
    title: "Government Contracting",
    description: "Navigate complex government procurement processes with our specialized team of government contracting experts. We help businesses secure lucrative federal and state contracts through strategic positioning and compliant proposal development.",
    features: ["Proposal writing & review", "Compliance assistance", "Bid management", "Contract negotiation", "NAICS code optimization", "Past performance documentation"],
    icon: "Building",
    results: "$50M+ in contracts secured",
    pricing: "Custom consulting rates"
  },
  {
    id: 3,
    title: "Social Media Marketing",
    description: "Amplify your brand presence and generate quality leads through strategic social media campaigns and content marketing. Our team creates engaging content that drives qualified traffic and conversions.",
    features: ["Content creation & strategy", "Paid advertising campaigns", "Community management", "Analytics & reporting", "Lead generation funnels", "Brand positioning"],
    icon: "Share2",
    results: "250% average engagement increase",
    pricing: "Starting at $1,999/month"
  }
];

export const industriesData = [
  {
    name: "Real Estate",
    description: "Specialized lead generation for real estate professionals, investors, and agencies.",
    metrics: "45% increase in qualified leads"
  },
  {
    name: "Hard Money Lending",
    description: "Connect hard money lenders with qualified borrowers and investment opportunities.",
    metrics: "60% faster deal closure"
  },
  {
    name: "Solar Energy",
    description: "Generate high-quality leads for solar installation and renewable energy companies.",
    metrics: "35% conversion improvement"
  },
  {
    name: "Government Contracting",
    description: "Help businesses secure lucrative government contracts and navigate procurement.",
    metrics: "$2M+ in contracts secured"
  }
];

export const pricingData = [
  {
    id: 1,
    name: "Starter",
    price: "$2,999",
    period: "month",
    description: "Perfect for small businesses getting started with outbound lead generation.",
    features: [
      "100 qualified leads/month",
      "Basic telemarketing campaigns",
      "Email & phone support",
      "Monthly reporting",
      "CRM integration"
    ],
    popular: false
  },
  {
    id: 2,
    name: "Growth",
    price: "$5,999",
    period: "month",
    description: "Ideal for growing companies ready to scale their lead generation efforts.",
    features: [
      "300 qualified leads/month",
      "Multi-channel campaigns",
      "Dedicated account manager",
      "Weekly reporting",
      "Advanced CRM integration",
      "Social media campaigns"
    ],
    popular: true
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    period: "month",
    description: "Tailored solutions for large organizations with complex requirements.",
    features: [
      "Unlimited qualified leads",
      "Custom campaign strategies",
      "Dedicated team",
      "Real-time reporting",
      "Full-service management",
      "Government contracting support"
    ],
    popular: false
  }
];

export const caseStudiesData = [
  {
    id: 1,
    title: "Solar Company Scales to $10M Revenue",
    industry: "Solar Energy",
    result: "250% increase in qualified leads",
    description: "How we helped a regional solar company expand nationwide through strategic telemarketing and digital campaigns.",
    metrics: {
      leads: "2,500+ qualified leads/month",
      conversion: "28% conversion rate",
      revenue: "$10M annual revenue"
    }
  },
  {
    id: 2,
    title: "Real Estate Firm Doubles Listings",
    industry: "Real Estate",
    result: "120% increase in property listings",
    description: "Transforming a traditional real estate firm's lead generation with modern outbound strategies.",
    metrics: {
      leads: "800+ qualified leads/month",
      conversion: "32% conversion rate",
      revenue: "$3.2M in commissions"
    }
  },
  {
    id: 3,
    title: "Government Contractor Wins $5M Deal",
    industry: "Government",
    result: "$5M contract secured",
    description: "Strategic government contracting support that resulted in the largest contract win in company history.",
    metrics: {
      proposals: "15 successful bids",
      conversion: "75% bid success rate",
      revenue: "$5M contract value"
    }
  }
];

export const testimonialsData = [
  {
    id: 1,
    name: "Sarah Mitchell",
    title: "CEO, SolarMax Solutions",
    company: "SolarMax Solutions",
    quote: "Lead G transformed our business completely. We went from struggling to find leads to having more qualified prospects than we could handle. Their telemarketing team is simply outstanding.",
    avatar: "/api/placeholder/64/64"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Director of Sales, PropertyPro Realty",
    company: "PropertyPro Realty",
    quote: "The ROI we've seen with Lead G is incredible. Their systematic approach to lead generation has doubled our listings and tripled our revenue in just 8 months.",
    avatar: "/api/placeholder/64/64"
  },
  {
    id: 3,
    name: "Jennifer Chen",
    title: "President, TechForward Contracting",
    company: "TechForward Contracting",
    quote: "Their government contracting expertise is unmatched. Lead G helped us navigate complex procurement processes and win our largest contract to date - $5M!",
    avatar: "/api/placeholder/64/64"
  }
];

export const faqData = [
  {
    id: 1,
    question: "How quickly can you start generating leads for my business?",
    answer: "We can typically launch your first campaign within 5-7 business days after onboarding. This includes strategy development, script creation, and team training specific to your industry and target audience."
  },
  {
    id: 2,
    question: "What industries do you specialize in?",
    answer: "We specialize in Real Estate, Hard Money Lending, Solar Energy, and Government Contracting. However, our experienced team has successfully worked with businesses across various industries including healthcare, technology, and financial services."
  },
  {
    id: 3,
    question: "How do you ensure lead quality?",
    answer: "We use a multi-step qualification process that includes pre-call research, structured questioning, and verification protocols. Each lead is scored and validated before being delivered to ensure they meet your specific criteria."
  },
  {
    id: 4,
    question: "Can you integrate with our existing CRM?",
    answer: "Yes, we integrate with all major CRM systems including Salesforce, HubSpot, Pipedrive, and custom solutions. This ensures seamless lead transfer and tracking throughout your sales process."
  },
  {
    id: 5,
    question: "What's your average conversion rate?",
    answer: "Our average qualification rate is 28%, significantly higher than industry standards. However, conversion rates vary by industry and specific campaign objectives. We provide detailed analytics to track and optimize performance."
  },
  {
    id: 6,
    question: "Do you offer government contracting support?",
    answer: "Absolutely. Our government contracting division specializes in proposal writing, compliance assistance, bid management, and contract negotiation. We've helped clients secure over $50M in government contracts."
  }
];

export const contactData = {
  email: "contact@leadgenerationg.com",
  phone: {
    canada: "+1-416-857-9635",
    bangladesh: "+880 1568-200728"
  },
  address: {
    canada: "2920 Hwy 7 Vaughan, ON L4K0P4, Canada",
    bangladesh: "Bashundhara, Block J, Dhaka, Bangladesh"
  },
  hours: "Monday - Friday: 9:00 AM - 6:00 PM EST/GMT+6"
};

export const statsData = [
  {
    label: "Qualified Leads Generated",
    value: "50,000+",
    suffix: ""
  },
  {
    label: "Client Success Rate",
    value: "96",
    suffix: "%"
  },
  {
    label: "Average Conversion Rate",
    value: "28",
    suffix: "%"
  },
  {
    label: "Years of Experience",
    value: "8",
    suffix: "+"
  }
];

// About Us Data
export const aboutData = {
  mission: "To empower businesses worldwide with expert lead generation and marketing solutions that drive measurable growth and success.",
  vision: "To become the global leader in B2B lead generation, transforming how businesses connect with their ideal customers across all industries.",
  values: [
    {
      title: "Results-Driven",
      description: "We measure our success by your growth. Every campaign is optimized for maximum ROI and qualified lead generation."
    },
    {
      title: "Transparency",
      description: "Open communication, clear reporting, and honest insights. You'll always know exactly how your campaigns are performing."
    },
    {
      title: "Industry Expertise",
      description: "Deep knowledge across solar, real estate, hard money lending, and government contracting industries ensures targeted success."
    },
    {
      title: "Global Reach",
      description: "With operations in North America and South Asia, we provide 24/7 support and localized expertise for global markets."
    }
  ],
  story: "Founded in 2017, Lead G began as a specialized telemarketing agency focused on helping small businesses generate qualified leads. Over 8 years, we've evolved into a comprehensive lead generation powerhouse, serving over 500 clients across diverse industries including solar energy, real estate, hard money lending, and government contracting. Our unique combination of human expertise and cutting-edge technology has generated over $50M in revenue for our clients.",
  team: {
    size: "50+",
    experience: "8+ years average",
    locations: "Canada & Bangladesh"
  }
};

// Company Information
export const companyInfo = {
  founded: "2017",
  employees: "50+",
  headquarters: "Vaughan, Ontario, Canada",
  industries: ["Solar Energy", "Real Estate", "Hard Money Lending", "Government Contracting"],
  certifications: ["ISO 9001:2015", "Privacy Shield Certified"],
  awards: ["Best Lead Generation Agency 2023", "Top Telemarketing Service Provider"]
};

// Contact Form Fields
export const contactFormFields = [
  { name: "firstName", type: "text", label: "First Name", required: true },
  { name: "lastName", type: "text", label: "Last Name", required: true },
  { name: "email", type: "email", label: "Email Address", required: true },
  { name: "phone", type: "tel", label: "Phone Number", required: true },
  { name: "company", type: "text", label: "Company Name", required: true },
  { name: "industry", type: "select", label: "Industry", required: true, options: [
    "Solar Energy", "Real Estate", "Hard Money Lending", "Government Contracting", "Other"
  ]},
  { name: "service", type: "select", label: "Service Interested In", required: true, options: [
    "Telemarketing", "Government Contracting", "Social Media Marketing", "Multiple Services"
  ]},
  { name: "message", type: "textarea", label: "Tell us about your lead generation goals", required: true }
];

// Blog Data (Optional)
export const blogData = [
  {
    id: 1,
    title: "5 Proven Strategies to Increase Solar Lead Conversion Rates",
    excerpt: "Discover the tactics that top solar companies use to convert more leads into customers.",
    author: "Lead G Team",
    date: "2024-12-10",
    category: "Solar",
    readTime: "5 min read",
    featured: true
  },
  {
    id: 2,
    title: "Government Contracting 101: How to Win Your First Federal Contract",
    excerpt: "A complete guide to navigating the federal contracting process for new businesses.",
    author: "Lead G Team", 
    date: "2024-12-08",
    category: "Government",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 3,
    title: "Real Estate Lead Generation: Quality vs Quantity",
    excerpt: "Why focusing on lead quality over quantity generates better ROI for real estate agents.",
    author: "Lead G Team",
    date: "2024-12-05",
    category: "Real Estate", 
    readTime: "6 min read",
    featured: false
  }
];