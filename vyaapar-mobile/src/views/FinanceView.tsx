import React from 'react';
import { useApp } from '../context/AppContext';
import { SliderField } from '../components/ui/SliderField';
import {
  Calculator,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  PieChart,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react';

export const FinanceView: React.FC = () => {
  const { financialInput, setFinancialInput, financialResult, setActiveTab } = useApp();

  const handleInputChange = (field: keyof typeof financialInput, value: number) => {
    setFinancialInput((prev) => ({
      ...prev,
      [field]: Math.max(0, value),
    }));
  };

  const netSurplus = Math.max(
    0,
    financialInput.monthlyRevenue - financialInput.monthlyExpenses - financialResult.monthlyEMI
  );

  return (
    <div className="space-y-4 px-3.5 pt-3 pb-24 animate-fade-in-up">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/80 px-2 py-0.5 rounded">
          Bank-Ready Calculator
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
          Financial & Loan Planner
        </h1>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Adjust sliders to instantly calculate EMI, DSCR score, and bank approval readiness.
        </p>
      </div>

      {/* Performance KPI Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        
        {/* Required Bank Loan */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-emerald-200/80 dark:border-slate-800/80 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 block">Bank Loan Needed</span>
          <p className="font-serif text-lg font-bold text-emerald-950 dark:text-emerald-300">
            ₹{financialResult.termLoanNeeded.toLocaleString('en-IN')}
          </p>
          <span className="text-[9px] text-slate-400 block truncate">
            Startup - Own Capital
          </span>
        </div>

        {/* Monthly EMI */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-purple-200/80 dark:border-slate-800/80 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 block">Monthly Bank EMI</span>
          <p className="font-serif text-lg font-bold text-purple-950 dark:text-purple-300">
            ₹{financialResult.monthlyEMI.toLocaleString('en-IN')}
          </p>
          <span className="text-[9px] text-purple-600 dark:text-purple-400 font-semibold block">
            @{financialInput.interestRate}% ({financialInput.tenureMonths} mos)
          </span>
        </div>

        {/* DSCR Bank Approval */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 block">DSCR Score</span>
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100">
              {financialResult.dscr}
            </span>
            <span
              className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                financialResult.dscrStatus === 'Healthy'
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                  : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
              }`}
            >
              {financialResult.dscrStatus}
            </span>
          </div>
          <span className="text-[9px] text-slate-400 block">Target &gt; 1.25</span>
        </div>

        {/* Net Monthly Surplus */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 block">Net Monthly Surplus</span>
          <p className="font-serif text-lg font-bold text-emerald-700 dark:text-emerald-400">
            ₹{netSurplus.toLocaleString('en-IN')}
          </p>
          <span className="text-[9px] text-slate-400 block truncate">
            Surplus after EMI
          </span>
        </div>

      </div>

      {/* Funding Mix Breakdown Stack Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <PieChart className="h-4 w-4 text-emerald-600" /> Funding Mix
          </span>
          <span className="font-serif font-bold text-slate-700 dark:text-slate-300">
            Total ₹{financialInput.startupCost.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="h-3.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
          <div
            className="bg-emerald-600 h-full transition-all duration-500"
            style={{ width: `${Math.min(100, (financialResult.fundingMix.ownCapital / financialInput.startupCost) * 100)}%` }}
            title="Own Capital"
          />
          <div
            className="bg-purple-600 h-full transition-all duration-500"
            style={{ width: `${Math.min(100, (financialResult.fundingMix.termLoan / financialInput.startupCost) * 100)}%` }}
            title="Term Loan"
          />
          <div
            className="bg-amber-400 h-full transition-all duration-500"
            style={{ width: `${Math.min(100, (financialResult.fundingMix.govtSubsidy / financialInput.startupCost) * 100)}%` }}
            title="Govt Subsidy"
          />
        </div>

        <div className="grid grid-cols-3 gap-1 text-[10px] text-center pt-1">
          <div>
            <span className="h-2 w-2 rounded-full bg-emerald-600 inline-block mr-1"></span>
            <span className="text-slate-500 block">Own Capital</span>
            <strong className="text-emerald-950 dark:text-emerald-300">₹{financialResult.fundingMix.ownCapital.toLocaleString('en-IN')}</strong>
          </div>
          <div>
            <span className="h-2 w-2 rounded-full bg-purple-600 inline-block mr-1"></span>
            <span className="text-slate-500 block">Term Loan</span>
            <strong className="text-purple-950 dark:text-purple-300">₹{financialResult.fundingMix.termLoan.toLocaleString('en-IN')}</strong>
          </div>
          <div>
            <span className="h-2 w-2 rounded-full bg-amber-400 inline-block mr-1"></span>
            <span className="text-slate-500 block">Govt Subsidy</span>
            <strong className="text-amber-950 dark:text-amber-300">₹{financialResult.fundingMix.govtSubsidy.toLocaleString('en-IN')}</strong>
          </div>
        </div>
      </div>

      {/* Interactive Touch Sliders */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
          Adjust Assumptions
        </h3>

        <SliderField
          label="Total Setup / Expansion Budget"
          value={financialInput.startupCost}
          onChange={(val) => handleInputChange('startupCost', val)}
          min={25000}
          max={1000000}
          step={5000}
          prefix="₹"
          colorScheme="emerald"
          presets={[
            { label: '₹50K', value: 50000 },
            { label: '₹1.5L', value: 150000 },
            { label: '₹3L', value: 300000 },
            { label: '₹5L', value: 500000 },
          ]}
        />

        <SliderField
          label="Your Own Capital Contribution"
          value={financialInput.ownCapital}
          onChange={(val) => handleInputChange('ownCapital', val)}
          min={5000}
          max={financialInput.startupCost}
          step={2000}
          prefix="₹"
          colorScheme="blue"
          helperText="Bank requires minimum 10%-15% margin money."
          presets={[
            { label: '₹20K', value: 20000 },
            { label: '₹45K', value: 45000 },
            { label: '₹80K', value: 80000 },
          ]}
        />

        <SliderField
          label="Expected Monthly Sales / Revenue"
          value={financialInput.monthlyRevenue}
          onChange={(val) => handleInputChange('monthlyRevenue', val)}
          min={10000}
          max={300000}
          step={2000}
          prefix="₹"
          suffix=" / mo"
          colorScheme="emerald"
          presets={[
            { label: '₹25K', value: 25000 },
            { label: '₹40K', value: 40000 },
            { label: '₹75K', value: 75000 },
          ]}
        />

        <SliderField
          label="Monthly Operating Expenses"
          value={financialInput.monthlyExpenses}
          onChange={(val) => handleInputChange('monthlyExpenses', val)}
          min={5000}
          max={financialInput.monthlyRevenue}
          step={1000}
          prefix="₹"
          suffix=" / mo"
          colorScheme="amber"
        />

        <SliderField
          label="Annual Loan Interest Rate"
          value={financialInput.interestRate}
          onChange={(val) => handleInputChange('interestRate', val)}
          min={4}
          max={18}
          step={0.25}
          suffix="%"
          colorScheme="purple"
          presets={[
            { label: 'KCC (7%)', value: 7 },
            { label: 'MUDRA (8.5%)', value: 8.5 },
            { label: 'PSB (11.5%)', value: 11.5 },
          ]}
        />

        {/* Tenure Selection */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
            Repayment Tenure (Months)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[12, 24, 36, 60].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => handleInputChange('tenureMonths', m)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all touch-bounce ${
                  financialInput.tenureMonths === m
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                {m} Mos
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Button to explore matched schemes */}
      <button
        onClick={() => setActiveTab('schemes')}
        className="w-full bg-gradient-to-r from-emerald-700 to-green-600 text-white font-bold p-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-xs touch-bounce"
      >
        <span>Explore Govt Schemes for This Budget</span>
        <ArrowRight className="h-4 w-4" />
      </button>

    </div>
  );
};
