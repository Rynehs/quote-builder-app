import { WebsiteType, AddOn, HostingPlan, UrgencyLevel, BuilderType } from '@/types/quote';

export const websiteTypes: WebsiteType[] = [
  { 
    id: 'landing', 
    name: 'Landing Page', 
    price: 10000,
    purpose: 'One-page site focused on a single goal (e.g. product, campaign, lead capture)',
    includes: [
      'Clean single-scroll layout',
      'Hero section + CTA',
      'About / Services / Contact',
      'WhatsApp or form integration',
      'Mobile responsiveness'
    ],
    clientFit: 'Events, ad campaigns, product launches, personal portfolios',
    recommendedAddOns: ['whatsapp', 'seo', 'logo']
  },
  { 
    id: 'business', 
    name: 'Business Website', 
    price: 20000,
    purpose: 'Multi-page site showcasing a company or professional services',
    includes: [
      '3-5 pages (Home, About, Services, Contact,etc)',
      'Contact form',
      'Basic SEO setup',
      'Responsive & professional layout'
    ],
    clientFit: 'Local businesses, freelancers, agencies, consultants',
    recommendedAddOns: ['whatsapp', 'logo', 'seo', 'social']
  },
  { 
    id: 'ecommerce', 
    name: 'E-Commerce Website', 
    price: 50000,
    purpose: 'Online store to sell physical or digital products',
    includes: [
      'Product catalog (10–20 items to start)',
      'Cart + Checkout',
      'Payment integration (MPesa, Paystack, etc.)',
      'Order management dashboard',
      'Inventory controls',
      'Responsive design'
    ],
    clientFit: 'Retailers, fashion shops, service sellers',
    recommendedAddOns: ['payment', 'whatsapp', 'custom'],
    techOptions: 'WooCommerce, Shopify, or custom Laravel/Node build'
  },
  { 
    id: 'blog', 
    name: 'Blog/Portfolio', 
    price: 15000,
    purpose: 'Showcase work, articles, photography, etc.',
    includes: [
      'Blog or portfolio grid',
      'CMS backend or markdown-based system',
      'Author bio, social links',
      'Responsive & minimalist layout'
    ],
    clientFit: 'Writers, photographers, creatives',
    recommendedAddOns: ['seo', 'logo']
  },
  { 
    id: 'lms', 
    name: 'LMS / Membership Site', 
    price: 75000,
    purpose: 'Deliver online courses, gated content, or community features',
    includes: [
      'Course/module creation',
      'Member registration/login',
      'Payment integration',
      'Progress tracking (optional)',
      'Admin panel',
      'Responsive UI',
      'Video upload/embed support'
    ],
    clientFit: 'Coaches, schools, training centers',
    recommendedAddOns: ['payment', 'custom'],
    techOptions: 'LearnDash (WordPress), Moodle, or custom Laravel/Vue solution'
  },
];

export const addOns: AddOn[] = [
  { id: 'seo', name: 'SEO Optimization', price: 3500, description: 'Improve your website\'s search engine rankings with keyword optimization, meta tags, and technical SEO' },
  { id: 'whatsapp', name: 'WhatsApp Chat', price: 2000, description: 'Add a WhatsApp chat widget for instant customer communication and support' },
  { id: 'payment', name: 'Payment Integration', price: 6000, description: 'Integrate M-Pesa, PayPal, Stripe and other payment gateways for online transactions' },
  { id: 'logo', name: 'Logo Design', price: 3000, description: 'Professional logo design with multiple concepts, revisions, and brand guidelines' },
  { id: 'social', name: 'Social Media Setup', price: 3500, description: 'Setup and optimize your social media profiles with consistent branding and linking' },
  { id: 'custom', name: 'Custom Feature', price: 10000, description: 'Any custom functionality or integration specific to your business needs' },
];

export const hostingPlans: HostingPlan[] = [
  { id: 'none', name: 'None', price: 0 },
  { id: 'standard', name: 'Standard Hosting Annual (Domain + Hosting(To Include Maintenance=>750)', price: 6000 },
  { id: 'premium', name: 'Annual Premium (Hosting + Maintenance)', price: 12000 },
];

export const urgencyLevels: UrgencyLevel[] = [
  { id: 'flexible', name: 'Flexible (2–4 weeks)', multiplier: 1.0 },
  { id: 'fast', name: 'Fast (1–2 weeks)', multiplier: 1.2 },
  { id: 'urgent', name: 'Urgent (<7 days)', multiplier: 1.5 },
];

export const builderTypes: BuilderType[] = [
  { id: 'freelancer', name: 'Freelancer', multiplier: 1.0 },
  { id: 'agency', name: 'Agency', multiplier: 1.3 },
];
