export type BusinessType = 'new' | 'existing';
export type Language = 'Hindi' | 'Marathi' | 'English';

export interface BusinessProfile {
  name: string;
  state: string;
  district: string;
  villageCity: string;
  businessCategory: string;
  businessType: BusinessType;
  capital: number;
  monthlySales: number;
  monthlyExpenses: number;
  customerCount: number;
  experienceYears: number;
  businessGoal: string;
  targetCustomers: string;
  language: Language;
}

export interface HyperLocalAnalysis {
  state: string;
  district: string;
  businessCategory: string;
  businessType: BusinessType;
  setupCostEstimate: number;
  setupCostRange: string;
  monthlyOperatingCost: number;
  monthlyOperatingCostRange: string;
  customerDemandScore: number; // 0 - 100
  demandTrend: 'high_growth' | 'stable' | 'moderate';
  competitorIntensity: 'Low' | 'Moderate' | 'High';
  competitorCountEstimate: string;
  targetCustomerSegment: string;
  marketObservations: string[];
  potentialOpportunities: string[];
  keyChallenges: string[];
  suggestedPricingStrategy: string;
}

export interface FinancialPlanInput {
  startupCost: number;
  ownCapital: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  interestRate: number; // e.g. 11.5%
  tenureMonths: number;
}

export interface FinancialPlanResult {
  termLoanNeeded: number;
  monthlyEMI: number;
  monthlyNetProfit: number;
  dscr: number; // Debt Service Coverage Ratio
  dscrStatus: 'Healthy' | 'Moderate Risk' | 'High Risk';
  breakEvenSalesMonthly: number;
  breakEvenMonths: number;
  fundingMix: {
    ownCapital: number;
    termLoan: number;
    workingCapital: number;
    govtSubsidy: number;
  };
  cashFlowProjections: {
    month: string;
    revenue: number;
    expenses: number;
    netCash: number;
    cumulativeCash: number;
  }[];
  aiExplanation: string;
}

export interface RiskFactor {
  id: string;
  category: 'Market/Demand' | 'Supply Chain' | 'Cash Flow & Credit' | 'Operational & Weather';
  name: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
  mitigationStrategy: string;
}

export interface GovtScheme {
  id: string;
  name: string;
  agency: string; // e.g. Ministry of MSME, NABARD, MoFPI
  category: 'Collateral-Free Loan' | 'Credit Subsidy' | 'Self-Employment' | 'Women & SHG';
  maxFunding: string;
  subsidyPercentage?: string;
  matchScore: number; // 0 - 100
  description: string;
  eligibility: string[];
  documentsRequired: string[];
  applicationSteps: string[];
  officialUrl: string;
}

export interface AdvisorMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
}

export interface ActionTask {
  id: string;
  phase: 'Phase 1: Days 1–30' | 'Phase 2: Days 31–60' | 'Phase 3: Days 61–90';
  title: string;
  description: string;
  category: 'Legal & Bank' | 'Operations' | 'Marketing' | 'Financial';
  completed: boolean;
}

export interface Expert {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experience: string;
  location: string;
  rating: number;
  reviewsCount: number;
  availableSlots: string[];
  languages: string[];
  imageUrl: string;
}

export interface ExpertBooking {
  id: string;
  expertId: string;
  expertName: string;
  date: string;
  timeSlot: string;
  userName: string;
  userPhone: string;
  topic: string;
  status: 'Confirmed' | 'Pending';
  bookingRef: string;
}
