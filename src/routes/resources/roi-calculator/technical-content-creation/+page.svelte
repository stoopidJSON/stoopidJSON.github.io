<!-- src/routes/resources/roi-calculator/technical-content/+page.svelte -->
<script lang="ts">
  import { ArrowLeft, PenTool, Download, Calculator, BarChart3, DollarSign, Clock, Target } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import { ROICalculations, STANDARD_SCENARIOS } from '$lib/types/roi-calculator';
  import type { CalculatorFormData, ROIScenario, CalculatorResult } from '$lib/types/roi-calculator';

  // Form inputs specific to technical content creation
  let formData: CalculatorFormData = {
    developerCount: 15,
    averageDeveloperSalary: 95000,
    onboardingTime: 80, // Hours to onboard new developer
    supportTicketsPerMonth: 200,
    supportAgentSalary: 55000,
    documentationGaps: 60, // Percentage - how much documentation is missing/outdated
    timeSearchingAnswers: 4, // Hours per week per developer
    complianceRequirements: 1, // 0=None, 1=Some, 2=Heavy
    contentVolume: 2, // 1=Basic docs, 2=Comprehensive, 3=Full content strategy
    currentQuality: 40, // Current documentation quality percentage
    projectDuration: 3 // Months for content creation
  };

  let selectedScenario: ROIScenario = STANDARD_SCENARIOS[1]; // Realistic
  let showResults = false;
  
  // Technical content specific calculation function
  function calculateContentROI(data: CalculatorFormData, scenario: ROIScenario): CalculatorResult[] {
    const scenarioMultiplier = scenario.multiplier;
    
    // Base calculations
    const devHourlyRate = (data.averageDeveloperSalary * 1.4) / 2000;
    const supportHourlyRate = (data.averageDeveloperSalary * 1.4) / 2000;
    
    // Current inefficiencies and costs
    const timeWastedSearching = data.developerCount * data.timeSearchingAnswers * 52 * devHourlyRate; // Annual
    const onboardingCost = (data.onboardingTime * devHourlyRate) * (data.developerCount * 0.2); // 20% turnover assumption
    const supportTicketCost = data.supportTicketsPerMonth * 12 * 0.5 * supportHourlyRate; // 30 min avg per ticket
    const knowledgeGapCost = (data.documentationGaps / 100) * data.developerCount * data.averageDeveloperSalary * 0.1; // 10% productivity loss
    
    // Compliance and risk costs
    const complianceMultipliers = { 0: 0, 1: 25000, 2: 100000 }; // Annual compliance risk
    const complianceCost = complianceMultipliers[data.complianceRequirements as keyof typeof complianceMultipliers] || 0;
    
    // Content creation investment
    const contentComplexityMultipliers = { 1: 1.0, 2: 1.5, 3: 2.5 };
    const complexityMultiplier = contentComplexityMultipliers[data.contentVolume as keyof typeof contentComplexityMultipliers] || 1.0;
    const baseContentCost = data.projectDuration * 20000; // ~$150/hr * 33 hrs/month for technical writing
    const totalInvestment = baseContentCost * complexityMultiplier;
    
    // Benefits from better documentation
    const searchTimeReduction = timeWastedSearching * 0.7 * scenarioMultiplier; // 70% reduction
    const onboardingImprovement = onboardingCost * 0.5 * scenarioMultiplier; // 50% faster onboarding
    const supportTicketReduction = supportTicketCost * 0.4 * scenarioMultiplier; // 40% fewer tickets
    const productivityImprovement = knowledgeGapCost * 0.8 * scenarioMultiplier; // 80% of gap filled
    const complianceRiskReduction = complianceCost * 0.6 * scenarioMultiplier; // 60% risk reduction
    
    // SEO and marketing benefits (for external content)
    const seoValue = data.contentVolume >= 2 ? 50000 * scenarioMultiplier : 0; // Lead generation value
    const thoughtLeadershipValue = data.contentVolume >= 3 ? 30000 * scenarioMultiplier : 0; // Brand value
    
    // Quality improvement multiplier
    const qualityGapFactor = (100 - data.currentQuality) / 100;
    const qualityMultiplier = 1 + (qualityGapFactor * 0.5); // Up to 50% more value for very poor current docs
    
    // Total annual benefits
    const totalAnnualBenefits = (searchTimeReduction + onboardingImprovement + supportTicketReduction + 
                               productivityImprovement + complianceRiskReduction + seoValue + 
                               thoughtLeadershipValue) * qualityMultiplier;
    
    // ROI calculations
    const roi = ROICalculations.calculateROI(totalAnnualBenefits, totalInvestment);
    const paybackPeriod = ROICalculations.calculatePaybackPeriod(totalInvestment, totalAnnualBenefits / 12);
    const threeYearValue = totalAnnualBenefits * 3; // Content has long-term value
    
    return [
      {
        label: 'Total Investment',
        value: totalInvestment,
        type: 'currency',
        description: 'Professional technical content creation cost',
        isHighlight: false
      },
      {
        label: 'Annual Benefits',
        value: totalAnnualBenefits,
        type: 'currency',
        description: 'Combined productivity and efficiency gains',
        isHighlight: true
      },
      {
        label: 'First Year ROI',
        value: roi,
        type: 'percentage',
        description: 'Return on investment in year one',
        isHighlight: true
      },
      {
        label: 'Payback Period',
        value: paybackPeriod,
        type: 'number',
        description: 'Months to recover initial investment',
        isHighlight: false
      },
      {
        label: '3-Year Value',
        value: threeYearValue,
        type: 'currency',
        description: 'Total value over 3 years (content lasts)',
        isHighlight: false
      },
      {
        label: 'Developer Time Savings',
        value: searchTimeReduction,
        type: 'currency',
        description: 'Annual savings from faster problem resolution',
        isHighlight: false
      },
      {
        label: 'Onboarding Efficiency',
        value: onboardingImprovement,
        type: 'currency',
        description: 'Savings from faster new hire productivity',
        isHighlight: false
      },
      {
        label: 'Support Reduction',
        value: supportTicketReduction,
        type: 'currency',
        description: 'Reduced support costs from better documentation',
        isHighlight: false
      }
    ];
  }

  $: results = showResults ? calculateContentROI(formData, selectedScenario) : [];

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
    alert('Technical content ROI report generation coming soon!');
  }
</script>

<svelte:head>
  <title>Technical Content Creation ROI Calculator | The Digital Janitor</title>
  <meta name="description" content="Calculate ROI for professional technical documentation and content creation. Measure productivity gains and cost savings from quality technical writing." />
  <meta name="keywords" content="technical writing ROI, documentation ROI, technical content calculator" />
</svelte:head>

<!-- Breadcrumb -->
<section class="bg-neutral-50 py-4">
  <div class="container-custom">
    <nav class="flex items-center space-x-2 text-sm text-neutral-600">
      <a href="/" class="hover:text-primary-600">Home</a>
      <span>/</span>
      <a href="/resources/roi-calculator" class="hover:text-primary-600">ROI Calculator</a>
      <span>/</span>
      <span class="text-neutral-900">Technical Content</span>
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
        <div class="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <PenTool class="w-10 h-10 text-green-600" />
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          Technical Content Creation ROI Calculator
        </h1>
        
        <p class="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto mb-8">
          Calculate the return on investment for professional technical documentation and content creation. Measure the impact of clear, engaging technical content that actually gets read.
        </p>
        
        <!-- Quick Stats -->
        <div class="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">300-600%</div>
            <div class="text-sm text-neutral-600">Typical ROI</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">3-6 mo</div>
            <div class="text-sm text-neutral-600">Payback Period</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">70%</div>
            <div class="text-sm text-neutral-600">Time Savings</div>
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
          <Calculator class="w-6 h-6 text-green-600 mr-3" />
          Current Documentation Situation
        </h2>
        
        <div class="space-y-6">
          <!-- Developer Count -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Number of Developers/Technical Staff
            </label>
            <input
              type="range"
              min="3"
              max="100"
              step="1"
              bind:value={formData.developerCount}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>3</span>
              <span class="font-medium text-green-600">{formData.developerCount}</span>
              <span>100</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Team members who would benefit from improved documentation</p>
          </div>

          <!-- Average Developer Salary -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Average Developer Salary
            </label>
            <input
              type="range"
              min="60000"
              max="180000"
              step="5000"
              bind:value={formData.averageDeveloperSalary}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>$60K</span>
              <span class="font-medium text-green-600">{ROICalculations.formatCurrency(formData.averageDeveloperSalary)}</span>
              <span>$180K</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Used to calculate time value and productivity impact</p>
          </div>

          <!-- Time Searching for Answers -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Hours Per Week Searching for Answers
            </label>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              bind:value={formData.timeSearchingAnswers}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>1 hr</span>
              <span class="font-medium text-green-600">{formData.timeSearchingAnswers} hours</span>
              <span>15 hrs</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Time spent per developer searching for information not documented</p>
          </div>

          <!-- Onboarding Time -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              New Hire Onboarding Time (Hours)
            </label>
            <input
              type="range"
              min="20"
              max="200"
              step="10"
              bind:value={formData.onboardingTime}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>20 hrs</span>
              <span class="font-medium text-green-600">{formData.onboardingTime} hours</span>
              <span>200 hrs</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Time to get new developers productive with current documentation</p>
          </div>

          <!-- Support Tickets -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Monthly Support Tickets
            </label>
            <input
              type="range"
              min="20"
              max="1000"
              step="20"
              bind:value={formData.supportTicketsPerMonth}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>20</span>
              <span class="font-medium text-green-600">{formData.supportTicketsPerMonth}</span>
              <span>1,000</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Questions that could be answered by better documentation</p>
          </div>

          <!-- Documentation Quality -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Current Documentation Quality (%)
            </label>
            <input
              type="range"
              min="10"
              max="80"
              step="5"
              bind:value={formData.currentQuality}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>10%</span>
              <span class="font-medium text-green-600">{formData.currentQuality}%</span>
              <span>80%</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">How comprehensive and useful your current documentation is</p>
          </div>

          <!-- Documentation Gaps -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Documentation Coverage Gaps (%)
            </label>
            <input
              type="range"
              min="20"
              max="90"
              step="5"
              bind:value={formData.documentationGaps}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>20%</span>
              <span class="font-medium text-green-600">{formData.documentationGaps}%</span>
              <span>90%</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Percentage of processes/systems lacking proper documentation</p>
          </div>

          <!-- Compliance Requirements -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Compliance Requirements
            </label>
            <div class="grid grid-cols-3 gap-3 mt-2">
              <button
                on:click={() => formData.complianceRequirements = 0}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.complianceRequirements === 0 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">None</div>
                <div class="text-xs text-neutral-500 mt-1">No regulatory needs</div>
              </button>
              <button
                on:click={() => formData.complianceRequirements = 1}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.complianceRequirements === 1 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Some</div>
                <div class="text-xs text-neutral-500 mt-1">Basic compliance</div>
              </button>
              <button
                on:click={() => formData.complianceRequirements = 2}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.complianceRequirements === 2 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Heavy</div>
                <div class="text-xs text-neutral-500 mt-1">SOX, HIPAA, etc.</div>
              </button>
            </div>
            <p class="text-xs text-neutral-500 mt-2">Regulatory documentation requirements</p>
          </div>

          <!-- Content Scope -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Content Scope
            </label>
            <div class="grid grid-cols-3 gap-3 mt-2">
              <button
                on:click={() => formData.contentVolume = 1}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.contentVolume === 1 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Basic</div>
                <div class="text-xs text-neutral-500 mt-1">Core documentation</div>
              </button>
              <button
                on:click={() => formData.contentVolume = 2}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.contentVolume === 2 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Comprehensive</div>
                <div class="text-xs text-neutral-500 mt-1">Full documentation</div>
              </button>
              <button
                on:click={() => formData.contentVolume = 3}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.contentVolume === 3 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Strategic</div>
                <div class="text-xs text-neutral-500 mt-1">Content + marketing</div>
              </button>
            </div>
            <p class="text-xs text-neutral-500 mt-2">Scope of content creation project</p>
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
                    ? 'border-green-500 bg-green-50 text-green-700' 
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
            Calculate Content ROI
            <BarChart3 class="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <!-- Results -->
      <div class="card p-8" id="results">
        <h2 class="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
          <Target class="w-6 h-6 text-green-600 mr-3" />
          Technical Content ROI Analysis
        </h2>

        {#if showResults && results.length > 0}
          <!-- Key Metrics -->
          <div class="grid grid-cols-2 gap-4 mb-8">
            {#each results.filter(r => r.isHighlight) as result}
              <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                <div class="text-2xl font-bold text-green-600">
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
              Download Content Strategy Report
            </Button>
            
            <Button href="https://calendly.com/jason-conversadocs/30min" variant="primary" class="w-full">
              Discuss Content Project
            </Button>
          </div>

        {:else}
          <div class="text-center py-12">
            <PenTool class="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-neutral-600 mb-2">Ready to Calculate Content ROI</h3>
            <p class="text-neutral-500">
              Enter your current documentation situation to see the potential ROI of professional technical content creation.
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="section-padding bg-gradient-to-r from-green-600 to-green-800 text-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      Ready to Transform Your Technical Documentation?
    </h2>
    <p class="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
      Get clear, engaging technical content that actually gets read. From API docs to white papers, make complex technology accessible to your audience.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button href="https://calendly.com/jason-conversadocs/30min" variant="secondary" size="lg">
        Discuss Content Project
      </Button>
      
      <Button href="/services/technical-content-creation" variant="outline" size="lg">
        View Content Services
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
    background: #16a34a;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #16a34a;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>