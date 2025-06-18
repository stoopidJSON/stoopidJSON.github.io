<!-- src/routes/resources/roi-calculator/digital-transformation/+page.svelte -->
<script lang="ts">
  import { ArrowLeft, TrendingUp, Download, Calculator, BarChart3, DollarSign, Clock, Target } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import { ROICalculations, STANDARD_SCENARIOS } from '$lib/types/roi-calculator';
  import type { CalculatorFormData, ROIScenario, CalculatorResult } from '$lib/types/roi-calculator';

  // Form inputs
  let formData: CalculatorFormData = {
    currentITBudget: 500000,
    maintenanceCosts: 200000,
    manualProcessHours: 2000,
    systemDowntimeHours: 100,
    securityIncidents: 3,
    employeeCount: 100,
    averageSalary: 75000,
    projectDuration: 12
  };

  let selectedScenario: ROIScenario = STANDARD_SCENARIOS[1]; // Realistic
  let showResults = false;
  
  // Calculation function
  function calculateROI(data: CalculatorFormData, scenario: ROIScenario): CalculatorResult[] {
    const scenarioMultiplier = scenario.multiplier;
    
    // Burdened labor cost (salary + benefits)
    const burdendedHourlyRate = (data.averageSalary * 1.4) / 2000; // 40% benefits, 2000 work hours/year
    
    // Current costs and inefficiencies
    const manualProcessCost = data.manualProcessHours * burdendedHourlyRate * 12; // Annual
    const downtimeCost = data.systemDowntimeHours * data.employeeCount * burdendedHourlyRate;
    const securityIncidentCost = data.securityIncidents * 50000; // Avg $50K per incident
    
    // Digital transformation benefits (conservative estimates)
    const processAutomationSavings = manualProcessCost * 0.6 * scenarioMultiplier; // 60% reduction
    const downtimeReduction = downtimeCost * 0.8 * scenarioMultiplier; // 80% reduction
    const securityImprovement = securityIncidentCost * 0.7 * scenarioMultiplier; // 70% reduction
    const productivityGains = data.employeeCount * data.averageSalary * 0.15 * scenarioMultiplier; // 15% productivity boost
    const maintenanceReduction = data.maintenanceCosts * 0.3 * scenarioMultiplier; // 30% reduction
    
    // Investment costs
    const consultingFees = data.projectDuration * 40000; // ~$300/hr * 33 hrs/month
    const implementationCosts = consultingFees * 2; // Implementation typically 2x consulting
    const totalInvestment = consultingFees + implementationCosts;
    
    // Total annual benefits
    const totalAnnualBenefits = processAutomationSavings + downtimeReduction + securityImprovement + 
                               productivityGains + maintenanceReduction;
    
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
        description: 'Consulting fees and implementation costs',
        isHighlight: false
      },
      {
        label: 'Annual Benefits',
        value: totalAnnualBenefits,
        type: 'currency',
        description: 'Combined savings and productivity gains per year',
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
        label: 'Process Automation Savings',
        value: processAutomationSavings,
        type: 'currency',
        description: 'Annual savings from automated processes',
        isHighlight: false
      },
      {
        label: 'Productivity Gains',
        value: productivityGains,
        type: 'currency',
        description: 'Annual value from improved employee productivity',
        isHighlight: false
      },
      {
        label: 'Maintenance Cost Reduction',
        value: maintenanceReduction,
        type: 'currency',
        description: 'Annual savings from reduced IT maintenance',
        isHighlight: false
      }
    ];
  }

  $: results = showResults ? calculateROI(formData, selectedScenario) : [];

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
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  function generateReport() {
    // TODO: Implement PDF generation
    alert('PDF report generation coming soon!');
  }
</script>

<svelte:head>
  <title>Digital Transformation ROI Calculator | The Digital Janitor</title>
  <meta name="description" content="Calculate the return on investment for your digital transformation project. Interactive calculator with real project data and transparent methodology." />
  <meta name="keywords" content="digital transformation ROI, technology modernization calculator, digital strategy ROI" />
</svelte:head>

<!-- Breadcrumb -->
<section class="bg-neutral-50 py-4">
  <div class="container-custom">
    <nav class="flex items-center space-x-2 text-sm text-neutral-600">
      <a href="/" class="hover:text-primary-600">Home</a>
      <span>/</span>
      <a href="/resources" class="hover:text-primary-600">Resources</a>
      <span>/</span>
      <a href="/resources/roi-calculator" class="hover:text-primary-600">ROI Calculator</a>
      <span>/</span>
      <span class="text-neutral-900">Digital Transformation</span>
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
        <div class="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <TrendingUp class="w-10 h-10 text-primary-600" />
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          Digital Transformation ROI Calculator
        </h1>
        
        <p class="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto mb-8">
          Calculate the potential return on investment for your digital transformation initiative. Based on real project outcomes and industry benchmarks.
        </p>
        
        <!-- Quick Stats -->
        <div class="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div class="text-center">
            <div class="text-2xl font-bold text-primary-600">300-500%</div>
            <div class="text-sm text-neutral-600">Typical ROI</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-primary-600">12-18 mo</div>
            <div class="text-sm text-neutral-600">Payback Period</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-primary-600">$2M+</div>
            <div class="text-sm text-neutral-600">Avg Annual Savings</div>
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
          <Calculator class="w-6 h-6 text-primary-600 mr-3" />
          Your Current Situation
        </h2>
        
        <div class="space-y-6">
          <!-- Annual IT Budget -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Annual IT Budget
            </label>
            <input
              type="range"
              min="100000"
              max="5000000"
              step="50000"
              bind:value={formData.currentITBudget}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>$100K</span>
              <span class="font-medium text-primary-600">{ROICalculations.formatCurrency(formData.currentITBudget)}</span>
              <span>$5M</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Total annual spending on IT operations and maintenance</p>
          </div>

          <!-- Maintenance Costs -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Annual Maintenance Costs
            </label>
            <input
              type="range"
              min="50000"
              max="2000000"
              step="25000"
              bind:value={formData.maintenanceCosts}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>$50K</span>
              <span class="font-medium text-primary-600">{ROICalculations.formatCurrency(formData.maintenanceCosts)}</span>
              <span>$2M</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Cost to maintain legacy systems and infrastructure</p>
          </div>

          <!-- Manual Process Hours -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Monthly Manual Process Hours
            </label>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              bind:value={formData.manualProcessHours}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>100 hrs</span>
              <span class="font-medium text-primary-600">{formData.manualProcessHours} hours</span>
              <span>10,000 hrs</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Time spent on manual processes that could be automated</p>
          </div>

          <!-- System Downtime -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Annual Downtime Hours
            </label>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              bind:value={formData.systemDowntimeHours}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>10 hrs</span>
              <span class="font-medium text-primary-600">{formData.systemDowntimeHours} hours</span>
              <span>1,000 hrs</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Unplanned system outages affecting productivity</p>
          </div>

          <!-- Employee Count -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Number of Employees
            </label>
            <input
              type="range"
              min="10"
              max="5000"
              step="10"
              bind:value={formData.employeeCount}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>10</span>
              <span class="font-medium text-primary-600">{formData.employeeCount}</span>
              <span>5,000</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Employees affected by digital transformation</p>
          </div>

          <!-- Average Salary -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Average Employee Salary
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
              <span class="font-medium text-primary-600">{ROICalculations.formatCurrency(formData.averageSalary)}</span>
              <span>$150K</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Used to calculate productivity gains and downtime costs</p>
          </div>

          <!-- Project Duration -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Project Duration (Months)
            </label>
            <input
              type="range"
              min="6"
              max="36"
              step="3"
              bind:value={formData.projectDuration}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>6 mo</span>
              <span class="font-medium text-primary-600">{formData.projectDuration} months</span>
              <span>36 mo</span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Expected duration for transformation implementation</p>
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
                    ? 'border-primary-500 bg-primary-50 text-primary-700' 
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
            Calculate ROI
            <BarChart3 class="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <!-- Results -->
      <div class="card p-8" id="results">
        <h2 class="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
          <Target class="w-6 h-6 text-primary-600 mr-3" />
          ROI Analysis
        </h2>

        {#if showResults && results.length > 0}
          <!-- Key Metrics -->
          <div class="grid grid-cols-2 gap-4 mb-8">
            {#each results.filter(r => r.isHighlight) as result}
              <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4">
                <div class="text-2xl font-bold text-primary-600">
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
              Download Detailed Report
            </Button>
            
            <Button href="https://calendly.com/jason-conversadocs/30min" variant="primary" class="w-full">
              Schedule Consultation
            </Button>
          </div>

        {:else}
          <div class="text-center py-12">
            <DollarSign class="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-neutral-600 mb-2">Ready to Calculate</h3>
            <p class="text-neutral-500">
              Adjust the inputs on the left and click "Calculate ROI" to see your projected returns.
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<!-- Methodology -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-neutral-900 mb-8 text-center">
        Our Calculation Methodology
      </h2>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-semibold text-neutral-900 mb-4">Benefits Included</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <div class="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <div class="font-medium text-neutral-900">Process Automation</div>
                <div class="text-sm text-neutral-600">60% reduction in manual process time</div>
              </div>
            </li>
            <li class="flex items-start">
              <div class="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <div class="font-medium text-neutral-900">System Reliability</div>
                <div class="text-sm text-neutral-600">80% reduction in system downtime</div>
              </div>
            </li>
            <li class="flex items-start">
              <div class="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <div class="font-medium text-neutral-900">Employee Productivity</div>
                <div class="text-sm text-neutral-600">15% improvement in overall productivity</div>
              </div>
            </li>
            <li class="flex items-start">
              <div class="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <div class="font-medium text-neutral-900">Maintenance Reduction</div>
                <div class="text-sm text-neutral-600">30% decrease in IT maintenance costs</div>
              </div>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold text-neutral-900 mb-4">Investment Factors</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <div class="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <div class="font-medium text-neutral-900">Consulting Services</div>
                <div class="text-sm text-neutral-600">Strategic planning and oversight</div>
              </div>
            </li>
            <li class="flex items-start">
              <div class="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <div class="font-medium text-neutral-900">Implementation Costs</div>
                <div class="text-sm text-neutral-600">Technology deployment and integration</div>
              </div>
            </li>
            <li class="flex items-start">
              <div class="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <div class="font-medium text-neutral-900">Training & Change Management</div>
                <div class="text-sm text-neutral-600">Team preparation and adoption support</div>
              </div>
            </li>
            <li class="flex items-start">
              <div class="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <div class="font-medium text-neutral-900">Risk Buffer</div>
                <div class="text-sm text-neutral-600">Conservative estimates for uncertainties</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="mt-8 p-6 bg-neutral-50 rounded-lg">
        <h4 class="font-semibold text-neutral-900 mb-2">Based on Real Project Data</h4>
        <p class="text-neutral-600 text-sm">
          These calculations are based on actual outcomes from digital transformation projects completed over 15+ years, 
          including federal systems processing $190B+ in transactions and enterprise modernizations across multiple industries.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="section-padding gradient-primary text-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      Ready to Start Your Transformation?
    </h2>
    <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
      Get a detailed assessment of your digital transformation opportunity with a free consultation.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button href="https://calendly.com/jason-conversadocs/30min" variant="accent" size="lg">
        Schedule Free Assessment
      </Button>
      
      <Button href="/case-studies" variant="secondary" size="lg">
        View Case Studies
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