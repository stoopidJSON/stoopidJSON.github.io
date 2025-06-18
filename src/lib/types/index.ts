// Navigation types
export interface NavigationItem {
  name: string;
  href: string;
  description?: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: any;
}

// Service types
export interface Service {
  id: string;
  title: string;
  description: string;
  href: string;
  icon?: any;
  features?: string[];
  pricing?: {
    type: 'hourly' | 'project' | 'retainer';
    range: string;
  };
}

// Case study types
export interface CaseStudy {
  id: string;
  title: string;
  client: {
    name: string;
    industry: string;
    size: string;
  };
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  technologies: string[];
  timeline: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  featured?: boolean;
}

// Blog/Insight types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    bio: string;
    avatar: string;
  };
  tags: string[];
  readingTime: number;
  featured?: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: 'digital-transformation' | 'ai-ml' | 'fractional-cto' | 'due-diligence' | 'other';
  budget: string;
  timeline: string;
  message: string;
  source?: string;
}

// Lead magnet types
export interface LeadMagnet {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'calculator' | 'assessment' | 'template' | 'checklist';
  downloadUrl: string;
  landingPage: string;
  fields: FormField[];
}

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'select' | 'textarea' | 'checkbox';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

// SEO types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title: string;
    description: string;
    image: string;
    type: string;
  };
  twitter?: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
  structuredData?: object;
}

// Page data types
export interface PageData {
  seo: SEOData;
  content?: any;
}

// Analytics types
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

// Utility types
export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  class?: string;
}