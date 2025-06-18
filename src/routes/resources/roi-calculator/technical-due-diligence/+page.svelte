<!-- src/routes/resources/roi-calculator/technical-due-diligence/+page.svelte -->
<script lang="ts">
  import { ArrowLeft, Search, Download, Calculator, BarChart3, Target, AlertTriangle } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import { ROICalculations, STANDARD_SCENARIOS } from '$lib/types/roi-calculator';
  import type { CalculatorFormData, ROIScenario, CalculatorResult } from '$lib/types/roi-calculator';

  let formData: CalculatorFormData = {
    dealValue: 10000000,
    techAssetPercentage: 40,
    transactionType: 1,
    targetCompanyAge: 5,
    techTeamSize: 15,
    integrationComplexity: 2,
    timelineUrgency: 2,
    complianceRequirements: 1,
    dueDiligenceCost: 45000
  };

  let selectedScenario: ROIScenario = STANDARD_SCENARIOS[1];
  let showResults = false;
  
  function calculateDueDiligenceROI(data: CalculatorFormData, scenario: ROIScenario): CalculatorResult[] {
    const scenarioMultiplier = scenario.multiplier;
    const techAssetValue = data.dealValue * (data.techAssetPercentage / 100);
    const ageRiskFactor = Math.min(data.targetCompanyAge / 10, 1);
    const complexityMultipliers = { 1: 0.5, 2: 1.0, 3: 1.8 };
    const complexityFactor = complexityMultipliers[data.integrationComplexity as keyof typeof complexityMultipliers];
    
    const techDebtDiscovery = techAssetValue * 0.15 * ageRiskFactor * scenarioMultiplier;
    const securityVulnerabilities = techAssetValue * 0.08 * scenarioMultiplier;
    const scalabilityIssues = techAssetValue * 0.12 * complexityFactor * scenarioMultiplier;
    const complianceGaps = data.complianceRequirements * techAssetValue * 0.05 * scenarioMultiplier;
    const integrationChallenges = techAssetValue * 0.20 * complexityFactor * scenarioMultiplier;
    const keyPersonRisk = data.techTeamSize > 10 ? techAssetValue * 0.06 * scenarioMultiplier : techAssetValue * 0.15 * scenarioMultiplier;
    
    const totalPotentialIssues = techDebtDiscovery + securityVulnerabilities + scalabilityIssues + complianceGaps + integrationChallenges + keyPersonRisk;
    
    const thoroughnessMultipliers = { 1: 0.9, 2: 0.95, 3: 0.85 };
    const thoroughness = thoroughnessMultipliers[data.timelineUrgency as keyof typeof thoroughnessMultipliers];
    const issuesDiscovered = totalPotentialIssues * thoroughness;
    
    const negotiationLeverage = issuesDiscovered * 0.6;
    const actualNegotiationSuccess = negotiationLeverage * 0.7 * scenarioMultiplier;
    
    const catastrophicRiskProbability = 0.05 + (ageRiskFactor * 0.03) + (complexityFactor * 0.02);
    const badDecisionAvoidanceValue = data.dealValue * catastrophicRiskProbability * scenarioMultiplier;
    
    const integrationEfficiency = integrationChallenges * 0.4 * scenarioMultiplier;
    const executionSpeedValue = techAssetValue * 0.08 * scenarioMultiplier;
    const complianceAssuranceValue = data.complianceRequirements * 100000 * scenarioMultiplier;
    
    const totalBenefits = actualNegotiationSuccess + badDecisionAvoidanceValue + integrationEfficiency + executionSpeedValue + complianceAssuranceValue;
    const roi = ROICalculations.calculateROI(totalBenefits, data.dueDiligenceCost);
    const riskMitigationMultiple = totalBenefits / data.dueDiligenceCost;
    const immediateValue = actualNegotiationSuccess + badDecisionAvoidanceValue;
    
    return [
      {
        label: 'Due Diligence Investment',
        value: data.dueDiligenceCost,
        type: 'currency',
        description: 'Cost of comprehensive technical due diligence',
        isHighlight: false
      },
      {
        label: 'Total Value Protection',
        value: totalBenefits,
        type: 'currency',
        description: 'Total value from risk mitigation and leverage',
        isHighlight: true
      },
      {
        label: 'ROI',
        value: roi,
        type: 'percentage',
        description: 'Return on due diligence investment',
        isHighlight: true
      },
      {
        label: 'Risk Mitigation Multiple',
        value: riskMitigationMultiple,
        type: 'number',
        description: 'Value protection multiple of investment cost',
        isHighlight: false
      },
      {
        label: 'Immediate Deal Impact',
        value: immediateValue,
        type: 'currency',
        description: 'Negotiation leverage and bad decision avoidance',
        isHighlight: false
      },
      {
        label: 'Negotiation Leverage',
        value: actualNegotiationSuccess,
        type: 'currency',
        description: 'Deal price reduction from discovered issues',
        isHighlight: false
      },
      {
        label: 'Integration Efficiency',
        value: integrationEfficiency,
        type: 'currency',
        description: 'Savings from better post-transaction planning',
        isHighlight: false
      },
      {
        label: 'Catastrophic Risk Avoidance',
        value: badDecisionAvoidanceValue,
        type: 'currency',
        description: 'Value of avoiding potentially disastrous acquisition',
        isHighlight: false
      }
    ];
  }

  $: results = showResults ? calculateDueDiligenceROI(formData, selectedScenario) : [];

  function formatResult(result: CalculatorResult): string {
    switch (result.type) {
      case 'currency':
        return ROICalculations.formatCurrency(result.value);
      case 'percentage':
        return ROICalculations.formatPercentage(result.value);
      case 'number':
        return `${result.value.toFixed(1)}x`;
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
</script>

<svelte:head>
  <title>Technical Due Diligence ROI Calculator | The Digital Janitor</title>
  <meta name="description" content="Calculate ROI for technical due diligence in M&A and investments." />
</svelte:head>

<section class="bg-neutral-50 py-4">
  <div class="container-custom">
    <nav class="flex items-center space-x-2 text-sm text-neutral-600">
      <a href="/" class="hover:text-primary-600">Home</a>
      <span>/</span>
      <a href="/resources/roi-calculator" class="hover:text-primary-600">ROI Calculator</a>
      <span>/</span>
      <span class="text-neutral-900">Technical Due Diligence</span>
    </nav>
  </div>
</section>

<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto">
      <div class="mb-8">
        <Button href="/resources/roi-calculator" variant="ghost" size="sm">
          <ArrowLeft class="mr-2 h-4 w-4" />
          Back to ROI Calculators
        </Button>
      </div>
      
      <div class="text-center mb-12">
        <div class="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Search class="w-10 h-10 text-red-600" />
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          Technical Due Diligence ROI Calculator
        </h1>
        
        <p class="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto mb-8">
          Calculate the return on investment for comprehensive technical due diligence in M&A transactions.
        </p>
        
        <div class="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div class="text-center">
            <div class="text-2xl font-bold text-red-600">500-2000%</div>
            <div class="text-sm text-neutral-600">Typical ROI</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-red-600">10-15%</div>
            <div class="text-sm text-neutral-600">Deal Leverage</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-red-600">Immediate</div>
            <div class="text-sm text-neutral-600">Value Realization</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section-padding gradient-neutral">
  <div class="container-custom">
    <div class="grid lg:grid-cols-2 gap-12">
      <div class="card p-8">
        <h2 class="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
          <Calculator class="w-6 h-6 text-red-600 mr-3" />
          Transaction Details
        </h2>
        
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">Total Deal Value</label>
            <input
              type="range"
              min="1000000"
              max="100000000"
              step="1000000"
              bind:value={formData.dealValue}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>$1M</span>
              <span class="font-medium text-red-600">{ROICalculations.formatCurrency(formData.dealValue)}</span>
              <span>$100M</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">Technology Asset Percentage</label>
            <input
              type="range"
              min="10"
              max="95"
              step="5"
              bind:value={formData.techAssetPercentage}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>10%</span>
              <span class="font-medium text-red-600">{formData.techAssetPercentage}%</span>
              <span>95%</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">Target Company Age (Years)</label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              bind:value={formData.targetCompanyAge}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>1</span>
              <span class="font-medium text-red-600">{formData.targetCompanyAge} years</span>
              <span>20</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">Tech Team Size</label>
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              bind:value={formData.techTeamSize}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>1</span>
              <span class="font-medium text-red-600">{formData.techTeamSize}</span>
              <span>100</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">Integration Complexity</label>
            <div class="grid grid-cols-3 gap-3 mt-2">
              <button
                on:click={() => formData.integrationComplexity = 1}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.integrationComplexity === 1 
                    ? 'border-red-500 bg-red-50 text-red-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Simple</div>
              </button>
              <button
                on:click={() => formData.integrationComplexity = 2}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.integrationComplexity === 2 
                    ? 'border-red-500 bg-red-50 text-red-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Moderate</div>
              </button>
              <button
                on:click={() => formData.integrationComplexity = 3}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  formData.integrationComplexity === 3 
                    ? 'border-red-500 bg-red-50 text-red-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">Complex</div>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">Due Diligence Cost</label>
            <input
              type="range"
              min="15000"
              max="150000"
              step="5000"
              bind:value={formData.dueDiligenceCost}
              class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-neutral-500 mt-1">
              <span>$15K</span>
              <span class="font-medium text-red-600">{ROICalculations.formatCurrency(formData.dueDiligenceCost)}</span>
              <span>$150K</span>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-neutral-200">
          <h3 class="text-lg font-semibold text-neutral-900 mb-4">Risk Scenario</h3>
          <div class="grid grid-cols-3 gap-3">
            {#each STANDARD_SCENARIOS as scenario}
              <button
                on:click={() => selectedScenario = scenario}
                class="p-3 text-center rounded-lg border transition-all duration-200 {
                  selectedScenario === scenario 
                    ? 'border-red-500 bg-red-50 text-red-700' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }"
              >
                <div class="font-medium text-sm">{scenario.name}</div>
                <div class="text-xs text-neutral-500 mt-1">{scenario.description}</div>
              </button>
            {/each}
          </div>
        </div>

        <div class="mt-8">
          <Button on:click={handleCalculate} variant="primary" size="lg" class="w-full">
            Calculate Due Diligence ROI
            <BarChart3 class="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <div class="card p-8" id="results">
        <h2 class="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
          <Target class="w-6 h-6 text-red-600 mr-3" />
          ROI Analysis
        </h2>

        {#if showResults && results.length > 0}
          <div class="grid grid-cols-2 gap-4 mb-8">
            {#each results.filter(r => r.isHighlight) as result}
              <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4">
                <div class="text-2xl font-bold text-red-600">
                  {formatResult(result)}
                </div>
                <div class="text-sm font-medium text-neutral-700">{result.label}</div>
                <div class="text-xs text-neutral-500 mt-1">{result.description}</div>
              </div>
            {/each}
          </div>

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

          <div class="space-y-3">
            <Button variant="secondary" class="w-full">
              <Download class="mr-2 h-4 w-4" />
              Download Analysis Report
            </Button>
            
            <Button href="https://calendly.com/jason-conversadocs/30min" variant="primary" class="w-full">
              Discuss Due Diligence Needs
            </Button>
          </div>

        {:else}
          <div class="text-center py-12">
            <Search class="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-neutral-600 mb-2">Ready to Calculate</h3>
            <p class="text-neutral-500">
              Enter transaction details to see potential ROI of technical due diligence.
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-neutral-900 mb-8 text-center">
        What Technical Due Diligence Uncovers
      </h2>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
            <AlertTriangle class="w-5 h-5 text-red-600 mr-2" />
            Hidden Risks
          </h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <div class="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <div class="font-medium text-neutral-900">Technical Debt</div>
                <div class="text-sm text-neutral-600">Hidden maintenance costs and scalability issues</div>
              </div>
            </li>
            <li class="flex items-start">
              <div class="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <div class="font-medium text-neutral-900">Security Vulnerabilities</div>
                <div class="text-sm text-neutral-600">Compliance gaps and potential breaches</div>
              </div>
            </li>
            <li class="flex items-start">
              <div class="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <div class="font-medium text-neutral-900">Integration Challenges</div>
                <div class="text-sm text-neutral-600">Architectural incompatibilities</div>
              </div>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
            <Target class="w-5 h-5 text-green-600 mr-2" />
            Value Protection
          </h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <div class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <div class="font-medium text-neutral-900">Negotiation Leverage</div>
                <div class="text-sm text-neutral-600">10-15% deal price reduction</div>
              </div>
            </li>
            <li class="flex items-start">
              <div class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <div class="font-medium text-neutral-900">Risk Avoidance</div>
                <div class="text-sm text-neutral-600">Prevent catastrophic acquisitions</div>
              </div>
            </li>
            <li class="flex items-start">
              <div class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <div class="font-medium text-neutral-900">Better Integration</div>
                <div class="text-sm text-neutral-600">50% faster post-transaction execution</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section-padding bg-gradient-to-r from-red-600 to-red-800 text-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      Protect Your Investment
    </h2>
    <p class="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
      Don't let hidden technical issues derail your transaction. Get comprehensive assessment from someone who knows what to look for.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button href="https://calendly.com/jason-conversadocs/30min" variant="secondary" size="lg">
        Discuss Your Transaction
      </Button>
      
      <Button href="/services/technical-due-diligence" variant="outline" size="lg">
        Due Diligence Services
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
    background: #dc2626;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #dc2626;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>