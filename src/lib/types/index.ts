import type { ComponentType } from 'svelte';

// Navigation types
export interface NavigationItem {
  name: string;
  href: string;
  description?: string;
}

export interface SocialLink {
  name: string;
  href: string;
  /** A lucide-svelte icon, or the local TikTok.svelte, which matches their API. */
  icon: ComponentType;
}

// Platform types
export interface Objection {
  question: string;
  answer: string;
}

export interface Plank {
  /** 1-indexed position on the platform, shown as the plank number. */
  number: number;
  /** URL segment under /platform/. Public and permanent once posted. */
  slug: string;
  title: string;
  /** Compact label for nav, footer and cards. */
  shortTitle: string;
  tagline: string;
  /** One-paragraph version used on the homepage and /platform. */
  summary: string;
  /** Body paragraphs for the plank's own page. */
  position: string[];
  objections: Objection[];
  /** True if completing this plank obliges the candidate to resign. */
  resignationTrigger: boolean;
  icon: ComponentType;
}

// Press types
export type AppearancePlatform = 'tiktok' | 'instagram' | 'youtube';

export interface Appearance {
  platform: AppearancePlatform;
  /** Platform-native id used to build the embed. */
  id: string;
  /** Canonical link to the post. */
  url: string;
  title: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  blurb?: string;
}

// Donate types
export interface Cause {
  name: string;
  url: string;
  blurb: string;
  /** Required. Must state the org is unaffiliated and receives nothing here. */
  disclaimer: string;
}

// SEO types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title: string;
    description: string;
    image?: string;
    type: string;
  };
  twitter?: {
    card: string;
    title: string;
    description: string;
    image?: string;
  };
  structuredData?: object;
}

// Page data types
export interface PageData {
  seo: SEOData;
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
