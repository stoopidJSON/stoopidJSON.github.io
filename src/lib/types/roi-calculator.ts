// src/lib/types/roi-calculator.ts

export interface CalculatorInput {
  label: string;
  key: string;
  type: 'number' | 'currency' | 'percentage' | 'hours';
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  description: string;
  unit?: string;
}

export interface CalculatorResult {
  label: string;
  value: number;
  type: 'currency' | 'percentage' | 'hours' | 'number';
  description: string;
  isHighlight?: boolean;
}

export interface ROIScenario {
  name: string;
  multiplier: number;
  description: string;
}

export interface ServiceCalculatorConfig {
  title: string;
  description: string;
  serviceSlug: string;
  inputs: CalculatorInput[];
  scenarios: ROIScenario[];
  calculations: (inputs: Record<string, number>, scenario: ROIScenario) => CalculatorResult[];
}

export interface CalculatorFormData {
  [key: string]: number;
}

export interface CompanyProfile {
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  industry: string;
  revenue?: number;
  employees?: number;
}

// Utility functions for calculations
export class ROICalculations {
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  static formatPercentage(value: number): string {
    return `${Math.round(value)}%`;
  }

  static formatNumber(value: number): string {
    return new Intl.NumberFormat('en-US').format(Math.round(value));
  }

  static calculateROI(benefits: number, investment: number): number {
    if (investment === 0) return 0;
    return ((benefits - investment) / investment) * 100;
  }

  static calculatePaybackPeriod(investment: number, monthlyBenefit: number): number {
    if (monthlyBenefit <= 0) return 0;
    return investment / monthlyBenefit;
  }

  static calculateNPV(
    investment: number, 
    annualBenefit: number, 
    years: number, 
    discountRate: number = 0.1
  ): number {
    let npv = -investment;
    for (let year = 1; year <= years; year++) {
      npv += annualBenefit / Math.pow(1 + discountRate, year);
    }
    return npv;
  }
}

// Industry and company size presets
export const COMPANY_SIZE_MULTIPLIERS = {
  startup: 0.5,
  small: 0.8,
  medium: 1.0,
  large: 1.3,
  enterprise: 1.8
};

export const INDUSTRY_FACTORS = {
  technology: 1.2,
  finance: 1.4,
  healthcare: 1.1,
  manufacturing: 0.9,
  retail: 0.8,
  government: 0.7,
  nonprofit: 0.6
};

// Common calculation patterns
export const STANDARD_SCENARIOS: ROIScenario[] = [
  {
    name: 'Conservative',
    multiplier: 0.7,
    description: 'Cautious estimates with lower expected benefits'
  },
  {
    name: 'Realistic',
    multiplier: 1.0,
    description: 'Most likely outcomes based on typical engagements'
  },
  {
    name: 'Optimistic',
    multiplier: 1.4,
    description: 'Best-case scenario with maximum potential benefits'
  }
];