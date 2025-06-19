<!-- src/routes/resources/roi-calculator/fractional-cto/+page.svelte -->
<script lang="ts">
  import { ArrowLeft, Users, Download, Calculator, BarChart3, DollarSign, Clock, Target, TrendingUp } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import { ROICalculations, STANDARD_SCENARIOS } from '$lib/types/roi-calculator';
  import type { CalculatorFormData, ROIScenario, CalculatorResult } from '$lib/types/roi-calculator';

  // Form inputs specific to fractional CTO services
  let formData: CalculatorFormData = {
    companySize: 25, // Number of employees
    techTeamSize: 8, // Number of developers/tech staff
    averageDeveloperSalary: 95000,
    currentTechLeadership: 0, // 0=None, 1=Senior Dev, 2=Director level
    projectsStalled: 2, // Number of tech projects currently stalled
    techDebtLevel: 60, // Percentage - current technical debt level
    securityIncidents: 1, // Annual security incidents due to lack of oversight
    vendorContracts: 5, // Number of tech vendor relationships to manage
    complianceRequirements: 1, // 0=None, 1=Some, 2=Heavy (SOX, HIPAA, etc.)
    fundraisingStage: 0, // 0=Not fundraising, 1=Preparing, 2=Active fundraising
    fractionalHoursPerMonth: 40, // Hours per month of fractional CTO time
    monthlyRetainer: 15000 // Monthly fractional CTO cost
  };

  let selectedScenario: ROIScenario = STANDARD_SCENARIOS[1]; // Realistic
  let showResults = false;
  
  // Fractional CTO specific calculation function
  function calculateFractionalCTOROI(data: CalculatorFormData, scenario: ROIScenario): CalculatorResult[] {
    const scenarioMultiplier = scenario.multiplier;
    
    // Full-time CTO cost calculation
    const ftCTOSalary = 200000 + (data.companySize * 2000); // Base + scaling by company size
    const ftCTOBenefits = ftCTOSalary * 0.4; // 40% benefits
    const ftCTOEquity = ftCTOSalary * 0.3; // Equity value (rough estimate)
    const recruitingCosts = 50000; // Cost to find and hire full-time CTO
    const totalFTCTOCost = ftCTOSalary + ftCTOBenefits + ftCTOEquity + (recruitingCosts / 3); // Amortize recruiting
    
    // Fractional CTO annual cost
    const fractionalAnnualCost = data.monthlyRetainer * 12;
    
    // Current costs of not having technical leadership
    const developerHourlyRate = (data.averageDeveloperSalary * 1.4) / 2000;
    
    // Stalled projects cost (lost productivity and opportunity)
    const stalledProjectCost = data.projectsStalled * 100000 * scenarioMultiplier; // $100K per stalled project annually
    
    // Technical debt costs (maintenance, slower development, bugs)
    const techDebtCost = (data.techDebtLevel / 100) * data.techTeamSize * data.averageDeveloperSalary * 0.25 * scenarioMultiplier;
    
    // Security incident costs
    const securityIncidentCost = data.securityIncidents * 150000 * scenarioMultiplier; // $150K avg per incident
    
    // Inefficient vendor management
    const vendorMismanagementCost = data.vendorContracts * 25000 * scenarioMultiplier; // $25K per vendor annually
    
    // Compliance risk costs
    const complianceMultipliers = { 0: 0, 1: 75000, 2: 300000 }; // Annual compliance risk
    const complianceRiskCost = complianceMultipliers[data.complianceRequirements as keyof typeof complianceMultipliers] * scenarioMultiplier;
    
    // Team productivity loss without leadership
    const leadershipGapCost = data.techTeamSize * data.averageDeveloperSalary * 0.15 * scenarioMultiplier; // 15% productivity loss
    
    // Fundraising impact (if applicable)
    const fundraisingMultipliers = { 0: 0, 1: 500000, 2: 1000000 }; // Value of CTO for fundraising
    const fundraisingValue = fundraisingMultipliers[data.fundraisingStage as keyof typeof fundraisingMultipliers] * scenarioMultiplier;
    
    // Benefits of fractional CTO
    const projectAcceleration = stalledProjectCost * 0.8; // 80% of stalled projects get moving
    const techDebtReduction = techDebtCost * 0.6; // 60% reduction in tech debt impact
    const securityImprovement = securityIncidentCost * 0.7; // 70% reduction in security incidents
    const vendorOptimization = vendorMismanagementCost * 0.8; // 80% improvement in vendor management
    const complianceAssurance = complianceRiskCost * 0.8; // 80% reduction in compliance risk
    const teamProductivityGain = leadershipGapCost * 0.7; // 70% of productivity gap filled
    
    // Strategic value adds
    const strategicPlanningValue = 150000 * scenarioMultiplier; // Annual value of strategic tech planning
    const architectureGuidanceValue = data.techTeamSize * 20000 * scenarioMultiplier; // $20K per developer annually
    
    // Total annual benefits
    const totalAnnualBenefits = projectAcceleration + techDebtReduction + securityImprovement + 
                               vendorOptimization + complianceAssurance + teamProductivityGain + 
                               strategicPlanningValue + architectureGuidanceValue + fundraisingValue;
    
    // Cost savings vs full-time CTO
    const costSavingsVsFT = totalFTCTOCost - fractionalAnnualCost;
    
    // Total value (benefits + cost savings)
    const totalValue = totalAnnualBenefits + costSavingsVsFT;
    
    // ROI calculations
    const roi = ROICalculations.calculateROI(totalValue, fractionalAnnualCost);
    const paybackPeriod = ROICalculations.calculatePaybackPeriod(fractionalAnnualCost, totalValue / 12);
    const breakEvenHours = fractionalAnnualCost / (developerHourlyRate * 2); // When fractional pays for itself in dev time saved
    
    return [
      {
        label: 'Fractional CTO Investment',
        value: fractionalAnnualCost,
        type: 'currency',
        description: 'Annual cost of fractional CTO services',
        isHighlight: false
      },
      {
        label: 'Total Annual Value',
        value: totalValue,
        type: 'currency',
        description: 'Benefits plus cost savings vs full-time CTO',
        isHighlight: true
      },
      {
        label: 'ROI',
        value: roi,
        type: 'percentage',
        description: 'Return on fractional CTO investment',
        isHighlight: true
      },
      {
        label: 'Cost Savings vs Full-Time',
        value: costSavingsVsFT,
        type: 'currency',
        description: 'Annual savings compared to hiring full-time CTO',
        isHighlight: false
      },
      {
        label: 'Payback Period',
        value: paybackPeriod,
        type: 'number',
        description: 'Months to recover investment through value creation',
        isHighlight: false
      },
      {
        label: 'Project Acceleration Value',
        value: projectAcceleration,
        type: 'currency',
        description: 'Value from getting stalled projects moving',
        isHighlight: false
      },
      {
        label: 'Team Productivity Gain',
        value: teamProductivityGain,
        type: 'currency',
        description: 'Annual productivity improvement with technical leadership',
        isHighlight: false
      },
      {
        label: 'Risk Mitigation Value',
        value: securityImprovement + complianceAssurance,
        type: 'currency',
        description: 'Annual value from reduced security and compliance risks',
        isHighlight: false
      },
      {
        label: 'Strategic Planning Value',
        value: strategicPlanningValue + architectureGuidanceValue,
        type: 'currency',
        description: 'Value from strategic technology roadmap and architecture',
        isHighlight: false
      }
    ];
  }

  $: results = showResults ? calculateFractionalCTOROI(formData, selectedScenario) : [];

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
    alert('Fractional CTO ROI report generation coming soon!');
  }
</script>

<svelte:head>
  <title>Fractional CTO ROI Calculator | The Digital Janitor</title>
  <meta name="description" content="Calculate ROI for fractional CTO services vs full-time hire. Compare costs and measure strategic technology leadership value." />
  <meta name="keywords" content="fractional CTO ROI, part-time CTO calculator, technology leadership ROI" />
</svelte:head>

<!-- Breadcrumb -->
<section class="bg-neutral-50 py-4">
  <div class="container-custom">
    <nav class="flex items-center space-x-2 text-sm text-neutral-600">
      <a href="/" class="hover:text-primary-600">Home</a>
      <span>/</span>
      <a href="/resources/roi-calculator" class="hover:text-primary-600">ROI Calculator</a>
      <span>/</span>
      <span class="text-neutral-900">Fractional CTO</span>
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
        <div class="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Users class="w-10 h-10 text-blue-600" />
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          Fractional CTO ROI Calculator
        </h1>
        
        <p class="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto mb-8">
          Calculate the return on investment for fractional CTO services versus hiring a full-time CTO. Compare costs and measure the value of strategic technology leadership.
        </p>
        
        <!-- Quick Stats -->
        <div class="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">200-400%</div>
            <div class="text-sm text-neutral-600">Typical ROI</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">50-70%</div>
            <div class="text-sm text-neutral-600">Cost Savings</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">3-6 mo</div>
            <div class="text-sm text-neutral-600">Payback Period</div>
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
          <Calculator class="w-6 h-6 text-blue-600 mr-3" />
          Company & Technology Situation
        </h2>
        
        <div class="space-y-6">
          <!-- Company Size -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Total Company Size (Employees)
            </label>
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              bind:value={formData.companySize}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>10</span>
              <span class="font-medium text-blue-600">{formData.companySize}</span>
              <span>200</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Total employees (affects full-time CTO salary expectations)</p>
          </div>

          <!-- Tech Team Size -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Technology Team Size
            </label>
            <input
              type="range"
              min="2"
              max="50"
              step="1"
              bind:value={formData.techTeamSize}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>2</span>
              <span class="font-medium text-blue-600">{formData.techTeamSize}</span>
              <span>50</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Developers, DevOps, and technical staff needing leadership</p>
          </div>

          <!-- Average Developer Salary -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Average Developer Salary
            </label>
            <input
              type="range"
              min="70000"
              max="180000"
              step="5000"
              bind:value={formData.averageDeveloperSalary}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>$70K</span>
              <span class="font-medium text-blue-600">{ROICalculations.formatCurrency(formData.averageDeveloperSalary)}</span>
              <span>$180K</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Used to calculate productivity impact and time value</p>
          </div>

          <!-- Current Technical Leadership -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Current Technical Leadership Level
            </label>
            <div class="grid grid-cols-3 gap-3 mt-2">
              <button
                on:click={() => formData.currentTechLeadership = 0}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.currentTechLeadership === 0 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">None</div>
                <div class="text-xs text-neutral-500 mt-1">No tech leadership</div>
              </button>
              <button
                on:click={() => formData.currentTechLeadership = 1}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.currentTechLeadership === 1 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Senior Dev</div>
                <div class="text-xs text-neutral-500 mt-1">Tech lead role</div>
              </button>
              <button
                on:click={() => formData.currentTechLeadership = 2}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.currentTechLeadership === 2 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Director</div>
                <div class="text-xs text-neutral-500 mt-1">Director level</div>
              </button>
            </div>
            <p class="text-xs text-neutral-500 mt-2">Current level of strategic technology leadership</p>
          </div>

          <!-- Stalled Projects -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Stalled Technology Projects
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              bind:value={formData.projectsStalled}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>0</span>
              <span class="font-medium text-blue-600">{formData.projectsStalled}</span>
              <span>10</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Projects delayed due to lack of technical leadership</p>
          </div>

          <!-- Technical Debt Level -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Technical Debt Level (%)
            </label>
            <input
              type="range"
              min="20"
              max="90"
              step="5"
              bind:value={formData.techDebtLevel}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>20%</span>
              <span class="font-medium text-blue-600">{formData.techDebtLevel}%</span>
              <span>90%</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Current technical debt impacting development velocity</p>
          </div>

          <!-- Security Incidents -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Annual Security Incidents
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              bind:value={formData.securityIncidents}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>0</span>
              <span class="font-medium text-blue-600">{formData.securityIncidents}</span>
              <span>10</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Security issues that could be prevented with proper oversight</p>
          </div>

          <!-- Vendor Contracts -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Technology Vendor Contracts
            </label>
            <input
              type="range"
              min="2"
              max="25"
              step="1"
              bind:value={formData.vendorContracts}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>2</span>
              <span class="font-medium text-blue-600">{formData.vendorContracts}</span>
              <span>25</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">SaaS, cloud providers, and technology vendors to manage</p>
          </div>

          <!-- Fundraising Stage -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Fundraising Stage
            </label>
            <div class="grid grid-cols-3 gap-3 mt-2">
              <button
                on:click={() => formData.fundraisingStage = 0}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.fundraisingStage === 0 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Not Active</div>
                <div class="text-xs text-neutral-500 mt-1">No fundraising</div>
              </button>
              <button
                on:click={() => formData.fundraisingStage = 1}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.fundraisingStage === 1 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Preparing</div>
                <div class="text-xs text-neutral-500 mt-1">Getting ready</div>
              </button>
              <button
                on:click={() => formData.fundraisingStage = 2}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.fundraisingStage === 2 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Active</div>
                <div class="text-xs text-neutral-500 mt-1">Currently raising</div>
              </button>
            </div>
            <p class="text-xs text-neutral-500 mt-2">CTO presence significantly impacts fundraising success</p>
          </div>

          <!-- Monthly Retainer -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Monthly Fractional CTO Investment
            </label>
            <input
              type="range"
              min="8000"
              max="40000"
              step="2000"
              bind:value={formData.monthlyRetainer}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>$8K</span>
              <span class="font-medium text-blue-600">{ROICalculations.formatCurrency(formData.monthlyRetainer)}</span>
              <span>$40K</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Monthly retainer for fractional CTO services</p>
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
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
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
            Calculate Fractional CTO ROI
            <BarChart3 class="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <!-- Results -->
      <div class="card p-8" id="results">
        <h2 class="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
          <Target class="w-6 h-6 text-blue-600 mr-3" />
          Fractional CTO ROI Analysis
        </h2>

        {#if showResults && results.length > 0}
          <!-- Key Metrics -->
          <div class="grid grid-cols-2 gap-4 mb-8">
            {#each results.filter(r => r.isHighlight) as result}
              <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                <div class="text-2xl font-bold text-blue-600">
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
              Download Fractional CTO Analysis
            </Button>
            
            <Button href="https://calendly.com/stoopidjson/technical-assessment" variant="primary" class="w-full">
              Discuss Fractional CTO Services
            </Button>
          </div>

        {:else}
          <div class="text-center py-12">
            <Users class="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-neutral-600 mb-2">Ready to Calculate Leadership ROI</h3>
            <p class="text-neutral-500">
              Enter your company details to see the potential ROI of fractional CTO services versus hiring full-time.
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="section-padding bg-gradient-to-r from-blue-600 to-blue-800 text-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      Ready for Strategic Technology Leadership?
    </h2>
    <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
      Get executive-level technology guidance without the full-time cost. Strategic planning, team leadership, and crisis management when you need it.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button href="https://calendly.com/stoopidjson/technical-assessment" variant="secondary" size="lg">
        Discuss Your Needs
      </Button>
      
      <Button href="/services/fractional-cto" variant="outline" size="lg">
        View CTO Services
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
    background: #2563eb;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #2563eb;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>