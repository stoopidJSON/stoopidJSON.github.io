import { createClient } from 'contentful';
import type { ContentfulClientApi, Entry } from 'contentful';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Only create client if we have the required environment variables
const hasContentfulConfig = !!(
  process.env.CONTENTFUL_SPACE_ID && 
  process.env.CONTENTFUL_ACCESS_TOKEN
);

// Contentful client configuration - only create if we have config
const client: ContentfulClientApi | null = hasContentfulConfig ? createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
}) : null;

// Helper function to handle errors gracefully
async function safeContentfulCall<T>(
  operation: () => Promise<T>,
  fallback: T,
  operationName: string = 'Contentful operation'
): Promise<T> {
  if (!client || isBrowser) {
    console.warn(`${operationName}: Contentful client not available, using fallback data`);
    return fallback;
  }

  try {
    const result = await operation();
    console.log(`${operationName}: Successfully fetched ${Array.isArray(result) ? result.length : '1'} items`);
    return result;
  } catch (error) {
    console.error(`${operationName} error:`, error);
    console.warn(`${operationName}: Using fallback data due to error`);
    return fallback;
  }
}

// Type-safe content fetching functions
export async function getHomepageContent() {
  return safeContentfulCall(async () => {
    const entries = await client!.getEntries({
      content_type: 'homepage',
      limit: 1,
    });
    return entries.items[0] || null;
  }, null);
}

export async function getServices() {
  return safeContentfulCall(async () => {
    const entries = await client!.getEntries({
      content_type: 'service',
      order: 'fields.order',
    });
    return entries.items;
  }, []);
}

export async function getCaseStudies() {
  return safeContentfulCall(async () => {
    const entries = await client!.getEntries({
      content_type: 'caseStudy',
      order: '-fields.publishedDate',
    });
    return entries.items;
  }, []);
}

export async function getBlogPosts() {
  return safeContentfulCall(async () => {
    const entries = await client!.getEntries({
      content_type: 'blogPost',
      order: '-fields.publishedDate',
    });
    return entries.items;
  }, []);
}

export async function getBlogPost(slug: string) {
  return safeContentfulCall(async () => {
    const entries = await client!.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });
    return entries.items[0] || null;
  }, null);
}

// Generic content fetcher
export async function getContentByType(contentType: string, query: any = {}) {
  return safeContentfulCall(async () => {
    const entries = await client!.getEntries({
      content_type: contentType,
      ...query,
    });
    return entries.items;
  }, []);
}

export { client };