import { createClient } from 'contentful';
import type { ContentfulClientApi, Entry } from 'contentful';

// Contentful client configuration
const client: ContentfulClientApi = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

// Type-safe content fetching functions
export async function getHomepageContent() {
  try {
    const entries = await client.getEntries({
      content_type: 'homepage',
      limit: 1,
    });
    
    return entries.items[0] || null;
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return null;
  }
}

export async function getServices() {
  try {
    const entries = await client.getEntries({
      content_type: 'service',
      order: 'fields.order',
    });
    
    return entries.items;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getCaseStudies() {
  try {
    const entries = await client.getEntries({
      content_type: 'caseStudy',
      order: '-fields.publishedDate',
    });
    
    return entries.items;
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

export async function getBlogPosts() {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      order: '-fields.publishedDate',
    });
    
    return entries.items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string) {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });
    
    return entries.items[0] || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Generic content fetcher
export async function getContentByType(contentType: string, query: any = {}) {
  try {
    const entries = await client.getEntries({
      content_type: contentType,
      ...query,
    });
    
    return entries.items;
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return [];
  }
}

export { client };