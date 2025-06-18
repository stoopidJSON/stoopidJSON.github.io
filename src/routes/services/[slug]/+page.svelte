<script lang="ts">
  import { TrendingUp, Brain, Users, Search, ArrowRight, CheckCircle, ArrowLeft, Calendar, DollarSign, Clock } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  $: ({ service, seo } = data);
  
  // Icon mapping
  const iconMap = {
    TrendingUp,
    Brain,
    Users,
    Search,
    CheckCircle
  };
  
  function getIcon(iconName: string) {
    return iconMap[iconName as keyof typeof iconMap] || TrendingUp;
  }
  
  function formatPricingType(type: string): string {
    switch (type) {
      case 'hourly': return 'Hourly Consulting';
      case 'project': return 'Project-Based';
      case 'retainer': return 'Monthly Retainer';
      default: return 'Custom Pricing';
    }
  }
  
  // Parse the full description to handle line breaks - with better null safety
  $: formattedDescription = (() => {
    if (!service?.fields) return ['Loading service information...'];
    
    const fullDesc = service.fields.fullDescription;
    if (typeof fullDesc === 'string' && fullDesc.trim()) {
      return fullDesc.split('\n\n').filter(p => p.trim());
    }
    
    const shortDesc = service.fields.shortDescription;
    if (typeof shortDesc === 'string' && shortDesc.trim()) {
      return [shortDesc];
    }
    
    return ['Service description not available.'];
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
      <a href="/services" class="hover:text-primary-600">Services</a>
      <span>/</span>
      <span class="text-neutral-900">{service.fields.title}</span>
    </nav>
  </div>
</section>

<!-- Hero Section -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto">
      <!-- Back Button -->
      <div class="mb-8">
        <Button href="/services" variant="ghost" size="sm">
          <ArrowLeft class="mr-2 h-4 w-4" />
          Back to Services
        </Button>
      </div>
      
      <!-- Service Header -->
      <div class="text-center mb-12">
        <div class="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svelte:component this={getIcon(service.fields.icon)} class="w-10 h-10 text-primary-600" />
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          {service.fields.title}
        </h1>
        
        <p class="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
          {service.fields.shortDescription}
        </p>
      </div>
      
      <!-- Pricing Info -->
      <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8 mb-12">
        <div class="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <DollarSign class="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <div class="text-2xl font-bold text-neutral-900 mb-1">
              {service.fields.priceRange}
            </div>
            <div class="text-sm text-neutral-600">
              {formatPricingType(service.fields.pricingType)}
            </div>
          </div>
          
          <div>
            <Clock class="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <div class="text-2xl font-bold text-neutral-900 mb-1">
              1-2 Weeks
            </div>
            <div class="text-sm text-neutral-600">
              Typical Start Time
            </div>
          </div>
          
          <div>
            <Calendar class="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <div class="text-2xl font-bold text-neutral-900 mb-1">
              Flexible
            </div>
            <div class="text-sm text-neutral-600">
              Engagement Duration
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
      <!-- Main Description -->
      <div class="lg:col-span-2">
        <div class="prose prose-lg max-w-none">
          <h2 class="text-3xl font-bold text-neutral-900 mb-6">
            How I Can Help
          </h2>
          
          {#each formattedDescription as paragraph}
            <p class="text-neutral-700 leading-relaxed mb-6">
              {paragraph}
            </p>
          {/each}
        </div>
      </div>
      
      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <div class="card p-6 sticky top-8">
          <h3 class="text-xl font-semibold text-neutral-900 mb-6">
            What's Included
          </h3>
          
          {#if service.fields.features && service.fields.features.length > 0}
            <div class="space-y-3 mb-8">
              {#each service.fields.features as feature}
                <div class="flex items-start">
                  <CheckCircle class="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span class="text-neutral-700">{feature}</span>
                </div>
              {/each}
            </div>
          {/if}
          
          <div class="border-t pt-6">
            <h4 class="font-semibold text-neutral-900 mb-4">Ready to Get Started?</h4>
            <p class="text-sm text-neutral-600 mb-6">
              Schedule a free consultation to discuss your specific needs and how I can help.
            </p>
            
            <Button href="https://calendly.com/jason-conversadocs/30min" variant="primary" class="w-full">
              Schedule Consultation
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Process Section -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-neutral-900 mb-4">
          My Approach
        </h2>
        <p class="text-xl text-neutral-600">
          A proven process for delivering results
        </p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div class="flex">
          <div class="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
            <span class="font-bold">1</span>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">Discovery & Assessment</h3>
            <p class="text-neutral-600">
              Deep dive into your current situation, challenges, and goals to understand the real problem.
            </p>
          </div>
        </div>
        
        <div class="flex">
          <div class="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
            <span class="font-bold">2</span>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">Strategic Planning</h3>
            <p class="text-neutral-600">
              Develop a practical roadmap with clear priorities, timelines, and success metrics.
            </p>
          </div>
        </div>
        
        <div class="flex">
          <div class="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
            <span class="font-bold">3</span>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">Implementation</h3>
            <p class="text-neutral-600">
              Execute the plan with hands-on guidance, technical leadership, and regular progress reviews.
            </p>
          </div>
        </div>
        
        <div class="flex">
          <div class="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
            <span class="font-bold">4</span>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">Optimization & Handoff</h3>
            <p class="text-neutral-600">
              Monitor results, optimize performance, and ensure your team can maintain long-term success.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FAQ Section -->
<section class="section-padding gradient-neutral">
  <div class="container-custom">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-neutral-900 mb-4">
          Frequently Asked Questions
        </h2>
      </div>
      
      <div class="space-y-6">
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-neutral-900 mb-3">
            How quickly can we get started?
          </h3>
          <p class="text-neutral-600">
            Most engagements can begin within 1-2 weeks. For urgent situations, I can often accommodate faster timelines depending on current availability.
          </p>
        </div>
        
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-neutral-900 mb-3">
            Do you work with remote teams?
          </h3>
          <p class="text-neutral-600">
            Absolutely. I've successfully led remote and distributed teams for years. All engagements can be conducted entirely remotely, though I'm also available for on-site work when needed.
          </p>
        </div>
        
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-neutral-900 mb-3">
            What size companies do you typically work with?
          </h3>
          <p class="text-neutral-600">
            I work with organizations of all sizes, from startups to large enterprises. My experience spans from small teams to systems processing billions in transactions.
          </p>
        </div>
        
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-neutral-900 mb-3">
            How do you measure success?
          </h3>
          <p class="text-neutral-600">
            Success metrics are defined upfront and tailored to your specific goals - whether that's cost savings, performance improvements, time reduction, or successful system modernization.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Related Services -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-neutral-900 mb-4">
        Other Services
      </h2>
      <p class="text-xl text-neutral-600">
        Explore other ways I can help your organization
      </p>
    </div>
    
    <div class="grid md:grid-cols-3 gap-6">
      {#if service.fields.slug !== 'digital-transformation'}
        <div class="card p-6 text-center hover:shadow-lg transition-shadow">
          <TrendingUp class="w-8 h-8 text-primary-600 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-neutral-900 mb-2">
            Digital Transformation
          </h3>
          <p class="text-neutral-600 text-sm mb-4">
            Strategic technology modernization and transformation planning
          </p>
          <Button href="/services/digital-transformation" variant="outline" size="sm">
            Learn More
          </Button>
        </div>
      {/if}
      
      {#if service.fields.slug !== 'ai-ml-implementation'}
        <div class="card p-6 text-center hover:shadow-lg transition-shadow">
          <Brain class="w-8 h-8 text-primary-600 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-neutral-900 mb-2">
            AI/ML Implementation
          </h3>
          <p class="text-neutral-600 text-sm mb-4">
            Practical AI solutions with measurable ROI and business value
          </p>
          <Button href="/services/ai-ml-implementation" variant="outline" size="sm">
            Learn More
          </Button>
        </div>
      {/if}
      
      {#if service.fields.slug !== 'fractional-cto'}
        <div class="card p-6 text-center hover:shadow-lg transition-shadow">
          <Users class="w-8 h-8 text-primary-600 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-neutral-900 mb-2">
            Fractional CTO
          </h3>
          <p class="text-neutral-600 text-sm mb-4">
            Part-time executive technology leadership for growing companies
          </p>
          <Button href="/services/fractional-cto" variant="outline" size="sm">
            Learn More
          </Button>
        </div>
      {/if}
      
      {#if service.fields.slug !== 'technical-due-diligence'}
        <div class="card p-6 text-center hover:shadow-lg transition-shadow">
          <Search class="w-8 h-8 text-primary-600 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-neutral-900 mb-2">
            Technical Due Diligence
          </h3>
          <p class="text-neutral-600 text-sm mb-4">
            Comprehensive technology assessment for investments and M&A
          </p>
          <Button href="/services/technical-due-diligence" variant="outline" size="sm">
            Learn More
          </Button>
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- Final CTA -->
<section class="section-padding gradient-primary text-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      Ready to Get Started?
    </h2>
    <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
      Let's discuss your specific needs and develop a plan to move forward.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button href="https://calendly.com/jason-conversadocs/30min" variant="accent" size="lg">
        Schedule Free Consultation
        <ArrowRight class="ml-2 h-5 w-5" />
      </Button>
      
      <Button href="/services" variant="secondary" size="lg">
        View All Services
      </Button>
    </div>
  </div>
</section>