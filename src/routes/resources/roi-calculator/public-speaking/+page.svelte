<!-- src/routes/resources/roi-calculator/public-speaking/+page.svelte -->
<script lang="ts">
  import { ArrowLeft, Mic, Download, Calculator, BarChart3, DollarSign, Clock, Target } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import { ROICalculations, STANDARD_SCENARIOS } from '$lib/types/roi-calculator';
  import type { CalculatorFormData, ROIScenario, CalculatorResult } from '$lib/types/roi-calculator';

  // Form inputs specific to public speaking engagements
  let formData: CalculatorFormData = {
    employeeCount: 100,
    averageSalary: 75000,
    eventDuration: 4, // Hours including Q&A and networking
    travelTime: 0, // Hours if virtual, more if in-person
    currentEngagement: 60, // Percentage - current team engagement level
    knowledgeRetention: 40, // Percentage - typical retention from training
    implementationRate: 25, // Percentage - how much gets implemented
    speakerFee: 15000, // Total cost including travel
    teamProductivity: 85, // Current productivity percentage
    turnoverRate: 15, // Annual employee turnover percentage
    eventType: 1 // 1=Keynote, 2=Workshop, 3=Team building
  };

  let selectedScenario: ROIScenario = STANDARD_SCENARIOS[1]; // Realistic
  let showResults = false;
  
  // Public speaking specific calculation function
  function calculateSpeakingROI(data: CalculatorFormData, scenario: ROIScenario): CalculatorResult[] {
    const scenarioMultiplier = scenario.multiplier;
    
    // Base calculations
    const burdendedHourlyRate = (data.averageSalary * 1.4) / 2000;
    const totalEventTime = data.eventDuration + data.travelTime;
    const eventCost = data.employeeCount * totalEventTime * burdendedHourlyRate;
    const totalInvestment = data.speakerFee + eventCost;
    
    // Benefits based on event type and current engagement
    const engagementGapFactor = (100 - data.currentEngagement) / 100;
    const retentionGapFactor = (100 - data.knowledgeRetention) / 100;
    const implementationGapFactor = (100 - data.implementationRate) / 100;
    
    // Engagement and motivation improvements
    const engagementBoost = 0.15 * engagementGapFactor * scenarioMultiplier; // Up to 15% improvement
    const productivityGain = engagementBoost * data.employeeCount * data.averageSalary;
    
    // Knowledge transfer value
    const knowledgeValue = data.employeeCount * 2000 * scenarioMultiplier; // $2K value per person in applicable insights
    const implementationValue = knowledgeValue * (data.implementationRate / 100) * 2; // 2x multiplier for implemented knowledge
    
    // Team cohesion and retention benefits
    const retentionImprovement = (data.turnoverRate / 100) * 0.3 * scenarioMultiplier; // 30% reduction in turnover
    const retentionSavings = retentionImprovement * data.employeeCount * (data.averageSalary * 0.5); // 50% of salary = replacement cost
    
    // Leadership inspiration and direction setting
    const leadershipValue = data.employeeCount * 1000 * scenarioMultiplier; // $1K per person in clearer direction
    
    // Event type multipliers
    const eventTypeMultipliers = { 1: 1.0, 2: 1.3, 3: 1.1 }; // Workshops have higher implementation
    const eventMultiplier = eventTypeMultipliers[data.eventType as keyof typeof eventTypeMultipliers] || 1.0;
    
    // Total annual benefits
    const totalAnnualBenefits = (productivityGain + implementationValue + retentionSavings + leadershipValue) * eventMultiplier;
    
    // ROI calculations
    const roi = ROICalculations.calculateROI(totalAnnualBenefits, totalInvestment);
    const paybackPeriod = ROICalculations.calculatePaybackPeriod(totalInvestment, totalAnnualBenefits / 12);
    
    // Time to value is immediate for speaking engagements
    const immediateValue = (knowledgeValue + leadershipValue) * eventMultiplier;
    
    return [
      {
        label: 'Total Investment',
        value: totalInvestment,
        type: 'currency',
        description: 'Speaker fee plus employee time cost',
        isHighlight: false
      },
      {
        label: 'Annual Benefits',
        value: totalAnnualBenefits,
        type: 'currency',
        description: 'Productivity, retention, and knowledge gains',
        isHighlight: true
      },
      {
        label: 'ROI',
        value: roi,
        type: 'percentage',
        description: 'Return on investment within first year',
        isHighlight: true
      },
      {
        label: 'Payback Period',
        value: paybackPeriod,
        type: 'number',
        description: 'Months to recover investment',
        isHighlight: false
      },
      {
        label: 'Immediate Value',
        value: immediateValue,
        type: 'currency',
        description: 'Knowledge and inspiration value delivered on event day',
        isHighlight: false
      },
      {
        label: 'Productivity Improvement',
        value: productivityGain,
        type: 'currency',
        description: 'Annual value from increased team engagement',
        isHighlight: false
      },
      {
        label: 'Retention Savings',
        value: retentionSavings,
        type: 'currency',
        description: 'Annual savings from reduced employee turnover',
        isHighlight: false
      },
      {
        label: 'Knowledge Implementation Value',
        value: implementationValue,
        type: 'currency',
        description: 'Value from actionable insights put into practice',
        isHighlight: false
      }
    ];
  }

  $: results = showResults ? calculateSpeakingROI(formData, selectedScenario) : [];

  function formatResult(result: CalculatorResult): string {
    switch (result.type) {
      case 'currency':
        return ROICalculations.formatCurrency(result.value);
      case 'percentage':
        return ROICalculations.formatPercentage(result.value);
      case 'number':
        return ROICalculations.formatNumber(result.value);
      default:
        return result.value.toString();
    }
  }

  function handleCalculate() {
    showResults = true;
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  function generateReport() {
    alert('Speaking engagement ROI report generation coming soon!');
  }
</script>

<svelte:head>
  <title>Public Speaking & Keynotes ROI Calculator | The Digital Janitor</title>
  <meta name="description" content="Calculate ROI for keynote speaking and team motivation. Measure the impact of expert presentations on productivity and engagement." />
  <meta name="keywords" content="keynote speaker ROI, speaking engagement calculator, team motivation ROI" />
</svelte:head>

<!-- Breadcrumb -->
<section class="bg-neutral-50 py-4">
  <div class="container-custom">
    <nav class="flex items-center space-x-2 text-sm text-neutral-600">
      <a href="/" class="hover:text-primary-600">Home</a>
      <span>/</span>
      <a href="/resources/roi-calculator" class="hover:text-primary-600">ROI Calculator</a>
      <span>/</span>
      <span class="text-neutral-900">Public Speaking</span>
    </nav>
  </div>
</section>

<!-- Hero Section -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto">
      <!-- Back Button -->
      <div class="mb-8">
        <Button href="/resources/roi-calculator" variant="ghost" size="sm">
          <ArrowLeft class="mr-2 h-4 w-4" />
          Back to ROI Calculators
        </Button>
      </div>
      
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="w-20 h-20 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Mic class="w-10 h-10 text-accent-600" />
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          Public Speaking & Keynotes ROI Calculator
        </h1>
        
        <p class="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto mb-8">
          Calculate the return on investment for expert keynote speaking and team motivation. Measure the impact of real stories and practical insights on your organization.
        </p>
        
        <!-- Quick Stats -->
        <div class="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div class="text-center">
            <div class="text-2xl font-bold text-accent-600">200-400%</div>
            <div class="text-sm text-neutral-600">Typical ROI</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-accent-600">Immediate</div>
            <div class="text-sm text-neutral-600">Value Delivery</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-accent-600">15%</div>
            <div class="text-sm text-neutral-600">Engagement Boost</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Calculator Section -->
<section class="section-padding gradient-neutral">
  <div class="container-custom">
    <div class="grid lg:grid-cols-2 gap-12">
      <!-- Input Form -->
      <div class="card p-8">
        <h2 class="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
          <Calculator class="w-6 h-6 text-accent-600 mr-3" />
          Event & Team Details
        </h2>
        
        <div class="space-y-6">
          <!-- Team Size -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Number of Attendees
            </label>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              bind:value={formData.employeeCount}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>10</span>
              <span class="font-medium text-accent-600">{formData.employeeCount}</span>
              <span>1,000</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Team members attending the keynote or presentation</p>
          </div>

          <!-- Average Salary -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Average Attendee Salary
            </label>
            <input
              type="range"
              min="40000"
              max="150000"
              step="5000"
              bind:value={formData.averageSalary}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>$40K</span>
              <span class="font-medium text-accent-600">{ROICalculations.formatCurrency(formData.averageSalary)}</span>
              <span>$150K</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Used to calculate time investment and productivity impact</p>
          </div>

          <!-- Event Duration -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Total Event Duration (Hours)
            </label>
            <input
              type="range"
              min="1"
              max="8"
              step="0.5"
              bind:value={formData.eventDuration}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>1 hr</span>
              <span class="font-medium text-accent-600">{formData.eventDuration} hours</span>
              <span>8 hrs</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Including presentation, Q&A, and networking time</p>
          </div>

          <!-- Speaker Fee -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Total Speaker Investment
            </label>
            <input
              type="range"
              min="5000"
              max="50000"
              step="2500"
              bind:value={formData.speakerFee}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>$5K</span>
              <span class="font-medium text-accent-600">{ROICalculations.formatCurrency(formData.speakerFee)}</span>
              <span>$50K</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Speaker fee plus travel and accommodation costs</p>
          </div>

          <!-- Current Engagement Level -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Current Team Engagement Level (%)
            </label>
            <input
              type="range"
              min="30"
              max="90"
              step="5"
              bind:value={formData.currentEngagement}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>30%</span>
              <span class="font-medium text-accent-600">{formData.currentEngagement}%</span>
              <span>90%</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Current level of team motivation and engagement</p>
          </div>

          <!-- Implementation Rate -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Expected Implementation Rate (%)
            </label>
            <input
              type="range"
              min="10"
              max="80"
              step="5"
              bind:value={formData.implementationRate}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>10%</span>
              <span class="font-medium text-accent-600">{formData.implementationRate}%</span>
              <span>80%</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Percentage of insights likely to be implemented</p>
          </div>

          <!-- Annual Turnover Rate -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Annual Employee Turnover (%)
            </label>
            <input
              type="range"
              min="5"
              max="40"
              step="2"
              bind:value={formData.turnoverRate}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>5%</span>
              <span class="font-medium text-accent-600">{formData.turnoverRate}%</span>
              <span>40%</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Current annual employee turnover rate</p>
          </div>

          <!-- Event Type -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Event Type
            </label>
            <div class="grid grid-cols-3 gap-3 mt-2">
              <button
                on:click={() => formData.eventType = 1}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.eventType === 1 
                    ? 'border-accent-500 bg-accent-50 text-accent-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Keynote</div>
                <div class="text-xs text-neutral-500 mt-1">Inspiration focus</div>
              </button>
              <button
                on:click={() => formData.eventType = 2}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.eventType === 2 
                    ? 'border-accent-500 bg-accent-50 text-accent-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Workshop</div>
                <div class="text-xs text-neutral-500 mt-1">Hands-on learning</div>
              </button>
              <button
                on:click={() => formData.eventType = 3}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.eventType === 3 
                    ? 'border-accent-500 bg-accent-50 text-accent-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Team Event</div>
                <div class="text-xs text-neutral-500 mt-1">Team building</div>
              </button>
            </div>
            <p class="text-xs text-neutral-500 mt-2">Event format affects implementation potential</p>
          </div>
        </div>

        <!-- Scenario Selection -->
        <div class="mt-8 pt-6 border-t border-neutral-200">
          <h3 class="text-lg font-semibold text-neutral-900 mb-4">Impact Scenario</h3>
          <div class="grid grid-cols-3 gap-3">
            {#each STANDARD_SCENARIOS as scenario}
              <button
                on:click={() => selectedScenario = scenario}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  selectedScenario === scenario 
                    ? 'border-accent-500 bg-accent-50 text-accent-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">{scenario.name}</div>
                <div class="text-xs text-neutral-500 mt-1">{scenario.description}</div>
              </button>
            {/each}
          </div>
        </div>

        <!-- Calculate Button -->
        <div class="mt-8">
          <Button on:click={handleCalculate} variant="primary" size="lg" class="w-full">
            Calculate Speaking ROI
            <BarChart3 class="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <!-- Results -->
      <div class="card p-8" id="results">
        <h2 class="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
          <Target class="w-6 h-6 text-accent-600 mr-3" />
          Speaking Engagement ROI
        </h2>

        {#if showResults && results.length > 0}
          <!-- Key Metrics -->
          <div class="grid grid-cols-2 gap-4 mb-8">
            {#each results.filter(r => r.isHighlight) as result}
              <div class="bg-gradient-to-r from-accent-50 to-accent-100 rounded-lg p-4">
                <div class="text-2xl font-bold text-accent-600">
                  {formatResult(result)}
                </div>
                <div class="text-sm font-medium text-neutral-700">{result.label}</div>
                <div class="text-xs text-neutral-500 mt-1">{result.description}</div>
              </div>
            {/each}
          </div>

          <!-- Detailed Breakdown -->
          <div class="space-y-4 mb-8">
            <h3 class="text-lg font-semibold text-neutral-900">Value Breakdown</h3>
            {#each results.filter(r => !r.isHighlight) as result}
              <div class="flex justify-between items-center py-3 border-b border-neutral-100">
                <div>
                  <div class="font-medium text-neutral-900">{result.label}</div>
                  <div class="text-sm text-neutral-500">{result.description}</div>
                </div>
                <div class="text-lg font-semibold text-neutral-900">
                  {formatResult(result)}
                </div>
              </div>
            {/each}
          </div>

          <!-- Actions -->
          <div class="space-y-3">
            <Button on:click={generateReport} variant="secondary" class="w-full">
              <Download class="mr-2 h-4 w-4" />
              Download Speaking Engagement ROI Report
            </Button>
            
            <Button href="https://calendly.com/jason-conversadocs/30min" variant="primary" class="w-full">
              Discuss Speaking Opportunity
            </Button>
          </div>

        {:else}
          <div class="text-center py-12">
            <Mic class="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-neutral-600 mb-2">Ready to Calculate Impact</h3>
            <p class="text-neutral-500">
              Enter your event details and team information to see the potential ROI of a speaking engagement.
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="section-padding bg-gradient-to-r from-accent-600 to-accent-800 text-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      Ready to Inspire Your Team?
    </h2>
    <p class="text-xl text-accent-100 mb-8 max-w-2xl mx-auto">
      Book a keynote that combines real digital transformation stories with actionable insights your team can implement immediately.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button href="https://calendly.com/jason-conversadocs/30min" variant="secondary" size="lg">
        Discuss Speaking Opportunity
      </Button>
      
      <Button href="/services/public-speaking" variant="outline" size="lg">
        View Speaking Topics
      </Button>
    </div>
  </div>
</section>

<style>
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #ea580c;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #ea580c;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>