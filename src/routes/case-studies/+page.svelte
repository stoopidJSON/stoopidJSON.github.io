<script lang="ts">
  import { ArrowRight, Calendar, Building, Users, TrendingUp, Award, Clock } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import { formatDate } from '$lib/utils';
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  $: ({ caseStudies, seo } = data);
  
  // Fallback case studies if Contentful isn't available
  const fallbackCaseStudies = [
    {
      fields: {
        title: 'McAfee Security Configuration Engine',
        slug: 'mcafee-security-config-comparison-engine-2010',
        clientName: 'McAfee (via Ciphent)',
        clientIndustry: 'Enterprise Security Software',
        clientSize: 'Fortune 500 Technology Company',
        challenge: 'Following McAfee\'s catastrophic DAT file incident in 2010, the company needed to rebuild customer trust while solving complex configuration comparison challenges across different software versions.',
        timeline: '6 months',
        publishedDate: '2010-12-01',
        featured: true,
        technologies: ['PHP', 'MySQL', 'AWS EC2', 'Drupal', 'Dictionary Compression', 'Semantic Mapping'],
        results: [
          { metric: 'Customer Confidence', value: '100%', description: 'Successfully restored enterprise customer trust' },
          { metric: 'Configuration Accuracy', value: '99%+', description: 'Semantic matching across software versions' },
          { metric: 'Business Impact', value: 'Acquisition', description: 'Project success led to Ciphent acquisition' }
        ]
      }
    }
  ];
  
  // Use Contentful data or fallback
  $: displayCaseStudies = caseStudies.length > 0 ? caseStudies : fallbackCaseStudies;
  
  // Get top result for quick preview
  function getTopResult(results: any[]) {
    if (!results || results.length === 0) return null;
    return results[0];
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
      Case Studies
    </h1>
    <p class="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
      Real-world technical solutions with measurable business impact. See how complex digital challenges become success stories.
    </p>
    <div class="text-lg text-primary-50">
      <strong>From crisis response to enterprise modernization</strong> — every project tells a story of turning digital chaos into clean, working solutions.
    </div>
  </div>
</section>

<!-- Case Studies Grid -->
<section class="section-padding bg-white">
  <div class="container-custom">
    {#if displayCaseStudies.length === 0}
      <div class="text-center py-16">
        <TrendingUp class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-neutral-600 mb-2">Case Studies Coming Soon</h3>
        <p class="text-neutral-500">I'm currently documenting my major projects. Check back soon for detailed case studies.</p>
      </div>
    {:else}
      <div class="grid lg:grid-cols-2 gap-8">
        {#each displayCaseStudies as caseStudy}
          <article class="card hover:shadow-xl transition-all duration-300 group">
            {#if caseStudy.fields.featured}
              <div class="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 text-sm font-medium">
                <Award class="w-4 h-4 inline mr-1" />
                Featured Case Study
              </div>
            {/if}
            
            <div class="p-8">
              <!-- Project Header -->
              <div class="flex items-start justify-between mb-6">
                <div>
                  <h2 class="text-2xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {caseStudy.fields.title}
                  </h2>
                  <div class="flex items-center text-sm text-neutral-600 space-x-4">
                    <div class="flex items-center">
                      <Building class="w-4 h-4 mr-1" />
                      {caseStudy.fields.clientIndustry}
                    </div>
                    <div class="flex items-center">
                      <Clock class="w-4 h-4 mr-1" />
                      {caseStudy.fields.timeline}
                    </div>
                  </div>
                </div>
                {#if caseStudy.fields.publishedDate}
                  <div class="text-sm text-neutral-500">
                    {formatDate(caseStudy.fields.publishedDate)}
                  </div>
                {/if}
              </div>
              
              <!-- Client Info -->
              <div class="mb-6">
                <div class="text-sm font-medium text-neutral-700 mb-1">Client</div>
                <div class="text-lg font-semibold text-neutral-900">{caseStudy.fields.clientName}</div>
                <div class="text-sm text-neutral-600">{caseStudy.fields.clientSize}</div>
              </div>
              
              <!-- Challenge Preview -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-neutral-900 mb-2">Challenge</h3>
                <p class="text-neutral-600 leading-relaxed">
                  {caseStudy.fields.challenge.length > 200 
                    ? caseStudy.fields.challenge.substring(0, 200) + '...'
                    : caseStudy.fields.challenge}
                </p>
              </div>
              
              <!-- Key Result -->
              {#if caseStudy.fields.results && getTopResult(caseStudy.fields.results)}
                {@const topResult = getTopResult(caseStudy.fields.results)}
                <div class="bg-primary-50 rounded-lg p-4 mb-6">
                  <div class="text-sm font-medium text-primary-700 mb-1">Key Result</div>
                  <div class="flex items-center justify-between">
                    <div class="text-2xl font-bold text-primary-600">{topResult.value}</div>
                    <div class="text-sm text-primary-700">{topResult.metric}</div>
                  </div>
                  <div class="text-sm text-primary-600 mt-1">{topResult.description}</div>
                </div>
              {/if}
              
              <!-- Technologies -->
              {#if caseStudy.fields.technologies && caseStudy.fields.technologies.length > 0}
                <div class="mb-6">
                  <div class="text-sm font-medium text-neutral-700 mb-2">Technologies</div>
                  <div class="flex flex-wrap gap-2">
                    {#each caseStudy.fields.technologies.slice(0, 4) as tech}
                      <span class="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-md">
                        {tech}
                      </span>
                    {/each}
                    {#if caseStudy.fields.technologies.length > 4}
                      <span class="px-2 py-1 bg-neutral-100 text-neutral-500 text-xs rounded-md">
                        +{caseStudy.fields.technologies.length - 4} more
                      </span>
                    {/if}
                  </div>
                </div>
              {/if}
              
              <!-- CTA -->
              <div class="flex justify-between items-center pt-4 border-t border-neutral-100">
                <Button href="/case-studies/{caseStudy.fields.slug}" variant="primary">
                  Read Full Case Study
                  <ArrowRight class="ml-2 h-4 w-4" />
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
<section class="section-padding gradient-neutral">
  <div class="container-custom text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
      Ready to Create Your Own Success Story?
    </h2>
    <p class="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
      Every case study started with a complex technical challenge. Let's discuss how I can help solve yours.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button href="https://calendly.com/stoopidjson/technical-assessment" variant="primary" size="lg">
        Schedule Free Consultation
        <ArrowRight class="ml-2 h-5 w-5" />
      </Button>
      
      <Button href="/services" variant="secondary" size="lg">
        View Services
      </Button>
    </div>
  </div>
</section>