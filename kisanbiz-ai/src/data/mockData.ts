import {
  BusinessProfile,
  HyperLocalAnalysis,
  FinancialPlanInput,
  FinancialPlanResult,
  RiskFactor,
  GovtScheme,
  ActionTask,
  Expert,
} from '../types';

export const defaultProfile: BusinessProfile = {
  name: 'Sunita Patil',
  state: 'Maharashtra',
  district: 'Satara',
  villageCity: 'Koregaon',
  businessCategory: 'Dairy & Animal Husbandry',
  businessType: 'existing',
  capital: 45000,
  monthlySales: 22000,
  monthlyExpenses: 14000,
  customerCount: 85,
  experienceYears: 3,
  businessGoal: 'Procure chilling equipment & expand daily milk delivery to 3 neighboring villages',
  targetCustomers: 'Local households, sweet shops & village tea stalls',
  language: 'Marathi',
};

export const indianStatesAndDistricts: Record<string, string[]> = {
  Maharashtra: ['Satara', 'Nashik', 'Pune', 'Sangli', 'Kolhapur', 'Ahmednagar', 'Solapur', 'Nagpur'],
  Gujarat: ['Rajkot', 'Surat', 'Ahmedabad', 'Anand', 'Banaskantha', 'Mehsana', 'Vadodara'],
  'Uttar Pradesh': ['Varanasi', 'Lucknow', 'Kanpur', 'Gorakhpur', 'Prayagraj', 'Bareilly', 'Ayodhya'],
  Bihar: ['Patna', 'Muzaffarpur', 'Gaya', 'Bhagalpur', 'Darbhanga', 'Purnia'],
  Rajasthan: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Alwar', 'Bhilwara'],
  'Madhya Pradesh': ['Indore', 'Bhopal', 'Ujjain', 'Jabalpur', 'Gwalior'],
  Karnataka: ['Mandya', 'Belagavi', 'Mysuru', 'Dharwad', 'Hassan'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'],
  'Tamil Nadu': ['Coimbatore', 'Madurai', 'Salem', 'Erode', 'Tiruchirappalli'],
  'West Bengal': ['Hooghly', 'Nadia', 'Burdwan', 'Murshidabad', 'North 24 Parganas'],
};

export const businessCategories = [
  'Dairy & Animal Husbandry',
  'Grocery & Kirana Retail',
  'Vegetable & Agri Produce Trading',
  'Food Processing & Snacks',
  'Textiles & Garments',
  'Farm Input & Seed Counter',
  'Solar & Agri Equipment Rental',
  'Poultry & Goat Farming',
];

// Hyper-Local Dynamic Intelligence Engine
export function generateHyperLocalAnalysis(profile: BusinessProfile): HyperLocalAnalysis {
  const { state, district, businessCategory, capital, businessType } = profile;

  // Base setup cost heuristic depending on business category
  let setupCostEstimate = 65000;
  let monthlyOperatingCost = 18000;
  let customerDemandScore = 84;
  let competitorIntensity: 'Low' | 'Moderate' | 'High' = 'Moderate';
  let competitorCountEstimate = '4 to 6 local units in 5km radius';
  let targetCustomerSegment = 'Village households, local shops & regional mandi traders';
  let marketObservations: string[] = [];
  let potentialOpportunities: string[] = [];
  let keyChallenges: string[] = [];
  let suggestedPricingStrategy = 'Value-based local pricing with monthly bulk subscription discount.';

  if (businessCategory.includes('Dairy')) {
    setupCostEstimate = businessType === 'new' ? 85000 : 40000;
    monthlyOperatingCost = 22000;
    customerDemandScore = 91;
    competitorIntensity = 'Moderate';
    competitorCountEstimate = `3 milk collection centers in ${district}`;
    targetCustomerSegment = `Local families, village tea stalls & dairy co-operatives in ${district}`;
    marketObservations = [
      `High milk collection density recorded in ${district}, ${state} with strong daily consumer demand.`,
      `Raw milk procurement price averages ₹34–₹38/L, while direct retail sale fetches ₹52–₹58/L.`,
      `Chilling & clean storage is the #1 differentiator to prevent summer spoilage loss.`
    ];
    potentialOpportunities = [
      'Value addition into Ghee, Paneer, and Dahi increases profit margin by 35%.',
      'Tie-up with women SHG networks for door-to-door morning supply.',
      'Apply for 35% PMFME subsidy on food processing equipment.'
    ];
    keyChallenges = [
      'Summer fodder cost spikes (up by 15–20% between March and June).',
      'Maintaining cold chain storage during afternoon power cuts.'
    ];
  } else if (businessCategory.includes('Grocery') || businessCategory.includes('Kirana')) {
    setupCostEstimate = businessType === 'new' ? 110000 : 35000;
    monthlyOperatingCost = 28000;
    customerDemandScore = 88;
    competitorIntensity = 'High';
    competitorCountEstimate = `7 to 10 general stores in ${district} market hub`;
    targetCustomerSegment = `Daily wage earners, farm workers & local households in ${profile.villageCity || district}`;
    marketObservations = [
      `High repeat purchase frequency for staple grains, edible oil, and packaged spices in ${district}.`,
      `Wholesale sourcing from ${district} main APMC yields 12–18% gross margins.`,
      `Customers prefer 15-day credit lines during harvest cycles.`
    ];
    potentialOpportunities = [
      'Introduce digital ledger (Khata) and UPI payment QR to build customer loyalty.',
      'Stock micro-packets (₹5–₹10 sachets) which have 25% higher margin than jumbo packs.',
      'Partner with regional distributors for direct FMCG brand margins.'
    ];
    keyChallenges = [
      'Managing customer credit defaults during lean monsoon months.',
      'High competition from older established village kirana stores.'
    ];
  } else if (businessCategory.includes('Agri Produce') || businessCategory.includes('Vegetable')) {
    setupCostEstimate = businessType === 'new' ? 45000 : 20000;
    monthlyOperatingCost = 16000;
    customerDemandScore = 86;
    competitorIntensity = 'Moderate';
    competitorCountEstimate = `5 mandi traders in ${district}`;
    targetCustomerSegment = 'Retail consumers, small hotel caterers, and weekly village haat buyers';
    marketObservations = [
      `Seasonal price volatility in ${state} for Onion, Tomato, and Green Chilli creates 20–30% margin swings.`,
      `Early morning direct mandi sourcing saves ₹3–₹5 per kg over sub-traders.`,
      `Perishable loss averages 8–12% if unsold within 48 hours.`
    ];
    potentialOpportunities = [
      'Invest in plastic ventilation crates to reduce transportation damage by 40%.',
      'Direct supply agreement with local dhabas and hotel canteens for fixed daily income.',
      'Drying surplus vegetables into dehydrated packs for off-season sale.'
    ];
    keyChallenges = [
      'Storage humidity management during heavy rains in ' + state + '.',
      'Sudden mandi price drops affecting profit margin.'
    ];
  } else if (businessCategory.includes('Food Processing') || businessCategory.includes('Snacks')) {
    setupCostEstimate = businessType === 'new' ? 95000 : 45000;
    monthlyOperatingCost = 21000;
    customerDemandScore = 89;
    competitorIntensity = 'Low';
    competitorCountEstimate = `2 small processing units in 10km area around ${district}`;
    targetCustomerSegment = 'School canteens, bus stand kiosks, kirana shops & festival buyers';
    marketObservations = [
      `Growing demand for hygienic locally packaged snacks (papad, pickles, namkeen, flour) in ${district}.`,
      `Raw materials (pulses, spices, grains) are readily available at local mandi rates in ${state}.`,
      `FSSAI basic registration builds instant trust with formal retailers.`
    ];
    potentialOpportunities = [
      'Avail 35% credit-linked capital subsidy under PMFME scheme.',
      'Custom branded eco-packaging for nearby town grocery stores.',
      'SHG collective marketing for district exhibition sales.'
    ];
    keyChallenges = [
      'Ensuring consistent shelf-life without chemical preservatives.',
      'Initial packaging and sealing machinery investment.'
    ];
  } else {
    // Generic fallback for any other category
    setupCostEstimate = businessType === 'new' ? 75000 : 30000;
    monthlyOperatingCost = 19000;
    customerDemandScore = 82;
    competitorIntensity = 'Moderate';
    competitorCountEstimate = `3 to 5 similar operators in ${district}`;
    targetCustomerSegment = `Local residents & small enterprise buyers in ${district}, ${state}`;
    marketObservations = [
      `Steady local market growth for micro-services in ${district}, ${state}.`,
      `Word-of-mouth and trusted personal service drive 70% of customer retention.`,
      `Low upfront capital requirement makes it suitable for ₹${capital.toLocaleString('en-IN')} available budget.`
    ];
    potentialOpportunities = [
      'Leverage PM MUDRA Shishu loan for working capital booster.',
      'Expand service radius to 3 nearby villages.',
      'Introduce digital booking / WhatsApp customer order channel.'
    ];
    keyChallenges = [
      'Cash flow management during low season.',
      'Scaling customer acquisition beyond immediate village circle.'
    ];
  }

  return {
    state,
    district,
    businessCategory,
    businessType,
    setupCostEstimate,
    setupCostRange: `₹${Math.round(setupCostEstimate * 0.85).toLocaleString('en-IN')} – ₹${Math.round(setupCostEstimate * 1.25).toLocaleString('en-IN')}`,
    monthlyOperatingCost,
    monthlyOperatingCostRange: `₹${Math.round(monthlyOperatingCost * 0.9).toLocaleString('en-IN')} – ₹${Math.round(monthlyOperatingCost * 1.15).toLocaleString('en-IN')}`,
    customerDemandScore,
    demandTrend: customerDemandScore > 85 ? 'high_growth' : 'stable',
    competitorIntensity,
    competitorCountEstimate,
    targetCustomerSegment,
    marketObservations,
    potentialOpportunities,
    keyChallenges,
    suggestedPricingStrategy,
  };
}

// Financial Calculation Engine
export function calculateFinancialPlan(input: FinancialPlanInput): FinancialPlanResult {
  const { startupCost, ownCapital, monthlyRevenue, monthlyExpenses, interestRate, tenureMonths } = input;

  const termLoanNeeded = Math.max(0, startupCost - ownCapital);
  const monthlyRate = interestRate / 12 / 100;
  
  let monthlyEMI = 0;
  if (termLoanNeeded > 0 && monthlyRate > 0) {
    monthlyEMI = Math.round(
      (termLoanNeeded * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1)
    );
  } else if (termLoanNeeded > 0) {
    monthlyEMI = Math.round(termLoanNeeded / tenureMonths);
  }

  const monthlyNetOperatingIncome = monthlyRevenue - monthlyExpenses;
  const monthlyNetProfit = monthlyNetOperatingIncome - monthlyEMI;

  // Debt Service Coverage Ratio (DSCR) = Net Operating Income / EMI
  const dscr = monthlyEMI > 0 ? Number((monthlyNetOperatingIncome / monthlyEMI).toFixed(2)) : 3.5;

  let dscrStatus: 'Healthy' | 'Moderate Risk' | 'High Risk' = 'Healthy';
  if (dscr < 1.1) dscrStatus = 'High Risk';
  else if (dscr < 1.5) dscrStatus = 'Moderate Risk';

  // Break-even monthly sales = Monthly Expenses + Monthly EMI
  const breakEvenSalesMonthly = monthlyExpenses + monthlyEMI;

  // Estimated months to reach break-even based on revenue trajectory
  const breakEvenMonths = Math.max(2, Math.min(12, Math.round((startupCost / Math.max(1, monthlyNetOperatingIncome)) * 0.8)));

  const govtSubsidy = Math.round(startupCost * 0.25); // Estimated 25% avg subsidy eligibility
  const workingCapital = Math.round(monthlyExpenses * 1.5);

  // Generate 6-month projections
  const cashFlowProjections = [1, 2, 3, 4, 5, 6].map((m) => {
    const growthFactor = 1 + (m - 1) * 0.06; // 6% monthly growth
    const rev = Math.round(monthlyRevenue * growthFactor);
    const exp = Math.round(monthlyExpenses * (1 + (m - 1) * 0.02));
    const net = rev - exp - monthlyEMI;
    const cum = net * m + (ownCapital * 0.3);
    return {
      month: `Month ${m}`,
      revenue: rev,
      expenses: exp,
      netCash: net,
      cumulativeCash: Math.round(cum),
    };
  });

  let aiExplanation = '';
  if (dscr >= 1.5) {
    aiExplanation = `Your financial structure is healthy! With a monthly net profit of ₹${monthlyNetProfit.toLocaleString('en-IN')} after paying an EMI of ₹${monthlyEMI.toLocaleString('en-IN')}, your DSCR score of ${dscr} gives banks strong confidence to approve your loan.`;
  } else if (dscr >= 1.1) {
    aiExplanation = `Your plan is manageable but has tight margins. With an EMI of ₹${monthlyEMI.toLocaleString('en-IN')}, try to lower monthly operating costs by ₹2,000 or increase sales volume to maintain a comfortable cash cushion.`;
  } else {
    aiExplanation = `Caution: High debt burden detected. Your EMI of ₹${monthlyEMI.toLocaleString('en-IN')} absorbs most of your operating income. Consider increasing your own capital contribution by ₹15,000–₹20,000 or extending loan tenure.`;
  }

  return {
    termLoanNeeded,
    monthlyEMI,
    monthlyNetProfit,
    dscr,
    dscrStatus,
    breakEvenSalesMonthly,
    breakEvenMonths,
    fundingMix: {
      ownCapital,
      termLoan: termLoanNeeded,
      workingCapital,
      govtSubsidy,
    },
    cashFlowProjections,
    aiExplanation,
  };
}

// Risk Analysis Factors Database
export const sampleRiskFactors: RiskFactor[] = [
  {
    id: 'risk-1',
    category: 'Market/Demand',
    name: 'Customer Price Sensitivity & Seasonal Dips',
    description: 'Demand fluctuates during monsoon & agricultural sowing months when cash flow is strained in rural areas.',
    severity: 'Medium',
    mitigationStrategy: 'Introduce flexible micro-packs (sachets/small quantities) and offer early payment discounts to maintain volume.',
  },
  {
    id: 'risk-2',
    category: 'Supply Chain',
    name: 'Raw Material Cost Volatility',
    description: 'Unpredictable agricultural produce prices and transport costs affect gross profit margins.',
    severity: 'High',
    mitigationStrategy: 'Form direct procurement ties with 3+ local growers and maintain a 15-day non-perishable inventory buffer.',
  },
  {
    id: 'risk-3',
    category: 'Cash Flow & Credit',
    name: 'Delayed Credit Repayments from Customers',
    description: 'Customary village credit (Udhaar) can tie up working capital for 30–60 days.',
    severity: 'High',
    mitigationStrategy: 'Cap credit limit at ₹1,500 per customer and mandate 50% cash on delivery for orders above ₹3,000.',
  },
  {
    id: 'risk-4',
    category: 'Operational & Weather',
    name: 'Storage Damage & Power Interruptions',
    description: 'Frequent grid power outages threaten chilled or moisture-sensitive stock.',
    severity: 'Medium',
    mitigationStrategy: 'Invest in solar backup or battery inverter for critical refrigeration, covered under PM-KUSUM subsidy.',
  },
];

// Government & Bank Schemes Directory
export const allSchemes: GovtScheme[] = [
  {
    id: 'pm-mudra',
    name: 'Pradhan Mantri MUDRA Yojana',
    agency: 'Ministry of Finance / All Public Sector Banks',
    category: 'Collateral-Free Loan',
    maxFunding: 'Up to ₹10 Lakh',
    matchScore: 94,
    description: 'Collateral-free credit for micro-enterprises divided into Shishu (up to ₹50k), Kishor (₹50k–₹5Lakh), and Tarun (₹5Lakh–₹10Lakh).',
    eligibility: [
      'Non-farm micro or small business enterprise',
      'Indian citizen with valid Aadhaar & PAN card',
      'Satisfactory bank account standing'
    ],
    documentsRequired: [
      'Aadhaar Card & PAN Card',
      'Proof of business address (Voter ID/Electricity bill)',
      '6 months bank statement',
      'Simple business project cost sheet'
    ],
    applicationSteps: [
      'Step 1: Download MUDRA loan application form or visit JanSamarth portal.',
      'Step 2: Attach project estimate & self-attested Aadhaar/PAN copy.',
      'Step 3: Submit at any local Public Sector Bank branch or regional Gramin Bank.',
      'Step 4: Bank verification & loan sanction within 7–10 working days.'
    ],
    officialUrl: 'https://www.mudra.org.in'
  },
  {
    id: 'pmfme',
    name: 'PM Formalisation of Micro Food Processing Enterprises (PMFME)',
    agency: 'Ministry of Food Processing Industries (MoFPI)',
    category: 'Credit Subsidy',
    maxFunding: 'Up to ₹10 Lakh (35% Subsidy)',
    subsidyPercentage: '35%',
    matchScore: 88,
    description: 'Provides 35% credit-linked capital subsidy for establishing or upgrading micro food processing units (dairy, snacks, spices, flour).',
    eligibility: [
      'Individual micro food processing unit or SHG/FPO member',
      'Applicant age above 18 years with minimum 8th class pass',
      'Ownership of proposed or existing unit'
    ],
    documentsRequired: [
      'Aadhaar Card & Bank Account details',
      'Udyam Registration Certificate',
      'Detailed Project Report (DPR) prepared with District Resource Person',
      'Land/Shop rental agreement or ownership document'
    ],
    applicationSteps: [
      'Step 1: Register online on PMFME portal (pmfme.mofpi.gov.in).',
      'Step 2: Get connected with District Resource Person (DRP) for DPR preparation.',
      'Step 3: DPR submitted online for bank approval.',
      'Step 4: Capital subsidy released directly to bank loan account upon sanction.'
    ],
    officialUrl: 'https://pmfme.mofpi.gov.in'
  },
  {
    id: 'pmegp',
    name: 'Prime Minister’s Employment Generation Programme (PMEGP)',
    agency: 'KVIC / State KVIB / DIC',
    category: 'Self-Employment',
    maxFunding: 'Up to ₹50 Lakh (Manufacturing) / ₹20 Lakh (Service)',
    subsidyPercentage: '25% to 35%',
    matchScore: 85,
    description: 'Credit-linked subsidy programme to generate self-employment through micro-enterprise establishment in rural & urban areas.',
    eligibility: [
      'Individuals above 18 years of age',
      'Minimum VIII standard pass for projects costing above ₹10 Lakh',
      'Self Help Groups (SHGs) who have not availed benefits under other schemes'
    ],
    documentsRequired: [
      'Aadhaar Card & Caste/Category Certificate (if applicable)',
      'Educational Qualification Certificate',
      'Detailed Project Proposal',
      'Rural area certificate from Gram Panchayat Sarpanch'
    ],
    applicationSteps: [
      'Step 1: Apply online via KVIC PMEGP e-Portal.',
      'Step 2: Selection by District Level Task Force Committee (DLTFC).',
      'Step 3: Forwarding to preferred bank branch.',
      'Step 4: 10-day EDP training & subsidy disbursement.'
    ],
    officialUrl: 'https://www.kviconline.gov.in'
  },
  {
    id: 'stand-up-india',
    name: 'Stand-Up India Scheme',
    agency: 'Small Industries Development Bank of India (SIDBI)',
    category: 'Women & SHG',
    maxFunding: '₹10 Lakh to ₹1 Crore',
    matchScore: 81,
    description: 'Facilitates bank loans between ₹10 Lakh and ₹1 Crore to at least one SC/ST borrower and at least one Woman borrower per bank branch.',
    eligibility: [
      'SC/ST and/or Woman entrepreneur above 18 years of age',
      'Loans under the scheme are available for greenfield enterprises only',
      'Borrower should not be in default to any bank/financial institution'
    ],
    documentsRequired: [
      'Identity Proof & Address Proof',
      'Caste Certificate (for SC/ST category)',
      'Project Profile & Machinery Quotations',
      'Pollution control NOC (if required)'
    ],
    applicationSteps: [
      'Step 1: Register on Stand-Up Mitra portal (standupmitra.in).',
      'Step 2: Select nearest lead bank branch.',
      'Step 3: Submit application with handheld support agency guidance.',
      'Step 4: Composite loan sanction (Term Loan + Working Capital).'
    ],
    officialUrl: 'https://www.standupmitra.in'
  },
  {
    id: 'nabard-shg',
    name: 'NABARD SHG-Bank Linkage Programme',
    agency: 'NABARD / Regional Gramin Banks & DCCBs',
    category: 'Women & SHG',
    maxFunding: 'Up to ₹20 Lakh (Collateral-Free for Groups)',
    matchScore: 90,
    description: 'Connects self-help groups with formal banking institutions for collateral-free micro-credit loans for livelihood enterprise expansion.',
    eligibility: [
      'Registered or active Self-Help Group (SHG) operating for 6+ months',
      'Proper maintenance of books of accounts & regular meetings',
      'Good internal loan repayment track record'
    ],
    documentsRequired: [
      'SHG Resolution copy for loan application',
      'Aadhaar copies of all group members',
      'SHG Savings Bank account passbook',
      'Inter-se agreement signed by members'
    ],
    applicationSteps: [
      'Step 1: SHG passes resolution in weekly meeting.',
      'Step 2: Submit loan request to designated Bank Manager.',
      'Step 3: Bank officer conducts grading of SHG.',
      'Step 4: Credit facility sanctioned to SHG account for internal lending.'
    ],
    officialUrl: 'https://www.nabard.org'
  }
];

// Initial 30-60-90 Day Action Tasks
export const initialActionTasks: ActionTask[] = [
  {
    id: 'task-1',
    phase: 'Phase 1: Days 1–30',
    title: 'Obtain Udyam MSME Registration',
    description: 'Free online instant registration using Aadhaar on udyamregistration.gov.in to qualify for government schemes.',
    category: 'Legal & Bank',
    completed: true,
  },
  {
    id: 'task-2',
    phase: 'Phase 1: Days 1–30',
    title: 'Open Dedicated Business Current Account',
    description: 'Separate business transactions from personal household money to build a clean bank statement for future loans.',
    category: 'Legal & Bank',
    completed: true,
  },
  {
    id: 'task-3',
    phase: 'Phase 1: Days 1–30',
    title: 'Finalize Direct Vendor Sourcing Agreement',
    description: 'Lock in wholesale pricing with 2 primary suppliers to secure target gross profit margins.',
    category: 'Operations',
    completed: false,
  },
  {
    id: 'task-4',
    phase: 'Phase 2: Days 31–60',
    title: 'Submit PM MUDRA / PMFME Loan Application',
    description: 'File project cost sheet and Udyam certificate at local Gramin Bank branch for working capital booster.',
    category: 'Financial',
    completed: false,
  },
  {
    id: 'task-5',
    phase: 'Phase 2: Days 31–60',
    title: 'Launch Village Customer Outreach & QR Code',
    description: 'Distribute print flyers in local language and install UPI QR code for fast, cashless payments.',
    category: 'Marketing',
    completed: false,
  },
  {
    id: 'task-6',
    phase: 'Phase 3: Days 61–90',
    title: 'Establish Digital Khata & Credit Caps',
    description: 'Enforce strict ₹1,500 customer credit limits to keep operating cash flow healthy.',
    category: 'Operations',
    completed: false,
  },
  {
    id: 'task-7',
    phase: 'Phase 3: Days 61–90',
    title: 'Review Quarterly Financial Break-Even',
    description: 'Compare actual monthly sales against target break-even volume and adjust pricing if raw material costs rise.',
    category: 'Financial',
    completed: false,
  },
];

// Rural Business Domain Experts
export const expertsList: Expert[] = [
  {
    id: 'expert-1',
    name: 'Dr. Ramesh Kulkarni',
    title: 'Rural Agri-Supply Chain & Processing Specialist',
    specialty: 'Agri-Business & Cold Chain',
    experience: '16+ Years Experience',
    location: 'Pune, Maharashtra',
    rating: 4.9,
    reviewsCount: 142,
    availableSlots: ['Today 4:00 PM', 'Tomorrow 11:00 AM', 'Tomorrow 3:30 PM', 'Saturday 10:00 AM'],
    languages: ['Marathi', 'Hindi', 'English'],
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'expert-2',
    name: 'Ananya Sharma',
    title: 'Ex-NABARD Manager & Banking Specialist',
    specialty: 'Govt Schemes & Bank Loans',
    experience: '12+ Years Experience',
    location: 'Lucknow, Uttar Pradesh',
    rating: 4.95,
    reviewsCount: 188,
    availableSlots: ['Today 5:30 PM', 'Tomorrow 2:00 PM', 'Friday 11:30 AM'],
    languages: ['Hindi', 'English'],
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'expert-3',
    name: 'Suresh Patel',
    title: 'Micro-Enterprise Growth & SHG Mentor',
    specialty: 'Retail, Khata & Operations',
    experience: '14+ Years Experience',
    location: 'Rajkot, Gujarat',
    rating: 4.88,
    reviewsCount: 96,
    availableSlots: ['Tomorrow 10:30 AM', 'Tomorrow 4:30 PM', 'Saturday 2:00 PM'],
    languages: ['Gujarati', 'Hindi', 'English'],
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
];
