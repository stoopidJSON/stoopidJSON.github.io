<script lang="ts">
  import { ArrowLeft, ArrowRight, Calendar, Clock, User, Share2, BookOpen, Star } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import { formatDate } from '$lib/utils';
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  $: ({ post, seo } = data);
  
  // Parse the content to handle line breaks and formatting
  $: formattedContent = (() => {
    if (!post?.fields) return ['Loading article...'];
    
    const content = post.fields.content;
    
    // Handle Contentful Rich Text format
    if (content && typeof content === 'object' && content.content) {
      const textContent = content.content
        .map((node: any) => {
          if (node.nodeType === 'paragraph' && node.content) {
            return node.content
              .map((textNode: any) => textNode.value || '')
              .join('');
          } else if (node.nodeType === 'heading-2' && node.content) {
            return '## ' + node.content
              .map((textNode: any) => textNode.value || '')
              .join('');
          }
          return '';
        })
        .filter((text: string) => text.trim())
        .join('\n\n');
      
      return textContent ? textContent.split('\n\n') : ['Article content not available.'];
    }
    
    // Handle plain text format (fallback data)
    if (typeof content === 'string' && content.trim()) {
      return content.split('\n\n').filter(p => p.trim());
    }
    
    return ['Article content not available.'];
  })();
  
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
  
  <!-- Open Graph -->
  <meta property="og:title" content={seo.title} />
  <meta property="og:description" content={seo.description} />
  <meta property="og:type" content="article" />
  <meta property="article:author" content={post.fields.authorName || 'Jason Anton'} />
  <meta property="article:published_time" content={post.fields.publishedDate} />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={seo.title} />
  <meta name="twitter:description" content={seo.description} />
</svelte:head>

<!-- Breadcrumb -->
<section class="bg-neutral-50 py-4">
  <div class="container-custom">
    <nav class="flex items-center space-x-2 text-sm text-neutral-600">
      <a href="/" class="hover:text-primary-600">Home</a>
      <span>/</span>
      <a href="/insights" class="hover:text-primary-600">Insights</a>
      <span>/</span>
      <span class="text-neutral-900">{post.fields.title}</span>
    </nav>
  </div>
</section>

<!-- Article Header -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto">
      <!-- Back Button -->
      <div class="mb-8">
        <Button href="/insights" variant="ghost" size="sm">
          <ArrowLeft class="mr-2 h-4 w-4" />
          Back to Insights
        </Button>
      </div>
      
      <!-- Article Meta -->
      <div class="text-center mb-8">
        <div class="flex items-center justify-center space-x-4 mb-4">
          <span class="px-3 py-1 rounded-full text-sm font-medium {getCategoryColor(post.fields.category)}">
            {post.fields.category}
          </span>
          {#if post.fields.featured}
            <div class="flex items-center bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              <Star class="w-3 h-3 mr-1" />
              Featured
            </div>
          {/if}
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
          {post.fields.title}
        </h1>
        
        <p class="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto mb-8">
          {post.fields.excerpt}
        </p>
        
        <!-- Author and Meta Info -->
        <div class="flex items-center justify-center space-x-6 text-sm text-neutral-500">
          <div class="flex items-center">
            <User class="w-8 h-8 text-neutral-400 bg-neutral-100 rounded-full p-1 mr-3" />
            <div class="text-left">
              <div class="font-medium text-neutral-900">
                {post.fields.authorName || 'Jason Anton'}
              </div>
              <div class="text-xs">The Digital Janitor</div>
            </div>
          </div>
          
          <div class="flex items-center">
            <Calendar class="w-4 h-4 mr-1" />
            {formatDate(post.fields.publishedDate)}
          </div>
          
          <div class="flex items-center">
            <Clock class="w-4 h-4 mr-1" />
            {post.fields.readingTime} min read
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Article Content -->
<section class="section-padding gradient-neutral">
  <div class="container-custom">
    <div class="grid lg:grid-cols-4 gap-12">
      <!-- Main Content -->
      <div class="lg:col-span-3">
        <article class="card p-8 lg:p-12">
          <div class="prose prose-lg max-w-none">
            {#each formattedContent as paragraph}
              {#if paragraph.startsWith('## ')}
                <h2 class="text-2xl font-bold text-neutral-900 mt-12 mb-6 first:mt-0">
                  {paragraph.replace('## ', '')}
                </h2>
              {:else if paragraph.startsWith('**') && paragraph.endsWith(':**')}
                <h3 class="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                  {paragraph.replace(/\*\*/g, '').replace(':', '')}
                </h3>
              {:else}
                <p class="text-neutral-700 leading-relaxed mb-6">
                  {paragraph}
                </p>
              {/if}
            {/each}
          </div>
        </article>
      </div>
      
      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <!-- Table of Contents (if needed) -->
        <div class="card p-6 mb-8 sticky top-8">
          <h3 class="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
            <BookOpen class="w-5 h-5 text-primary-600 mr-2" />
            Article Info
          </h3>
          
          <div class="space-y-4">
            <div>
              <div class="text-sm font-medium text-neutral-700">Category</div>
              <div class="text-neutral-900">{post.fields.category}</div>
            </div>
            
            <div>
              <div class="text-sm font-medium text-neutral-700">Reading Time</div>
              <div class="text-neutral-900">{post.fields.readingTime} minutes</div>
            </div>
            
            <div>
              <div class="text-sm font-medium text-neutral-700">Published</div>
              <div class="text-neutral-900">{formatDate(post.fields.publishedDate)}</div>
            </div>
            
            {#if post.fields.tags && post.fields.tags.length > 0}
              <div>
                <div class="text-sm font-medium text-neutral-700 mb-2">Tags</div>
                <div class="flex flex-wrap gap-1">
                  {#each post.fields.tags as tag}
                    <span class="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-md">
                      {tag}
                    </span>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
          
          <div class="border-t pt-6 mt-6">
            <h4 class="font-semibold text-neutral-900 mb-4">Found This Helpful?</h4>
            <p class="text-sm text-neutral-600 mb-6">
              Let's discuss how these insights apply to your specific challenges.
            </p>
            
            <Button href="https://calendly.com/stoopidjson/technical-assessment" variant="primary" class="w-full mb-3">
              Schedule Consultation
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
            
            <Button href="/insights" variant="outline" class="w-full" size="sm">
              More Insights
            </Button>
          </div>
        </div>
        
        <!-- Share Section -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
            <Share2 class="w-5 h-5 text-primary-600 mr-2" />
            Share This Article
          </h3>
          
          <div class="space-y-3">
            <button class="w-full text-left px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Share on LinkedIn
            </button>
            <button class="w-full text-left px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm">
              Share on Twitter
            </button>
            <button class="w-full text-left px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors text-sm">
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Newsletter Signup -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="max-w-2xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-neutral-900 mb-4">
        Enjoyed This Article?
      </h2>
      <p class="text-xl text-neutral-600 mb-8">
        Get more insights like this delivered to your inbox. No spam, no buzzwords—just practical perspectives on technology and digital transformation.
      </p>
      
      <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
        <input
          type="email"
          placeholder="Enter your email"
          class="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
        />
        <Button type="submit" variant="primary">
          Subscribe
        </Button>
      </form>
      
      <div class="text-sm text-neutral-500">
        Join other technology leaders who rely on practical insights to drive results.
      </div>
    </div>
  </div>
</section>

<!-- Related Articles / CTA -->
<section class="section-padding gradient-primary text-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      Ready to Turn Insights into Action?
    </h2>
    <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
      Reading about solutions is helpful. Implementing them successfully is where I can help. Let's discuss your specific challenges.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button href="https://calendly.com/stoopidjson/technical-assessment" variant="accent" size="lg">
        Schedule Free Consultation
        <ArrowRight class="ml-2 h-5 w-5" />
      </Button>
      
      <Button href="/services" variant="secondary" size="lg">
        View Services
      </Button>
    </div>
  </div>
</section>