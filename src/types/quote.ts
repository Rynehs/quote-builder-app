export interface WebsiteType {
  id: string;
  name: string;
  price: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface HostingPlan {
  id: string;
  name: string;
  price: number;
}

export interface UrgencyLevel {
  id: string;
  name: string;
  multiplier: number;
}

export interface BuilderType {
  id: string;
  name: string;
  multiplier: number;
}

export interface QuoteCalculation {
  websiteType?: WebsiteType;
  addOns: AddOn[];
  hostingPlan?: HostingPlan;
  urgencyLevel?: UrgencyLevel;
  builderType?: BuilderType;
  total: number;
  breakdown: {
    basePrice: number;
    addOnsTotal: number;
    hostingCost: number;
    urgencyMarkup: number;
    agencyMarkup: number;
  };
}

export interface ClientInfo {
  fullName: string;
  email?: string;
  companyName?: string;
  phoneNumber?: string;
}

export interface Quotation {
  quoteNumber: string;
  date: string;
  client: ClientInfo;
  calculation: QuoteCalculation;
  validUntil: string;
}