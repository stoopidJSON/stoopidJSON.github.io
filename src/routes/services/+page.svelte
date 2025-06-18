<script lang="ts">
  import { TrendingUp, Brain, Users, Search, ArrowRight, CheckCircle, Mic, PenTool } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  $: ({ services, seo } = data);
  
  // Icon mapping for services
  const iconMap = {
    TrendingUp,
    Brain,
    Users,
    Search,
    CheckCircle,
    Mic,
    PenTool
  };
  
  // Fallback services if Contentful isn't available
  const fallbackServices = [
    {
      fields: {
        title: 'Digital Transformation Strategy',
        slug: 'digital-transformation',
        shortDescription: 'End-to-end digital transformation consulting that aligns technology with business objectives. From legacy system modernization to cloud migration strategies.',
        icon: 'TrendingUp',
        priceRange: '$250-350/hour',
        pricingType: 'hourly',
        featured: true,
        features: ['Technology roadmap development', 'Legacy system modernization', 'Cloud migration strategy', 'Vendor evaluation', 'Risk assessment', 'Team training']
      }
    },
    {
      fields: {
        title: 'AI/ML Implementation',
        slug: 'ai-ml-implementation',
        shortDescription: 'Strategic AI and machine learning implementation with focus on ROI and practical applications. From platform architecture to deployment strategies.',
        icon: 'Brain',
        priceRange: '$250-1000/hour',
        pricingType: 'hourly',
        featured: true,
        features: ['AI strategy development', 'Platform architecture', 'Generative AI integration', 'ML pipeline development', 'Data governance', 'ROI optimization']
      }
    },
    {
      fields: {
        title: 'Fractional CTO Services',
        slug: 'fractional-cto',
        shortDescription: 'Part-time executive technology leadership for startups and growing companies. Strategic guidance without the full-time commitment.',
        icon: 'Users',
        priceRange: '$10K-50K/month',
        pricingType: 'retainer',
        featured: true,
        features: ['Strategic planning', 'Team leadership', 'Architecture guidance', 'Process optimization', 'Due diligence support', 'Crisis management']
      }
    },
    {
      fields: {
        title: 'Technical Due Diligence',
        slug: 'technical-due-diligence',
        shortDescription: 'Comprehensive technical assessment for M&A, investments, and strategic partnerships. Uncover hidden risks and validate technology claims.',
        icon: 'Search',
        priceRange: '$15K-75K/project',
        pricingType: 'project',
        featured: false,
        features: ['Code quality assessment', 'Architecture analysis', 'Security evaluation', 'Technical debt analysis', 'Team assessment', 'Risk mitigation']
      }
    }
  ];
  
  // Use Contentful data or fallback
  $: displayServices = services.length > 0 ? services : fallbackServices;
  
  // Get icon component
  function getIcon(iconName: string) {
    return iconMap[iconName as keyof typeof iconMap] || TrendingUp;
  }
  
  // Format pricing type
  function formatPricingType(type: string): string {
    switch (type) {
      case 'hourly': return 'Hourly';
      case 'project': return 'Project-based';
      case 'retainer': return 'Monthly Retainer';
      default: return 'Custom';
    }
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
      Consulting Services
    </h1>
    <p class="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
      From digital transformation to AI implementation, I help businesses navigate complex technical challenges with practical, results-driven solutions.
    </p>
    <div class="text-lg text-primary-50">
      <strong>The Digital Janitor approach:</strong> Clean up the mess, implement what works, deliver measurable results.
    </div>
  </div>
</section>

<!-- Services Grid -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="grid lg:grid-cols-2 gap-8">
      {#each displayServices as service}
        <div class="card p-8 hover:shadow-xl transition-all duration-300 group">
          <div class="flex items-start justify-between mb-6">
            <div class="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
              <svelte:component this={getIcon(service.fields.icon)} class="w-8 h-8 text-primary-600" />
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                {formatPricingType(service.fields.pricingType)}
              </div>
            </div>
          </div>
          
          <h3 class="text-2xl font-bold text-neutral-900 mb-4">
            {service.fields.title}
          </h3>
          
          <p class="text-neutral-600 mb-6 leading-relaxed">
            {service.fields.shortDescription}
          </p>
          
          <!-- Features List -->
          {#if service.fields.features && service.fields.features.length > 0}
            <div class="mb-6">
              <h4 class="text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">
                Key Areas
              </h4>
              <div class="grid grid-cols-1 gap-2">
                {#each service.fields.features.slice(0, 4) as feature}
                  <div class="flex items-center text-sm text-neutral-600">
                    <CheckCircle class="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" />
                    {feature}
                  </div>
                {/each}
                {#if service.fields.features.length > 4}
                  <div class="text-sm text-neutral-500 mt-1">
                    +{service.fields.features.length - 4} more areas
                  </div>
                {/if}
              </div>
            </div>
          {/if}
          
          <!-- Pricing and CTA -->
          <div class="flex items-center justify-between pt-6 border-t border-neutral-100">
            <div>
              <div class="text-2xl font-bold text-neutral-900">
                {service.fields.priceRange}
              </div>
              <div class="text-sm text-neutral-500">
                Starting rates
              </div>
            </div>
            
            <Button href="/services/{service.fields.slug}" variant="primary">
              Learn More
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Process Section -->
<section class="section-padding gradient-neutral">
  <div class="container-custom">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
        How I Work
      </h2>
      <p class="text-xl text-neutral-600">
        A proven process for tackling complex technical challenges
      </p>
    </div>
    
    <div class="grid md:grid-cols-4 gap-8">
      <div class="text-center">
        <div class="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
          1
        </div>
        <h3 class="text-lg font-semibold text-neutral-900 mb-2">Assessment</h3>
        <p class="text-neutral-600">Deep dive into your current systems, processes, and challenges</p>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
          2
        </div>
        <h3 class="text-lg font-semibold text-neutral-900 mb-2">Strategy</h3>
        <p class="text-neutral-600">Develop practical roadmap with clear priorities and measurable outcomes</p>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
          3
        </div>
        <h3 class="text-lg font-semibold text-neutral-900 mb-2">Implementation</h3>
        <p class="text-neutral-600">Execute solutions with hands-on guidance and technical leadership</p>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
          4
        </div>
        <h3 class="text-lg font-semibold text-neutral-900 mb-2">Optimization</h3>
        <p class="text-neutral-600">Monitor results, iterate, and ensure sustainable long-term success</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="section-padding bg-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
      Ready to Clean Up Your Digital Mess?
    </h2>
    <p class="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
      Let's discuss your technical challenges and develop a practical plan to move forward.
    </p>
    
    <Button href="https://calendly.com/jason-conversadocs/30min" variant="primary" size="lg">
      Schedule Free Consultation
      <ArrowRight class="ml-2 h-5 w-5" />
    </Button>
  </div>
</section>