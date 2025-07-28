import { WebsiteType, AddOn, HostingPlan, UrgencyLevel, BuilderType } from '@/types/quote';

export const websiteTypes: WebsiteType[] = [
  { id: 'landing', name: 'Landing Page', price: 10000 },
  { id: 'business', name: 'Business Website', price: 20000 },
  { id: 'ecommerce', name: 'E-commerce Website', price: 50000 },
  { id: 'blog', name: 'Blog/Portfolio', price: 15000 },
  { id: 'lms', name: 'LMS / Membership', price: 75000 },
];

export const addOns: AddOn[] = [
  { id: 'seo', name: 'SEO Optimization', price: 7000, description: 'Improve your website\'s search engine rankings with keyword optimization, meta tags, and technical SEO' },
  { id: 'whatsapp', name: 'WhatsApp Chat', price: 2000, description: 'Add a WhatsApp chat widget for instant customer communication and support' },
  { id: 'payment', name: 'Payment Integration', price: 6000, description: 'Integrate M-Pesa, PayPal, Stripe and other payment gateways for online transactions' },
  { id: 'logo', name: 'Logo Design', price: 3000, description: 'Professional logo design with multiple concepts, revisions, and brand guidelines' },
  { id: 'social', name: 'Social Media Setup', price: 3500, description: 'Setup and optimize your social media profiles with consistent branding and linking' },
  { id: 'custom', name: 'Custom Feature', price: 10000, description: 'Any custom functionality or integration specific to your business needs' },
];

export const hostingPlans: HostingPlan[] = [
  { id: 'none', name: 'None', price: 0 },
  { id: 'standard', name: 'Standard Hosting (Domain + Hosting)', price: 6000 },
  { id: 'premium', name: 'Premium (Hosting + Maintenance)', price: 12000 },
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