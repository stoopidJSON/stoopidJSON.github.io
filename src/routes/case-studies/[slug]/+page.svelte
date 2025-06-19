<script lang="ts">
  import { ArrowLeft, ArrowRight, Building, Clock, Calendar, Award, TrendingUp, CheckCircle } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import { formatDate } from '$lib/utils';
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  $: ({ caseStudy, seo } = data);
  
  // Parse the solution content to handle Contentful Rich Text format
  $: formattedSolution = (() => {
    if (!caseStudy?.fields) return ['Loading case study...'];
    
    const solution = caseStudy.fields.solution;
    
    // Handle Contentful Rich Text format
    if (solution && typeof solution === 'object' && solution.content) {
      const textContent = solution.content
        .map((node: any) => {
          if (node.nodeType === 'paragraph' && node.content) {
            return node.content
              .map((textNode: any) => textNode.value || '')
              .join('');
          }
          return '';
        })
        .filter((text: string) => text.trim())
        .join('\n\n');
      
      return textContent ? textContent.split('\n\n') : ['Solution details not available.'];
    }
    
    // Handle plain text format (fallback data)
    if (typeof solution === 'string' && solution.trim()) {
      return solution.split('\n\n').filter(p => p.trim());
    }
    
    return ['Solution details not available.'];
  })();
</script>

<svelte:head>
  <title>{seo.title}</title>
  <meta name="description" content={seo.description} />
  <meta name="keywords" content={seo.keywords.join(', ')} />
</svelte:head>

<!-- Breadcrumb -->
<section class="bg-neutral-50 py-4">
  <div class="container-custom">
    <nav class="flex items-center space-x-2 text-sm text-neutral-600">
      <a href="/" class="hover:text-primary-600">Home</a>
      <span>/</span>
      <a href="/case-studies" class="hover:text-primary-600">Case Studies</a>
      <span>/</span>
      <span class="text-neutral-900">{caseStudy.fields.title}</span>
    </nav>
  </div>
</section>

<!-- Hero Section -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto">
      <!-- Back Button -->
      <div class="mb-8">
        <Button href="/case-studies" variant="ghost" size="sm">
          <ArrowLeft class="mr-2 h-4 w-4" />
          Back to Case Studies
        </Button>
      </div>
      
      <!-- Case Study Header -->
      <div class="text-center mb-12">
        {#if caseStudy.fields.featured}
          <div class="inline-flex items-center bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award class="w-4 h-4 mr-2" />
            Featured Case Study
          </div>
        {/if}
        
        <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          {caseStudy.fields.title}
        </h1>
        
        <div class="grid md:grid-cols-3 gap-6 text-center mb-8">
          <div>
            <Building class="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <div class="text-lg font-semibold text-neutral-900 mb-1">
              {caseStudy.fields.clientName}
            </div>
            <div class="text-sm text-neutral-600">
              {caseStudy.fields.clientSize}
            </div>
          </div>
          
          <div>
            <Clock class="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <div class="text-lg font-semibold text-neutral-900 mb-1">
              {caseStudy.fields.timeline}
            </div>
            <div class="text-sm text-neutral-600">
              Project Duration
            </div>
          </div>
          
          <div>
            <Calendar class="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <div class="text-lg font-semibold text-neutral-900 mb-1">
              {formatDate(caseStudy.fields.publishedDate)}
            </div>
            <div class="text-sm text-neutral-600">
              Completed
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Main Content -->
<section class="section-padding gradient-neutral">
  <div class="container-custom">
    <div class="grid lg:grid-cols-3 gap-12">
      <!-- Main Content -->
      <div class="lg:col-span-2">
        <!-- Challenge -->
        <div class="card p-8 mb-8">
          <h2 class="text-3xl font-bold text-neutral-900 mb-6 flex items-center">
            <div class="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-4">
              <TrendingUp class="w-5 h-5" />
            </div>
            The Challenge
          </h2>
          <p class="text-neutral-700 leading-relaxed text-lg">
            {caseStudy.fields.challenge}
          </p>
        </div>
        
        <!-- Solution -->
        <div class="card p-8 mb-8">
          <h2 class="text-3xl font-bold text-neutral-900 mb-6 flex items-center">
            <div class="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mr-4">
              <CheckCircle class="w-5 h-5" />
            </div>
            The Solution
          </h2>
          <div class="prose prose-lg max-w-none">
            {#each formattedSolution as paragraph}
              {#if paragraph.startsWith('**') && paragraph.endsWith('**')}
                <h3 class="text-xl font-semibold text-neutral-900 mt-8 mb-4">
                  {paragraph.replace(/\*\*/g, '')}
                </h3>
              {:else}
                <p class="text-neutral-700 leading-relaxed mb-6">
                  {paragraph}
                </p>
              {/if}
            {/each}
          </div>
        </div>
        
        <!-- Technologies -->
        {#if caseStudy.fields.technologies && caseStudy.fields.technologies.length > 0}
          <div class="card p-8">
            <h2 class="text-2xl font-bold text-neutral-900 mb-6">Technologies Used</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              {#each caseStudy.fields.technologies as tech}
                <div class="bg-neutral-100 px-4 py-2 rounded-lg text-center text-neutral-700 font-medium">
                  {tech}
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
      
      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <!-- Results -->
        {#if caseStudy.fields.results && caseStudy.fields.results.length > 0}
          <div class="card p-6 mb-8">
            <h3 class="text-xl font-semibold text-neutral-900 mb-6 flex items-center">
              <Award class="w-5 h-5 text-accent-500 mr-2" />
              Key Results
            </h3>
            
            <div class="space-y-6">
              {#each caseStudy.fields.results as result}
                <div class="border-l-4 border-primary-500 pl-4">
                  <div class="text-2xl font-bold text-primary-600 mb-1">
                    {result.value}
                  </div>
                  <div class="text-sm font-medium text-neutral-700 mb-1">
                    {result.metric}
                  </div>
                  <div class="text-sm text-neutral-600">
                    {result.description}
                  </div>
                </div>
              {/each}
            </div>
            
            <div class="border-t pt-6 mt-8">
              <h4 class="font-semibold text-neutral-900 mb-4">Interested in Similar Results?</h4>
              <p class="text-sm text-neutral-600 mb-6">
                Let's discuss how I can help solve your technical challenges.
              </p>
              
              <Button href="https://calendly.com/stoopidjson/technical-assessment" variant="primary" class="w-full">
                Schedule Consultation
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        {/if}
        
        <!-- Project Details -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-neutral-900 mb-4">Project Details</h3>
          
          <div class="space-y-4">
            <div>
              <div class="text-sm font-medium text-neutral-700">Client</div>
              <div class="text-neutral-900">{caseStudy.fields.clientName}</div>
            </div>
            
            <div>
              <div class="text-sm font-medium text-neutral-700">Industry</div>
              <div class="text-neutral-900">{caseStudy.fields.clientIndustry}</div>
            </div>
            
            <div>
              <div class="text-sm font-medium text-neutral-700">Company Size</div>
              <div class="text-neutral-900">{caseStudy.fields.clientSize}</div>
            </div>
            
            <div>
              <div class="text-sm font-medium text-neutral-700">Timeline</div>
              <div class="text-neutral-900">{caseStudy.fields.timeline}</div>
            </div>
            
            <div>
              <div class="text-sm font-medium text-neutral-700">Completed</div>
              <div class="text-neutral-900">{formatDate(caseStudy.fields.publishedDate)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="section-padding gradient-primary text-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      Ready to Tackle Your Next Challenge?
    </h2>
    <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
      Every successful project starts with understanding the real problem. Let's discuss your technical challenges.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button href="https://calendly.com/stoopidjson/technical-assessment" variant="accent" size="lg">
        Schedule Free Consultation
        <ArrowRight class="ml-2 h-5 w-5" />
      </Button>
      
      <Button href="/case-studies" variant="secondary" size="lg">
        View More Case Studies
      </Button>
    </div>
  </div>
</section>