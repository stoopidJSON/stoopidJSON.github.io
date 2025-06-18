<!-- src/routes/resources/roi-calculator/ai-ml-implementation/+page.svelte -->
<script lang="ts">
  import { ArrowLeft, Brain, Download, Calculator, BarChart3, DollarSign, Clock, Target } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import { ROICalculations, STANDARD_SCENARIOS } from '$lib/types/roi-calculator';
  import type { CalculatorFormData, ROIScenario, CalculatorResult } from '$lib/types/roi-calculator';

  // Form inputs specific to AI/ML projects
  let formData: CalculatorFormData = {
    dataProcessingHours: 1000, // Monthly hours spent on manual data processing
    decisionMakingDelay: 72, // Hours to make data-driven decisions
    dataAnalysts: 5, // Number of data analysts
    analystSalary: 85000, // Average data analyst salary
    dataQualityErrors: 15, // Percentage of decisions based on poor data
    customerServiceAgents: 20, // Number of customer service agents
    agentSalary: 45000, // Average agent salary
    manualReportingHours: 200, // Monthly hours creating reports
    projectComplexity: 2, // 1=Simple, 2=Moderate, 3=Complex
    projectDuration: 8 // Months for implementation
  };

  let selectedScenario: ROIScenario = STANDARD_SCENARIOS[1]; // Realistic
  let showResults = false;
  
  // AI/ML specific calculation function
  function calculateAIMLROI(data: CalculatorFormData, scenario: ROIScenario): CalculatorResult[] {
    const scenarioMultiplier = scenario.multiplier;
    
    // Burdened labor costs
    const analystHourlyRate = (data.analystSalary * 1.4) / 2000;
    const agentHourlyRate = (data.agentSalary * 1.4) / 2000;
    
    // Current inefficiencies and costs
    const manualDataProcessingCost = data.dataProcessingHours * analystHourlyRate * 12; // Annual
    const decisionDelayCost = (data.decisionMakingDelay / 24) * data.dataAnalysts * analystHourlyRate * 250; // Work days per year
    const dataQualityErrorCost = (data.dataQualityErrors / 100) * data.dataAnalysts * data.analystSalary * 0.2; // 20% productivity loss
    const manualReportingCost = data.manualReportingHours * analystHourlyRate * 12;
    const customerServiceCost = data.customerServiceAgents * data.agentSalary; // Annual baseline
    
    // AI/ML benefits (aggressive but realistic for good implementations)
    const dataProcessingAutomation = manualDataProcessingCost * 0.85 * scenarioMultiplier; // 85% automation
    const fasterDecisionMaking = decisionDelayCost * 0.9 * scenarioMultiplier; // 90% faster decisions
    const improvedDataQuality = dataQualityErrorCost * 0.8 * scenarioMultiplier; // 80% error reduction
    const automatedReporting = manualReportingCost * 0.95 * scenarioMultiplier; // 95% automated
    const customerServiceEfficiency = customerServiceCost * 0.3 * scenarioMultiplier; // 30% efficiency gain
    
    // New revenue opportunities from AI capabilities
    const newRevenueFromInsights = data.dataAnalysts * 50000 * scenarioMultiplier; // $50K per analyst in new insights
    const customerRetentionValue = data.customerServiceAgents * 25000 * scenarioMultiplier; // Better service = retention
    
    // Investment costs (AI projects typically more expensive initially)
    const complexityMultiplier = data.projectComplexity * 0.5 + 0.5; // 1x to 2x multiplier
    const consultingFees = data.projectDuration * 60000 * complexityMultiplier; // Higher rate for AI expertise
    const aiPlatformCosts = consultingFees * 0.8; // Platform, tools, infrastructure
    const dataPreparationCosts = consultingFees * 0.6; // Data cleaning, preparation
    const trainingCosts = (data.dataAnalysts + data.customerServiceAgents) * 2000; // Training per person
    const totalInvestment = consultingFees + aiPlatformCosts + dataPreparationCosts + trainingCosts;
    
    // Total annual benefits
    const totalAnnualBenefits = dataProcessingAutomation + fasterDecisionMaking + improvedDataQuality + 
                               automatedReporting + customerServiceEfficiency + newRevenueFromInsights + 
                               customerRetentionValue;
    
    // 3-year calculations
    const threeYearBenefits = totalAnnualBenefits * 3;
    const roi = ROICalculations.calculateROI(threeYearBenefits, totalInvestment);
    const paybackPeriod = ROICalculations.calculatePaybackPeriod(totalInvestment, totalAnnualBenefits / 12);
    const npv = ROICalculations.calculateNPV(totalInvestment, totalAnnualBenefits, 3);

    return [
      {
        label: 'Total Investment',
        value: totalInvestment,
        type: 'currency',
        description: 'Consulting, platform, data prep, and training costs',
        isHighlight: false
      },
      {
        label: 'Annual Benefits',
        value: totalAnnualBenefits,
        type: 'currency',
        description: 'Combined savings and new revenue per year',
        isHighlight: true
      },
      {
        label: '3-Year ROI',
        value: roi,
        type: 'percentage',
        description: 'Return on investment over 3 years',
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
        label: 'Net Present Value',
        value: npv,
        type: 'currency',
        description: '3-year NPV at 10% discount rate',
        isHighlight: false
      },
      {
        label: 'Data Processing Savings',
        value: dataProcessingAutomation,
        type: 'currency',
        description: 'Annual savings from automated data processing',
        isHighlight: false
      },
      {
        label: 'Decision Speed Improvement',
        value: fasterDecisionMaking,
        type: 'currency',
        description: 'Value from faster, data-driven decisions',
        isHighlight: false
      },
      {
        label: 'New Revenue Opportunities',
        value: newRevenueFromInsights + customerRetentionValue,
        type: 'currency',
        description: 'Revenue from AI insights and improved service',
        isHighlight: false
      }
    ];
  }

  $: results = showResults ? calculateAIMLROI(formData, selectedScenario) : [];

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
    alert('PDF report generation coming soon!');
  }
</script>

<svelte:head>
  <title>AI/ML Implementation ROI Calculator | The Digital Janitor</title>
  <meta name="description" content="Calculate ROI for AI and machine learning projects. Interactive calculator with real implementation data and transparent methodology." />
  <meta name="keywords" content="AI ROI calculator, machine learning ROI, artificial intelligence investment calculator" />
</svelte:head>

<!-- Breadcrumb -->
<section class="bg-neutral-50 py-4">
  <div class="container-custom">
    <nav class="flex items-center space-x-2 text-sm text-neutral-600">
      <a href="/" class="hover:text-primary-600">Home</a>

      <span>/</span>
      <a href="/resources/roi-calculator" class="hover:text-primary-600">ROI Calculator</a>
      <span>/</span>
      <span class="text-neutral-900">AI/ML Implementation</span>
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
        <div class="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Brain class="w-10 h-10 text-purple-600" />
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          AI/ML Implementation ROI Calculator
        </h1>
        
        <p class="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto mb-8">
          Calculate the potential return on investment for your AI and machine learning initiatives. Based on real enterprise AI implementations and proven methodologies.
        </p>
        
        <!-- Quick Stats -->
        <div class="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600">400-800%</div>
            <div class="text-sm text-neutral-600">Typical ROI</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600">6-12 mo</div>
            <div class="text-sm text-neutral-600">Payback Period</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600">85%</div>
            <div class="text-sm text-neutral-600">Process Automation</div>
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
          <Calculator class="w-6 h-6 text-purple-600 mr-3" />
          Current Data & Analytics Situation
        </h2>
        
        <div class="space-y-6">
          <!-- Data Processing Hours -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Monthly Manual Data Processing Hours
            </label>
            <input
              type="range"
              min="100"
              max="5000"
              step="100"
              bind:value={formData.dataProcessingHours}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>100 hrs</span>
              <span class="font-medium text-purple-600">{formData.dataProcessingHours} hours</span>
              <span>5,000 hrs</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Time spent manually processing, cleaning, and analyzing data</p>
          </div>

          <!-- Decision Making Delay -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Average Decision-Making Delay (Hours)
            </label>
            <input
              type="range"
              min="2"
              max="168"
              step="2"
              bind:value={formData.decisionMakingDelay}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>2 hrs</span>
              <span class="font-medium text-purple-600">{formData.decisionMakingDelay} hours</span>
              <span>168 hrs (1 week)</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Time from data request to actionable insights</p>
          </div>

          <!-- Number of Data Analysts -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Number of Data Analysts
            </label>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              bind:value={formData.dataAnalysts}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>1</span>
              <span class="font-medium text-purple-600">{formData.dataAnalysts}</span>
              <span>50</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Team members involved in data analysis and reporting</p>
          </div>

          <!-- Analyst Average Salary -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Average Data Analyst Salary
            </label>
            <input
              type="range"
              min="50000"
              max="150000"
              step="5000"
              bind:value={formData.analystSalary}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>$50K</span>
              <span class="font-medium text-purple-600">{ROICalculations.formatCurrency(formData.analystSalary)}</span>
              <span>$150K</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Used to calculate productivity and automation savings</p>
          </div>

          <!-- Data Quality Issues -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Data Quality Error Rate (%)
            </label>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              bind:value={formData.dataQualityErrors}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>5%</span>
              <span class="font-medium text-purple-600">{formData.dataQualityErrors}%</span>
              <span>50%</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Percentage of decisions based on incomplete or poor quality data</p>
          </div>

          <!-- Customer Service Team -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Customer Service Agents
            </label>
            <input
              type="range"
              min="5"
              max="200"
              step="5"
              bind:value={formData.customerServiceAgents}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>5</span>
              <span class="font-medium text-purple-600">{formData.customerServiceAgents}</span>
              <span>200</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Team members who could benefit from AI-powered assistance</p>
          </div>

          <!-- Project Complexity -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Project Complexity
            </label>
            <div class="grid grid-cols-3 gap-3 mt-2">
              <button
                on:click={() => formData.projectComplexity = 1}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.projectComplexity === 1 
                    ? 'border-purple-500 bg-purple-50 text-purple-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Simple</div>
                <div class="text-xs text-neutral-500 mt-1">Basic automation</div>
              </button>
              <button
                on:click={() => formData.projectComplexity = 2}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.projectComplexity === 2 
                    ? 'border-purple-500 bg-purple-50 text-purple-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Moderate</div>
                <div class="text-xs text-neutral-500 mt-1">ML insights</div>
              </button>
              <button
                on:click={() => formData.projectComplexity = 3}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.projectComplexity === 3 
                    ? 'border-purple-500 bg-purple-50 text-purple-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Complex</div>
                <div class="text-xs text-neutral-500 mt-1">Advanced AI</div>
              </button>
            </div>
            <p class="text-xs text-neutral-500 mt-2">Affects implementation cost and timeline</p>
          </div>

          <!-- Project Duration -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Implementation Duration (Months)
            </label>
            <input
              type="range"
              min="3"
              max="24"
              step="1"
              bind:value={formData.projectDuration}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>3 mo</span>
              <span class="font-medium text-purple-600">{formData.projectDuration} months</span>
              <span>24 mo</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Expected time for full AI/ML implementation</p>
          </div>
        </div>

        <!-- Scenario Selection -->
        <div class="mt-8 pt-6 border-t border-neutral-200">
          <h3 class="text-lg font-semibold text-neutral-900 mb-4">Projection Scenario</h3>
          <div class="grid grid-cols-3 gap-3">
            {#each STANDARD_SCENARIOS as scenario}
              <button
                on:click={() => selectedScenario = scenario}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  selectedScenario === scenario 
                    ? 'border-purple-500 bg-purple-50 text-purple-700' 
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
            Calculate AI/ML ROI
            <BarChart3 class="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <!-- Results -->
      <div class="card p-8" id="results">
        <h2 class="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
          <Target class="w-6 h-6 text-purple-600 mr-3" />
          AI/ML ROI Analysis
        </h2>

        {#if showResults && results.length > 0}
          <!-- Key Metrics -->
          <div class="grid grid-cols-2 gap-4 mb-8">
            {#each results.filter(r => r.isHighlight) as result}
              <div class="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                <div class="text-2xl font-bold text-purple-600">
                  {formatResult(result)}
                </div>
                <div class="text-sm font-medium text-neutral-700">{result.label}</div>
                <div class="text-xs text-neutral-500 mt-1">{result.description}</div>
              </div>
            {/each}
          </div>

          <!-- Detailed Breakdown -->
          <div class="space-y-4 mb-8">
            <h3 class="text-lg font-semibold text-neutral-900">Detailed Breakdown</h3>
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
              Download AI Implementation Report
            </Button>
            
            <Button href="https://calendly.com/jason-conversadocs/30min" variant="primary" class="w-full">
              Schedule AI Strategy Consultation
            </Button>
          </div>

        {:else}
          <div class="text-center py-12">
            <Brain class="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-neutral-600 mb-2">Ready to Calculate AI ROI</h3>
            <p class="text-neutral-500">
              Input your current data operations and click "Calculate AI/ML ROI" to see potential returns.
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="section-padding bg-gradient-to-r from-purple-600 to-purple-800 text-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      Ready to Implement AI in Your Organization?
    </h2>
    <p class="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
      Get expert guidance on AI strategy, implementation, and ROI optimization from someone who's built enterprise AI platforms.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button href="https://calendly.com/jason-conversadocs/30min" variant="accent" size="lg">
        Schedule AI Strategy Session
      </Button>
      
      <Button href="/case-studies" variant="secondary" size="lg">
        View AI Case Studies
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
    background: #9333ea;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #9333ea;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>