<!-- src/lib/components/calculator/InputSlider.svelte -->
<script lang="ts">
  export let label: string;
  export let value: number;
  export let min: number;
  export let max: number;
  export let step: number;
  export let description: string = '';
  export let formatValue: (value: number) => string = (v) => v.toString();
  
  let sliderElement: HTMLInputElement;
</script>

<div class="calculator-input">
  <label class="block text-sm font-medium text-neutral-700 mb-2">
    {label}
  </label>
  
  <input
    bind:this={sliderElement}
    type="range"
    {min}
    {max}
    {step}
    bind:value
    class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
  />
  
  <div class="flex justify-between text-sm text-neutral-500 mt-1">
    <span>{formatValue(min)}</span>
    <span class="font-medium text-primary-600">{formatValue(value)}</span>
    <span>{formatValue(max)}</span>
  </div>
  
  {#if description}
    <p class="text-xs text-neutral-500 mt-1">{description}</p>
  {/if}
</div>

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

<!-- src/lib/components/calculator/ResultsDisplay.svelte -->
<script lang="ts">
  import type { CalculatorResult } from '$lib/types/roi-calculator';
  import { ROICalculations } from '$lib/types/roi-calculator';
  
  export let results: CalculatorResult[];
  
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
</script>

{#if results.length > 0}
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
{/if}