// src/lib/contentful/types.ts
import type { Entry, Asset } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

// Base Contentful entry type
export interface ContentfulEntry<T = any> extends Entry<T> {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
    contentType: {
      sys: {
        id: string;
      };
    };
  };
}

// Updated Blog Post content type with rich text support
export interface BlogPostFields {
  title: string;
  slug: string;
  excerpt: string;
  content: Document; // Rich text document
  publishedDate: string;
  updatedDate?: string;
  featured: boolean;
  readingTime: number;
  tags?: string[];
  category: 'Technical Deep Dive' | 'Industry Analysis' | 'Opinion' | 'How-To Guide' | 'Career & Leadership';
  authorName: string;
  authorBio?: string;
  authorAvatar?: Asset;
  featuredImage?: Asset;
  featuredImageAltText?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords?: string[];
}

export type BlogPost = ContentfulEntry<BlogPostFields>;

// Keep existing types...
export interface HomepageFields {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroImage: Asset;
  featuredServices: Entry<ServiceFields>[];
  featuredCaseStudies: Entry<CaseStudyFields>[];
  testimonials: Entry<TestimonialFields>[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

export type Homepage = ContentfulEntry<HomepageFields>;

// Service content type
export interface ServiceFields {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  pricing: {
    type: 'hourly' | 'project' | 'retainer';
    startingPrice: number;
    priceRange: string;
  };
  order: number;
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
}

export type Service = ContentfulEntry<ServiceFields>;

// Case Study content type
export interface CaseStudyFields {
  title: string;
  slug: string;
  client: {
    name: string;
    industry: string;
    size: string;
    logo?: Asset;
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
  publishedDate: string;
  featured: boolean;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    avatar?: Asset;
  };
  images: Asset[];
  seoTitle: string;
  seoDescription: string;
}

export type CaseStudy = ContentfulEntry<CaseStudyFields>;

// Author content type
export interface AuthorFields {
  name: string;
  bio: string;
  avatar: Asset;
  title: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export type Author = ContentfulEntry<AuthorFields>;

// Testimonial content type
export interface TestimonialFields {
  quote: string;
  author: string;
  position: string;
  company: string;
  avatar?: Asset;
  rating: number;
  featured: boolean;
}

export type Testimonial = ContentfulEntry<TestimonialFields>;

// Page content type (for About, Contact, etc.)
export interface PageFields {
  title: string;
  slug: string;
  content: Document; // Rich text document
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

export type Page = ContentfulEntry<PageFields>;

// Helper types for working with Contentful assets
export interface ContentfulAsset {
  title: string;
  description?: string;
  file: {
    url: string;
    details: {
      size: number;
      image?: {
        width: number;
        height: number;
      };
    };
    fileName: string;
    contentType: string;
  };
}

// Utility type for extracting fields from Contentful entries
export type ExtractFields<T> = T extends ContentfulEntry<infer U> ? U : never;