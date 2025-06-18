<script lang="ts">
  import { ArrowRight, Calendar, Clock, Star, BookOpen, TrendingUp, User } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import { formatDate } from '$lib/utils';
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  $: ({ posts, seo } = data);
  
  // Fallback posts if Contentful isn't available
  const fallbackPosts = [
    {
      fields: {
        title: 'Federal AI Implementation 2025: Challenges & Opportunities',
        slug: 'federal-ai-implementation-2025-challenges-opportunities',
        excerpt: 'What will the 2025 federal AI landscape look like, and how can technology leaders turn challenges into opportunities? Explore practical strategies for navigating evolving guidelines, meeting security requirements, and overcoming bureaucratic resistance in government AI implementation.',
        category: 'Industry Analysis',
        publishedDate: '2025-01-15',
        readingTime: 8,
        featured: true,
        tags: ['AI', 'Federal Government', 'Digital Transformation', 'Cybersecurity'],
        authorName: 'Jason Anton'
      }
    }
  ];
  
  // Use Contentful data or fallback
  $: displayPosts = posts.length > 0 ? posts : fallbackPosts;
  
  // Get category color
  function getCategoryColor(category: string): string {
    const colors = {
      'Technical Deep Dive': 'bg-blue-100 text-blue-700',
      'Industry Analysis': 'bg-green-100 text-green-700',
      'Case Study': 'bg-purple-100 text-purple-700',
      'Opinion': 'bg-orange-100 text-orange-700',
      'How-To Guide': 'bg-cyan-100 text-cyan-700',
      'Career & Leadership': 'bg-pink-100 text-pink-700'
    };
    return colors[category as keyof typeof colors] || 'bg-neutral-100 text-neutral-700';
  }
</script>

<svelte:head>
  <title>{seo.title}</title>
  <meta name="description" content={seo.description} />
  <meta name="keywords" content={seo.keywords.join(', ')} />
</svelte:head>

<!-- Hero Section -->
<section class="section-padding gradient-primary text-white">
  <div class="container-custom text-center">
    <h1 class="text-4xl md:text-5xl font-bold mb-6">
      Insights
    </h1>
    <p class="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
      Thought leadership on digital transformation, AI implementation, and solving complex technical challenges. Real insights from 15+ years in the trenches.
    </p>
    <div class="text-lg text-primary-50">
      <strong>No buzzword bingo here</strong> — just practical perspectives from someone who's actually built the systems everyone else talks about.
    </div>
  </div>
</section>

<!-- Featured Post -->
{#if displayPosts.length > 0 && displayPosts[0].fields.featured}
  <section class="section-padding bg-white">
    <div class="container-custom">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-neutral-900 mb-4">Featured Insight</h2>
      </div>
      
      <div class="max-w-4xl mx-auto">
        <article class="card overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div class="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-3">
            <div class="flex items-center">
              <Star class="w-4 h-4 mr-2" />
              <span class="text-sm font-medium">Featured Article</span>
            </div>
          </div>
          
          <div class="p-8">
            <div class="flex items-center space-x-4 mb-4">
              <span class="px-3 py-1 rounded-full text-sm font-medium {getCategoryColor(displayPosts[0].fields.category)}">
                {displayPosts[0].fields.category}
              </span>
              <div class="flex items-center text-sm text-neutral-500">
                <Calendar class="w-4 h-4 mr-1" />
                {formatDate(displayPosts[0].fields.publishedDate)}
              </div>
              <div class="flex items-center text-sm text-neutral-500">
                <Clock class="w-4 h-4 mr-1" />
                {displayPosts[0].fields.readingTime} min read
              </div>
            </div>
            
            <h3 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 hover:text-primary-600 transition-colors">
              <a href="/insights/{displayPosts[0].fields.slug}">
                {displayPosts[0].fields.title}
              </a>
            </h3>
            
            <p class="text-neutral-600 leading-relaxed mb-6">
              {displayPosts[0].fields.excerpt}
            </p>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <User class="w-8 h-8 text-neutral-400 bg-neutral-100 rounded-full p-1 mr-3" />
                <div>
                  <div class="text-sm font-medium text-neutral-900">
                    {displayPosts[0].fields.authorName || 'Jason Anton'}
                  </div>
                  <div class="text-xs text-neutral-500">The Digital Janitor</div>
                </div>
              </div>
              
              <Button href="/insights/{displayPosts[0].fields.slug}" variant="primary">
                Read Article
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {#if displayPosts[0].fields.tags && displayPosts[0].fields.tags.length > 0}
              <div class="border-t pt-4 mt-6">
                <div class="flex flex-wrap gap-2">
                  {#each displayPosts[0].fields.tags as tag}
                    <span class="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-md">
                      {tag}
                    </span>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        </article>
      </div>
    </div>
  </section>
{/if}

<!-- All Posts -->
<section class="section-padding {displayPosts.length > 0 && displayPosts[0].fields.featured ? 'gradient-neutral' : 'bg-white'}">
  <div class="container-custom">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-neutral-900 mb-4">
        {displayPosts.length > 0 && displayPosts[0].fields.featured ? 'More Insights' : 'Latest Insights'}
      </h2>
    </div>
    
    {#if displayPosts.length === 0}
      <div class="text-center py-16">
        <BookOpen class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-neutral-600 mb-2">Insights Coming Soon</h3>
        <p class="text-neutral-500 mb-8">I'm currently writing insights based on my 15+ years of technical experience. Check back soon for thought leadership content.</p>
        <Button href="https://calendly.com/jason-conversadocs/30min" variant="primary">
          Schedule a Conversation Instead
          <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
      </div>
    {:else}
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each displayPosts.slice(displayPosts[0].fields.featured ? 1 : 0) as post}
          <article class="card hover:shadow-lg transition-shadow duration-300 group">
            <div class="p-6">
              <!-- Category and Meta -->
              <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-full text-sm font-medium {getCategoryColor(post.fields.category)}">
                  {post.fields.category}
                </span>
                <div class="flex items-center text-sm text-neutral-500">
                  <Clock class="w-4 h-4 mr-1" />
                  {post.fields.readingTime} min
                </div>
              </div>
              
              <!-- Title -->
              <h3 class="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                <a href="/insights/{post.fields.slug}">
                  {post.fields.title}
                </a>
              </h3>
              
              <!-- Excerpt -->
              <p class="text-neutral-600 leading-relaxed mb-4 line-clamp-3">
                {post.fields.excerpt}
              </p>
              
              <!-- Footer -->
              <div class="flex items-center justify-between pt-4 border-t border-neutral-100">
                <div class="flex items-center text-sm text-neutral-500">
                  <Calendar class="w-4 h-4 mr-1" />
                  {formatDate(post.fields.publishedDate)}
                </div>
                
                <Button href="/insights/{post.fields.slug}" variant="ghost" size="sm">
                  Read More
                  <ArrowRight class="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </div>
</section>

<!-- CTA Section -->
<section class="section-padding gradient-primary text-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      Ready to Turn Insights into Action?
    </h2>
    <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
      Reading about solutions is one thing. Implementing them is another. Let's discuss how these insights apply to your specific challenges.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button href="https://calendly.com/jason-conversadocs/30min" variant="accent" size="lg">
        Schedule Free Consultation
        <ArrowRight class="ml-2 h-5 w-5" />
      </Button>
      
      <Button href="/services" variant="secondary" size="lg">
        View Services
      </Button>
    </div>
  </div>
</section>

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>