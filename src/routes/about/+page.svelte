<script lang="ts">
  import { ArrowRight, Award, Code, Globe, Users, Lightbulb, TrendingUp, Building } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
  <title>About Jason Anton | The Digital Janitor</title>
  <meta name="description" content="From high school dropout to pioneering AI systems at CMS. Meet Jason Anton - The Digital Janitor who cleans up digital messes and builds solutions that work." />
  <meta name="keywords" content="Jason Anton, Digital Janitor, technical consultant, CMS modernization, AI implementation, software developer" />
</svelte:head>

<!-- Hero Section -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto text-center">
      <div class="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
        <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 6.343a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464a1 1 0 10-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z"/>
        </svg>
      </div>
      
      <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
        Hi, I'm Jason Anton
      </h1>
      
      <p class="text-xl md:text-2xl text-neutral-600 mb-8">
        Most consultants specialize. I clean up digital messes.
      </p>
      
      <p class="text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed">
        For 15+ years, I've been the person organizations call when their technology isn't working, their systems are failing, or they need someone who can build what others say is impossible. They call me "The Digital Janitor" because I'll fix, clean, or build whatever needs doing.
      </p>
    </div>
  </div>
</section>

<!-- Origin Story -->
<section class="section-padding gradient-neutral">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 text-center">
        An Unlikely Beginning
      </h2>
      
      <div class="prose prose-lg max-w-none text-neutral-700">
        <p class="text-xl leading-relaxed mb-6">
          I'm not your typical consultant. I dropped out of high school to chase dreams of being a rock star, got close enough to open for an <em>MTV Music Video Award</em> winning artist, then an unfortunate incident outside of my control ended that chapter of my life.
        </p>
        
        <p class="leading-relaxed mb-6">
          By 2007, I was waiting tables at Carrabas, homeless with a newborn daughter, spending my last dollars on a plane ticket to a tech job fair in DC. I had taught myself to code as a hobby in high school, and I knew technology was my way forward. That desperation became determination.
        </p>
        
        <p class="leading-relaxed mb-6">
          What followed was a career that took me from database programming intern to pioneering AI systems at CMS, from building solutions for Fortune 500 companies to negotiating cybersecurity agreements with foreign government officials. Along the way, I learned something crucial: most problems aren't technical problems—they're pattern recognition problems.
        </p>
        
        <p class="leading-relaxed">
          Today, my first-born is a D1 lacrosse player at Wofford College studying to become a neurosurgeon. That journey from homelessness to helping her achieve her dreams taught me that impossible is just a starting point...my youngest wants to be an astronaut, pit-fighter, or tattoo artist ¯\_(ツ)_/¯
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Philosophy & Approach -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
          How I Solve Problems Others Can't
        </h2>
        <p class="text-xl text-neutral-600 max-w-3xl mx-auto">
          Most consultants bring predetermined solutions. I bring pattern recognition, technical breadth, and a willingness to build whatever actually works.
        </p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
            <TrendingUp class="w-8 h-8 text-primary-600" />
          </div>
          <h3 class="text-xl font-semibold text-neutral-900 mb-4">Pattern Recognition</h3>
          <p class="text-neutral-600">
            Most SAAS products solve 90% of what you need. That last 10% will take longer to configure than building from scratch. I see these patterns immediately.
          </p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Code class="w-8 h-8 text-primary-600" />
          </div>
          <h3 class="text-xl font-semibold text-neutral-900 mb-4">Full-Stack Approach</h3>
          <p class="text-neutral-600">
            Front-end, back-end, DevOps, security—I handle it all. Like a janitor, I don't care what needs fixing. I just fix it.
          </p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Lightbulb class="w-8 h-8 text-primary-600" />
          </div>
          <h3 class="text-xl font-semibold text-neutral-900 mb-4">Solution-First Thinking</h3>
          <p class="text-neutral-600">
            I don't fall in love with technologies. I fall in love with solving problems. Whatever works, works.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Major Achievements -->
<section class="section-padding gradient-neutral">
  <div class="container-custom">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
          Milestones That Matter
        </h2>
        <p class="text-xl text-neutral-600">
          Every project taught me something new about solving impossible problems
        </p>
      </div>
      
      <div class="space-y-8">
        <!-- CMS Breakthrough -->
        <div class="card p-8">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <Building class="w-6 h-6" />
            </div>
            <div>
              <h3 class="text-xl font-semibold text-neutral-900 mb-2">
                First CMS System Modernization (2019)
              </h3>
              <p class="text-neutral-600 mb-4">
                Led a successful migration from COBOL to Java at CMS, processing $190B+ in Medicare claims. Previous attempts in the 90s to modernize the same service failed and cost taxpayers millions. Our success spawned an entire division of modernization projects.
              </p>
              <div class="text-sm text-primary-600 font-medium">
                Impact: Modernized systems processing billions in healthcare transactions
              </div>
            </div>
          </div>
        </div>
        
        <!-- Pandemic Response -->
        <div class="card p-8">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <Users class="w-6 h-6" />
            </div>
            <div>
              <h3 class="text-xl font-semibold text-neutral-900 mb-2">
                Baltimore Emergency Response System (2020)
              </h3>
              <p class="text-neutral-600 mb-4">
                Built the system that replaced 500+ daily phone calls with automated communication during the pandemic. Featured in Baltimore Sun and earned recognition as Technical.ly's RealLIST Engineer of 2020.
              </p>
              <div class="text-sm text-green-600 font-medium">
                Impact: Saved hundreds of hours daily, served millions of citizens
              </div>
            </div>
          </div>
        </div>
        
        <!-- Record Speed Development -->
        <div class="card p-8">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-accent-600 text-white rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <TrendingUp class="w-6 h-6" />
            </div>
            <div>
              <h3 class="text-xl font-semibold text-neutral-900 mb-2">
                Securing Electronic Medical Records (2020)
              </h3>
              <p class="text-neutral-600 mb-4">
                When CMS received a mandate to stop accepting faxed medical records by month's end, I built MRDUCS (Medical Record Document Upload and Copy System) and hit the seemingly impossible deadline. Possibly the fastest federal system delivery in CMS history.
              </p>
              <div class="text-sm text-accent-600 font-medium">
                Impact: $5M+ taxpayer savings to date, system still in production
              </div>
            </div>
          </div>
        </div>
        
        <!-- AI Innovation -->
        <div class="card p-8">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <Lightbulb class="w-6 h-6" />
            </div>
            <div>
              <h3 class="text-xl font-semibold text-neutral-900 mb-2">
                CMS AI Platform Leadership (2024)
              </h3>
              <p class="text-neutral-600 mb-4">
                Guided implementation of CMS's first AI platform for data scientists on the $24M SEAS-IT contract, while simultaneously building my own AI startup <em>ConversaDocs</em>.
              </p>
              <div class="text-sm text-purple-600 font-medium">
                Impact: Pioneered enterprise AI adoption at federal scale
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Current Focus -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
        What I'm Building Now
      </h2>
      
      <p class="text-xl text-neutral-600 mb-8 leading-relaxed">
        I'm currently building <a href="https://conversadocs.ai" style="color: #13B2CE;">ConversaDocs</a>, an AI platform that goes far beyond typical chatbots. Using semantic pairing and probabilistic function execution—an evolution of my "anything-to-anything" approach from the McAfee days—our system can understand context, execute complex workflows, and deliver intelligent responses while simultaneously planning and executing background tasks.
      </p>
      
      <div class="bg-primary-50 rounded-2xl p-8 mb-8">
        <h3 class="text-xl font-semibold text-neutral-900 mb-4">
          Why This Combination Works
        </h3>
        <p class="text-neutral-700 leading-relaxed">
          Building an AI startup while consulting isn't just manageable—it's synergistic. My hands-on AI development keeps me at the absolute cutting edge of what's possible, while my consulting work ensures I understand real-world business challenges. You get someone who isn't just talking about AI—I'm building it.
        </p>
      </div>
      
      <div class="text-lg text-neutral-600 mb-8">
        <strong>The result?</strong> Clients get access to someone who's solving tomorrow's problems today, while staying grounded in practical solutions that actually work.
      </div>
    </div>
  </div>
</section>

<!-- Recognition -->
<section class="section-padding gradient-neutral">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-neutral-900 mb-12">
        Recognition & Impact
      </h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center">
          <Award class="w-12 h-12 text-accent-500 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-neutral-900 mb-2">
            RealLIST Engineer 2020
          </h3>
          <p class="text-neutral-600 text-sm">
            Technical.ly Magazine recognition alongside Johns Hopkins doctors
          </p>
        </div>
        
        <div class="text-center">
          <Globe class="w-12 h-12 text-primary-500 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-neutral-900 mb-2">
            International Experience
          </h3>
          <p class="text-neutral-600 text-sm">
            Negotiated cybersecurity solutions with Malian government officials
          </p>
        </div>
        
        <div class="text-center">
          <TrendingUp class="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-neutral-900 mb-2">
            Measurable Impact
          </h3>
          <p class="text-neutral-600 text-sm">
            $5M+ taxpayer savings, systems serving millions of Americans
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="section-padding gradient-primary text-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      Ready to Clean Up Your Digital Mess?
    </h2>
    <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
      Whether you need someone to modernize legacy systems, implement AI solutions, or just figure out why nothing seems to work the way it should—let's talk.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button href="https://calendly.com/jason-conversadocs/30min" variant="accent" size="lg">
        Schedule Free Consultation
        <ArrowRight class="ml-2 h-5 w-5" />
      </Button>
      
      <Button href="/case-studies" variant="secondary" size="lg">
        See My Work
      </Button>
    </div>
  </div>
</section>