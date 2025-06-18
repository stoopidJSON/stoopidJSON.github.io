<script lang="ts">
  import { ArrowRight, CheckCircle, Star, Users, TrendingUp } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  // Extract data from the load function
  $: ({ homepage, services, caseStudies, seo } = data);
  
  // Fallback content if Contentful data isn't available
  const fallbackHero = {
    title: "Purveyor of the Digital Janitorial Arts",
    subtitle: "15+ Years of Cross-Functional Technical Expertise", 
    description: "I help businesses and governments navigate complex technical challenges with end-to-end solutions. From AI implementation to fractional CTO services, get the strategic guidance that bridges business goals with technical excellence.",
    ctaText: "Get Your Free Technical Assessment",
    ctaLink: "https://calendly.com/jason-conversadocs/30min"
  };
  
  // Use Contentful data or fallback
  $: heroContent = homepage?.fields || fallbackHero;
  
  // Sample metrics for the stats section
  const metrics = [
    { value: '15+', label: 'Years Experience' },
    { value: '$5mil+', label: 'Taxpayer Dollars Saved' },
    { value: '2+', label: 'AI Platforms Built' },
    { value: '100%', label: 'Cloud Migration Success' }
  ];
  
  // Sample featured capabilities
  const capabilities = [
    {
      icon: TrendingUp,
      title: 'Digital Transformation Strategy',
      description: 'End-to-end digital transformation consulting that aligns technology with business objectives.',
      price: '$250-350/hour'
    },
    {
      icon: Users,
      title: 'AI/ML Implementation',
      description: 'Strategic AI and machine learning implementation with focus on ROI and practical applications.',
      price: '$250-1000/hour'
    },
    {
      icon: CheckCircle,
      title: 'Fractional CTO Services',
      description: 'Part-time executive technology leadership for startups and growing companies.',
      price: '$10K-50K/month'
    }
  ];
  

  // Real recognition and impact instead of fake testimonials
  const recognition = [
    {
      title: "RealLIST Engineer 2020",
      publication: "Technical.ly Magazine",
      description: "Recognized as one of the RealLIST Engineers for developing critical civic tech solutions during the pandemic.",
      quote: "Primary developer on Code for Baltimore's application that allowed the Baltimore City Health Department to contact '500-plus facilities in an instant' to assess needs during the pandemic, saving hundreds of hours of work.",
      link: "https://technical.ly/software-development/reallist-engineers-20200-influential-technologists/"
    },
    {
      title: "SEAS-IT AI Leader", 
      publication: "Aquia",
      description: "Guided implementation of CMS's first AI platform for data scientists.",
      quote: "The CMS SEAS IT AI contract is more than just a technological upgrade; it is a forward-thinking blueprint for the future of government healthcare systems.",
      link: "https://www.aquia.us/blog/seas-it-post"
    },
    {
      title: "Case Study: Code for Baltimore",
      publication: "Postman",
      description: "Technical implementation showcased as best practice for API-driven civic technology solutions.",
      quote: "Demonstrated how modern API architecture can solve complex municipal communication challenges at scale.",
      link: "https://www.postman.com/case-studies/code-for-baltimore/"
    }
  ];
</script>

<svelte:head>
  <title>{seo.title}</title>
  <meta name="description" content={seo.description} />
  <meta name="keywords" content={seo.keywords.join(', ')} />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden hero-gradient">
  <!-- Animated Code Background -->
  <div class="absolute inset-0 opacity-20">
    <div class="code-rain">
      <!-- More code lines with different commands -->
      <div class="code-line" style="left: 5%; animation-delay: 0s;">
        <span class="command">$ sudo clean-digital-mess</span>
      </div>
      <div class="code-line" style="left: 15%; animation-delay: 3s;">
        <span class="comment"># Modernizing legacy systems...</span>
      </div>
      <div class="code-line" style="left: 25%; animation-delay: 1s;">
        <span class="function">function transformLegacy() {'{ }'}</span>
      </div>
      <div class="code-line" style="left: 35%; animation-delay: 5s;">
        <span class="command">$ docker run --rm legacy-cleaner</span>
      </div>
      <div class="code-line" style="left: 45%; animation-delay: 2s;">
        <span class="variable">const solution = optimize(chaos);</span>
      </div>
      <div class="code-line" style="left: 55%; animation-delay: 7s;">
        <span class="success">✓ Migration completed successfully</span>
      </div>
      <div class="code-line" style="left: 65%; animation-delay: 4s;">
        <span class="comment"># TODO: Fix technical debt</span>
      </div>
      <div class="code-line" style="left: 75%; animation-delay: 6s;">
        <span class="function">deploy({'{ status: \'clean\' }'});</span>
      </div>
      <div class="code-line" style="left: 85%; animation-delay: 8s;">
        <span class="command">$ systemctl restart innovation</span>
      </div>
      <div class="code-line" style="left: 95%; animation-delay: 1.5s;">
        <span class="success">Process optimization: 100% complete</span>
      </div>
      
      <!-- Second row with different timing -->
      <div class="code-line" style="left: 8%; animation-delay: 10s;">
        <span class="variable">modernize().then(success);</span>
      </div>
      <div class="code-line" style="left: 18%; animation-delay: 12s;">
        <span class="command">$ git commit -m "cleaned digital mess"</span>
      </div>
      <div class="code-line" style="left: 28%; animation-delay: 14s;">
        <span class="error">ERROR: Legacy system detected</span>
      </div>
      <div class="code-line" style="left: 38%; animation-delay: 11s;">
        <span class="success">FIXED: System now optimized</span>
      </div>
      <div class="code-line" style="left: 48%; animation-delay: 13s;">
        <span class="function">if (digitalMess) {'{ clean(); }'}</span>
      </div>
      <div class="code-line" style="left: 58%; animation-delay: 15s;">
        <span class="command">$ npm run build:production</span>
      </div>
      <div class="code-line" style="left: 68%; animation-delay: 9s;">
        <span class="comment"># Implementing best practices...</span>
      </div>
      <div class="code-line" style="left: 78%; animation-delay: 16s;">
        <span class="variable">const janitor = new DigitalJanitor();</span>
      </div>
      <div class="code-line" style="left: 88%; animation-delay: 17s;">
        <span class="success">✓ All systems operational</span>
      </div>
    </div>
    
    <!-- Circuit Pattern Overlay -->
    <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M10 10h80v20h-20v20h-20v20h-20v20h-20" stroke="currentColor" stroke-width="1" fill="none" opacity="0.1"/>
          <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.2"/>
          <circle cx="70" cy="50" r="2" fill="currentColor" opacity="0.2"/>
          <circle cx="50" cy="80" r="2" fill="currentColor" opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" class="text-white"/>
    </svg>
  </div>
  
  <div class="absolute inset-0 bg-black/10"></div>
  
  <div class="relative container-custom section-padding">
    <div class="max-w-4xl mx-auto text-center text-white">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
        {heroContent.title}
      </h1>
      
      <p class="text-xl md:text-2xl mb-6 text-primary-100 animate-slide-up animation-delay-200">
        {heroContent.subtitle}
      </p>
      
      <p class="text-lg mb-8 text-primary-50 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-400">
        {heroContent.description}
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-600">
        <Button href={heroContent.ctaLink} variant="accent" size="lg">
          {heroContent.ctaText}
          <ArrowRight class="ml-2 h-5 w-5" />
        </Button>
        
        <Button href="/case-studies" variant="secondary" size="lg">
          View Case Studies
        </Button>
      </div>
    </div>
  </div>
  
  <!-- Background decoration -->
  <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
</section>

<!-- Stats Section -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      {#each metrics as metric}
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
            {metric.value}
          </div>
          <div class="text-neutral-600 font-medium">
            {metric.label}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Services Preview -->
<section class="section-padding gradient-neutral">
  <div class="container-custom">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
        Strategic Technology Services
      </h2>
      <p class="text-xl text-neutral-600 max-w-3xl mx-auto">
        Comprehensive solutions that bridge the gap between business strategy and technical execution
      </p>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8">
      {#each capabilities as capability}
        <div class="card p-8 text-center hover:shadow-xl transition-all duration-300">
          <div class="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
            <svelte:component this={capability.icon} class="w-8 h-8 text-primary-600" />
          </div>
          
          <h3 class="text-xl font-semibold text-neutral-900 mb-4">
            {capability.title}
          </h3>
          
          <p class="text-neutral-600 mb-6">
            {capability.description}
          </p>
          
          <div class="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full inline-block">
            {capability.price}
          </div>
        </div>
      {/each}
    </div>
    
    <div class="text-center mt-12">
      <Button href="/services" variant="primary" size="lg">
        View All Services
        <ArrowRight class="ml-2 h-5 w-5" />
      </Button>
    </div>
  </div>
</section>

<!-- Recognition & Impact Section -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
        Recognition & Real-World Impact
      </h2>
      <p class="text-xl text-neutral-600">
        Proven track record of delivering solutions that make headlines and save lives
      </p>
    </div>
    
    <div class="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {#each recognition as item}
        <div class="card p-8 hover:shadow-xl transition-all duration-300">
          <div class="mb-4">
            <div class="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full inline-block mb-2">
              {item.publication}
            </div>
            <h3 class="text-xl font-semibold text-neutral-900">
              {item.title}
            </h3>
          </div>
          
          <p class="text-neutral-600 mb-4">
            {item.description}
          </p>
          
          <blockquote class="text-sm text-neutral-700 italic border-l-4 border-primary-200 pl-4 mb-4">
            "{item.quote}"
          </blockquote>
          
          {#if item.link !== '#'}
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center"
            >
              Read Full Article
              <ArrowRight class="ml-1 h-4 w-4" />
            </a>
          {/if}
        </div>
      {/each}
    </div>
    
    <!-- Impact Metrics -->
    <div class="mt-16 bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8">
      <div class="text-center mb-8">
        <h3 class="text-2xl font-bold text-neutral-900 mb-2">
          Quantified Impact from Featured Project
        </h3>
        <p class="text-neutral-600">
          Baltimore City Health Department Emergency Response System
        </p>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-primary-600 mb-1">500+</div>
          <div class="text-sm text-neutral-600">Senior Facilities Connected</div>
        </div>
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-primary-600 mb-1">8 hrs</div>
          <div class="text-sm text-neutral-600">Daily Time Saved</div>
        </div>
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-primary-600 mb-1">24/7</div>
          <div class="text-sm text-neutral-600">Emergency Response</div>
        </div>
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-primary-600 mb-1">$0</div>
          <div class="text-sm text-neutral-600">Cost to City (Pro Bono)</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="section-padding gradient-primary text-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      Ready to Transform Your Technology Strategy?
    </h2>
    
    <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
      Get a free technical assessment and discover how strategic technology decisions can drive your business forward.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button href="https://calendly.com/jason-conversadocs/30min" variant="accent" size="lg">
        Schedule Free Consultation
        <ArrowRight class="ml-2 h-5 w-5" />
      </Button>
    </div>
  </div>
</section>

<style>
  /* Hero gradient animation */
  .hero-gradient {
    background: linear-gradient(45deg, 
      #1e40af, 
      #1d4ed8, 
      #2563eb, 
      #3b82f6,
      #1e40af,
      #1d4ed8
    );
    background-size: 300% 300%;
    animation: gradientShift 20s ease infinite;
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Custom animations for the hero section */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes codeRain {
    0% { 
      transform: translateY(-100vh) rotate(0deg);
      opacity: 0;
    }
    5% {
      opacity: 1;
    }
    95% {
      opacity: 1;
    }
    100% { 
      transform: translateY(100vh) rotate(2deg);
      opacity: 0;
    }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.6s ease-out;
  }
  
  .animate-slide-up {
    animation: slideUp 0.6s ease-out;
  }
  
  .code-rain {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  
  .code-line {
    position: absolute;
    top: -10%;
    white-space: nowrap;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
    font-size: 13px;
    animation: codeRain 25s linear infinite;
    transform-origin: center;
  }
  
  /* Terminal-like color classes */
  .code-line .command {
    color: #50FA7B; /* Bright green for commands */
    text-shadow: 0 0 5px rgba(80, 250, 123, 0.3);
  }
  
  .code-line .comment {
    color: #6272A4; /* Muted blue-gray for comments */
    font-style: italic;
  }
  
  .code-line .function {
    color: #8BE9FD; /* Cyan for functions */
    text-shadow: 0 0 5px rgba(139, 233, 253, 0.2);
  }
  
  .code-line .variable {
    color: #F8F8F2; /* White for variables */
  }
  
  .code-line .success {
    color: #50FA7B; /* Green for success messages */
    text-shadow: 0 0 8px rgba(80, 250, 123, 0.4);
  }
  
  .code-line .error {
    color: #FF5555; /* Red for errors */
    text-shadow: 0 0 8px rgba(255, 85, 85, 0.4);
  }
  
  .code-line span {
    background: rgba(40, 42, 54, 0.7); /* Dark terminal background */
    padding: 3px 8px;
    border-radius: 3px;
    border-left: 2px solid rgba(80, 250, 123, 0.6);
    backdrop-filter: blur(1px);
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .code-line {
      font-size: 12px;
    }
  }
</style>