<!-- src/routes/resources/roi-calculator/+page.svelte -->
<script lang="ts">
  import { Calculator, TrendingUp, Brain, Users, Search, Mic, PenTool, ArrowRight } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';

  const services = [
    {
      title: 'Digital Transformation',
      slug: 'digital-transformation',
      icon: TrendingUp,
      description: 'Calculate ROI for end-to-end digital transformation initiatives',
      typicalROI: '300-500%',
      paybackPeriod: '12-18 months',
      keyBenefits: ['Reduced operational costs', 'Increased productivity', 'Better scalability'],
      averageSavings: '$250K-$2M annually'
    },
    {
      title: 'AI/ML Implementation',
      slug: 'ai-ml-implementation', 
      icon: Brain,
      description: 'Measure returns from AI and machine learning projects',
      typicalROI: '400-800%',
      paybackPeriod: '6-12 months',
      keyBenefits: ['Process automation', '24/7 operations', 'Data-driven decisions'],
      averageSavings: '$500K-$5M annually'
    },
    {
      title: 'Fractional CTO Services',
      slug: 'fractional-cto',
      icon: Users,
      description: 'Compare fractional vs full-time CTO investment',
      typicalROI: '200-400%',
      paybackPeriod: '3-6 months',
      keyBenefits: ['Strategic leadership', 'Cost efficiency', 'Immediate expertise'],
      averageSavings: '$100K-$300K annually'
    },
    {
      title: 'Technical Due Diligence',
      slug: 'technical-due-diligence',
      icon: Search,
      description: 'Quantify value of thorough technical assessment',
      typicalROI: '500-2000%',
      paybackPeriod: 'Immediate',
      keyBenefits: ['Risk mitigation', 'Deal leverage', 'Informed decisions'],
      averageSavings: '$500K-$10M per deal'
    },
    {
      title: 'Public Speaking & Keynotes',
      slug: 'public-speaking',
      icon: Mic,
      description: 'Calculate ROI of expert keynotes and team motivation',
      typicalROI: '200-400%',
      paybackPeriod: 'Immediate',
      keyBenefits: ['Team motivation', 'Knowledge transfer', 'Leadership inspiration'],
      averageSavings: '$25K-$200K in productivity'
    },
    {
      title: 'Technical Content Creation',
      slug: 'technical-content-creation',
      icon: PenTool,
      description: 'Measure value of professional technical documentation',
      typicalROI: '300-600%',
      paybackPeriod: '3-6 months',
      keyBenefits: ['Faster onboarding', 'Reduced support tickets', 'Better compliance'],
      averageSavings: '$50K-$500K annually'
    }
  ];
</script>

<svelte:head>
  <title>ROI Calculator | Measure Your Technology Investment Returns</title>
  <meta name="description" content="Calculate the return on investment for technology consulting services. Interactive ROI calculators for digital transformation, AI implementation, and more." />
  <meta name="keywords" content="ROI calculator, technology consulting ROI, digital transformation ROI, AI implementation ROI" />
</svelte:head>

<!-- Hero Section -->
<section class="section-padding gradient-primary text-white">
  <div class="container-custom text-center">
    <div class="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
      <Calculator class="w-10 h-10 text-white" />
    </div>
    
    <h1 class="text-4xl md:text-5xl font-bold mb-6">
      ROI Calculator
    </h1>
    <p class="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
      Quantify the return on investment for your technology initiatives. Interactive calculators based on real project data and proven methodologies.
    </p>
    <div class="text-lg text-primary-50">
      <strong>Data-driven decisions start here</strong> — Calculate potential returns before you invest.
    </div>
  </div>
</section>

<!-- Calculator Grid -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
        Choose Your Investment Scenario
      </h2>
      <p class="text-xl text-neutral-600 max-w-3xl mx-auto">
        Each calculator is tailored to specific technology investments, using industry benchmarks and real project outcomes.
      </p>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each services as service}
        <div class="card hover:shadow-xl transition-all duration-300 group">
          <div class="p-8">
            <!-- Service Header -->
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors">
                <svelte:component this={service.icon} class="w-6 h-6 text-primary-600" />
              </div>
              <h3 class="text-xl font-bold text-neutral-900">
                {service.title}
              </h3>
            </div>
            
            <!-- Description -->
            <p class="text-neutral-600 mb-6">
              {service.description}
            </p>
            
            <!-- Key Metrics -->
            <div class="space-y-4 mb-6">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-neutral-700">Typical ROI</span>
                <span class="text-sm font-bold text-primary-600">{service.typicalROI}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-neutral-700">Payback Period</span>
                <span class="text-sm font-bold text-neutral-900">{service.paybackPeriod}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-neutral-700">Average Savings</span>
                <span class="text-sm font-bold text-accent-600">{service.averageSavings}</span>
              </div>
            </div>
            
            <!-- Key Benefits -->
            <div class="mb-6">
              <h4 class="text-sm font-semibold text-neutral-700 mb-3">Key Benefits</h4>
              <ul class="space-y-1">
                {#each service.keyBenefits as benefit}
                  <li class="text-sm text-neutral-600 flex items-center">
                    <div class="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                    {benefit}
                  </li>
                {/each}
              </ul>
            </div>
            
            <!-- CTA -->
            <Button href="/resources/roi-calculator/{service.slug}" variant="primary" class="w-full">
              Calculate ROI
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- How It Works -->
<section class="section-padding gradient-neutral">
  <div class="container-custom">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
        How Our ROI Calculators Work
      </h2>
      <p class="text-xl text-neutral-600">
        Transparent, data-driven calculations based on real project outcomes
      </p>
    </div>
    
    <div class="grid md:grid-cols-4 gap-8">
      <div class="text-center">
        <div class="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
          1
        </div>
        <h3 class="text-lg font-semibold text-neutral-900 mb-2">Input Your Data</h3>
        <p class="text-neutral-600">Enter your current costs, processes, and business metrics</p>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
          2
        </div>
        <h3 class="text-lg font-semibold text-neutral-900 mb-2">Choose Scenario</h3>
        <p class="text-neutral-600">Select conservative, realistic, or optimistic projections</p>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
          3
        </div>
        <h3 class="text-lg font-semibold text-neutral-900 mb-2">View Results</h3>
        <p class="text-neutral-600">See detailed ROI breakdown with visual charts and metrics</p>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
          4
        </div>
        <h3 class="text-lg font-semibold text-neutral-900 mb-2">Get Report</h3>
        <p class="text-neutral-600">Download detailed report to share with stakeholders</p>
      </div>
    </div>
  </div>
</section>

<!-- Trust Indicators -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-neutral-900 mb-4">
        Built from 15+ Years of Technical Experience
      </h2>
      <p class="text-xl text-neutral-600">
        Our calculations reflect real-world experience across enterprise systems, federal projects, and technology leadership roles
      </p>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      <div class="text-center">
        <div class="text-3xl font-bold text-primary-600 mb-2">$190B+</div>
        <div class="text-neutral-600">In transaction systems built</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-primary-600 mb-2">15+</div>
        <div class="text-neutral-600">Years in technology</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-primary-600 mb-2">$5M+</div>
        <div class="text-neutral-600">Taxpayer dollars saved</div>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="section-padding gradient-primary text-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      Ready to Calculate Your ROI?
    </h2>
    <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
      Start with any calculator above, or schedule a consultation to discuss your specific needs.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      
      <Button href="https://calendly.com/jason-conversadocs/30min" variant="secondary" size="lg">
        Schedule Consultation
      </Button>
    </div>
  </div>
</section>