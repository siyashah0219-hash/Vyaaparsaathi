import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Calculator,
  IndianRupee,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  PieChart,
  BarChart3,
  Sparkles,
  ArrowRight,
  Download,
  CheckCircle2,
  AlertTriangle,
  Landmark,
} from 'lucide-react';
import { SliderField } from '../components/ui/SliderField';

export const FinancialPlanPage: React.FC = () => {
  const { financialInput, setFinancialInput, financialResult, profile, setActiveTab } = useApp();

  const handleInputChange = (field: keyof typeof financialInput, value: number) => {
    setFinancialInput((prev) => ({
      ...prev,
      [field]: Math.max(0, value),
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-purple-800 bg-purple-100 px-3 py-1 rounded-full border border-purple-300">
            Bank-Ready Financial Calculator
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 mt-2">
            Financial Plan & Loan Structuring
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Adjust budget assumptions below. See real-time EMI, DSCR bank approval score, funding mix, and 6-month cash flow projections.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="self-start sm:self-center inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
        >
          <Download className="h-4 w-4" /> Download / Print Report
        </button>
      </div>

      {/* Main Grid: Inputs Column vs Calculations Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Assumption Sliders/Inputs (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm space-y-5">
          <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-emerald-950 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-emerald-700" /> Budget Assumptions
            </h3>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Interactive
            </span>
          </div>

          <div className="space-y-4">
            
            {/* Total Startup / Expansion Cost */}
            <SliderField
              label="Total Startup / Expansion Cost"
              value={financialInput.startupCost}
              onChange={(val) => handleInputChange('startupCost', val)}
              min={10000}
              max={1000000}
              step={5000}
              prefix="₹"
              colorScheme="emerald"
              helperText="Estimated machinery, shed setup, initial stock, and working capital."
              presets={[
                { label: '₹50K', value: 50000 },
                { label: '₹1.2 Lakh', value: 120000 },
                { label: '₹2.5 Lakh', value: 250000 },
                { label: '₹5 Lakh', value: 500000 },
              ]}
            />

            {/* Own Capital Contribution */}
            <SliderField
              label="Your Own Capital Contribution"
              value={financialInput.ownCapital}
              onChange={(val) => handleInputChange('ownCapital', val)}
              min={5000}
              max={Math.max(5000, financialInput.startupCost)}
              step={5000}
              prefix="₹"
              colorScheme="emerald"
              helperText="Personal funds or family savings invested in this project."
              presets={[
                { label: '₹25K', value: 25000 },
                { label: '₹45K', value: 45000 },
                { label: '₹1 Lakh', value: 100000 },
              ]}
            />

            {/* Monthly Expected Revenue */}
            <SliderField
              label="Monthly Expected Sales / Revenue"
              value={financialInput.monthlyRevenue}
              onChange={(val) => handleInputChange('monthlyRevenue', val)}
              min={5000}
              max={500000}
              step={2000}
              prefix="₹"
              suffix=" / mo"
              colorScheme="emerald"
              helperText="Projected cash receipts from customer sales and produce."
              presets={[
                { label: '₹25K', value: 25000 },
                { label: '₹35K', value: 35000 },
                { label: '₹60K', value: 60000 },
                { label: '₹1 Lakh', value: 100000 },
              ]}
            />

            {/* Monthly Operating Expenses */}
            <SliderField
              label="Monthly Operating Expenses"
              value={financialInput.monthlyExpenses}
              onChange={(val) => handleInputChange('monthlyExpenses', val)}
              min={2000}
              max={Math.max(2000, financialInput.monthlyRevenue)}
              step={1000}
              prefix="₹"
              suffix=" / mo"
              colorScheme="amber"
              helperText="Cost of supplies, packaging, fuel, electricity, and labor."
              presets={[
                { label: '₹12K', value: 12000 },
                { label: '₹22K', value: 22000 },
                { label: '₹40K', value: 40000 },
              ]}
            />

            {/* Bank Interest Slider */}
            <SliderField
              label="Bank Loan Interest Rate"
              value={financialInput.interestRate}
              onChange={(val) => handleInputChange('interestRate', val)}
              min={4}
              max={20}
              step={0.25}
              suffix="%"
              colorScheme="blue"
              helperText="Annual percentage rate applied on the term loan."
              presets={[
                { label: 'KCC Subsidized (7%)', value: 7 },
                { label: 'PM MUDRA (8.5%)', value: 8.5 },
                { label: 'PSB Normal (11.5%)', value: 11.5 },
                { label: 'NBFC (14%)', value: 14 },
              ]}
            />

            {/* Tenure Selector */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
                Loan Repayment Tenure
              </label>
              <select
                value={financialInput.tenureMonths}
                onChange={(e) => handleInputChange('tenureMonths', Number(e.target.value))}
                className="w-full px-3.5 py-2.5 border rounded-xl font-bold text-emerald-950 dark:text-emerald-300 text-xs bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 outline-none focus:border-emerald-600 cursor-pointer"
              >
                <option value={12}>12 Months (1 Year)</option>
                <option value={24}>24 Months (2 Years) — Recommended</option>
                <option value={36}>36 Months (3 Years)</option>
                <option value={60}>60 Months (5 Years)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Right Column: Dynamic Calculation Results (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top Key Performance Metrics Row (4 cols on 2xl) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 2xl:grid-cols-4 gap-4">
            
            {/* Term Loan Needed */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-emerald-200 dark:border-slate-800 shadow-2xs space-y-1 transition-all duration-300 hover-card-lift animate-fade-in-up stagger-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Bank Loan Required</span>
              <p className="font-serif text-2xl font-bold text-emerald-950 dark:text-slate-100">
                ₹{financialResult.termLoanNeeded.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                After ₹{financialInput.ownCapital.toLocaleString('en-IN')} own capital
              </p>
            </div>

            {/* Monthly EMI */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-purple-200 dark:border-purple-900/60 shadow-2xs space-y-1 transition-all duration-300 hover-card-lift animate-fade-in-up stagger-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Monthly Bank EMI</span>
              <p className="font-serif text-2xl font-bold text-purple-950 dark:text-purple-300">
                ₹{financialResult.monthlyEMI.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-purple-700 dark:text-purple-400 font-medium">
                @{financialInput.interestRate}% for {financialInput.tenureMonths} mos
              </p>
            </div>

            {/* DSCR Score */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-emerald-200 dark:border-slate-800 shadow-2xs space-y-1 transition-all duration-300 hover-card-lift animate-fade-in-up stagger-3">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">DSCR Score (Bank Approval)</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-emerald-950 dark:text-slate-100">
                  {financialResult.dscr}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded transition-transform hover:scale-105 ${
                    financialResult.dscrStatus === 'Healthy'
                      ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300'
                      : 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300'
                  }`}
                >
                  {financialResult.dscrStatus}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Target DSCR &gt; 1.25 for MUDRA</p>
            </div>

            {/* Net Monthly Profit Buffer (Widescreen 2xl Card) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-emerald-200 dark:border-slate-800 shadow-2xs space-y-1 transition-all duration-300 hover-card-lift animate-fade-in-up stagger-4 hidden 2xl:block">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Net Monthly Surplus</span>
              <p className="font-serif text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                ₹{Math.max(0, financialInput.monthlyRevenue - financialInput.monthlyExpenses - financialResult.monthlyEMI).toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Net surplus after loan EMI servicing
              </p>
            </div>

          </div>

          {/* Funding Mix Breakdown */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-emerald-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-emerald-950 dark:text-slate-100 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-emerald-700 dark:text-emerald-400" /> Proposed Funding Mix Breakdown
              </h3>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400">
                Total ₹{financialInput.startupCost.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Progress Stack Bar */}
            <div className="h-4 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
              <div
                className="bg-emerald-600 dark:bg-emerald-500 h-full transition-all duration-700 ease-out hover:brightness-110"
                style={{
                  width: `${Math.min(100, (financialResult.fundingMix.ownCapital / financialInput.startupCost) * 100)}%`,
                }}
                title="Own Capital"
              />
              <div
                className="bg-purple-600 dark:bg-purple-500 h-full transition-all duration-700 ease-out hover:brightness-110"
                style={{
                  width: `${Math.min(100, (financialResult.fundingMix.termLoan / financialInput.startupCost) * 100)}%`,
                }}
                title="Term Loan"
              />
              <div
                className="bg-amber-400 dark:bg-amber-500 h-full transition-all duration-700 ease-out hover:brightness-110"
                style={{
                  width: `${Math.min(100, (financialResult.fundingMix.govtSubsidy / financialInput.startupCost) * 100)}%`,
                }}
                title="Govt Subsidy"
              />
            </div>

            {/* Legend Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-700 shrink-0" />
                <div>
                  <span className="text-gray-500 block">Own Capital</span>
                  <strong className="text-emerald-950">₹{financialResult.fundingMix.ownCapital.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-purple-600 shrink-0" />
                <div>
                  <span className="text-gray-500 block">Term Loan</span>
                  <strong className="text-purple-950">₹{financialResult.fundingMix.termLoan.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-amber-400 shrink-0" />
                <div>
                  <span className="text-gray-500 block">Est. Subsidy Benefit</span>
                  <strong className="text-amber-950">₹{financialResult.fundingMix.govtSubsidy.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Plain Language AI Assessment Summary */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-950">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h4 className="font-serif text-base font-bold">AI Financial Assessment & Advice</h4>
            </div>
            <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
              {financialResult.aiExplanation}
            </p>
          </div>

          {/* 6-Month Cash Flow Projection Table */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm space-y-4">
            <h3 className="font-serif text-base font-bold text-emerald-950 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-700" /> 6-Month Cash Flow Projections
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50">
                    <th className="py-2.5 px-3">Month</th>
                    <th className="py-2.5 px-3">Revenue</th>
                    <th className="py-2.5 px-3">Expenses</th>
                    <th className="py-2.5 px-3">EMI</th>
                    <th className="py-2.5 px-3">Net Cash Flow</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-emerald-950">
                  {financialResult.cashFlowProjections.map((row) => (
                    <tr key={row.month} className="hover:bg-emerald-50/40">
                      <td className="py-2.5 px-3 font-bold">{row.month}</td>
                      <td className="py-2.5 px-3 text-emerald-800">₹{row.revenue.toLocaleString('en-IN')}</td>
                      <td className="py-2.5 px-3 text-gray-600">₹{row.expenses.toLocaleString('en-IN')}</td>
                      <td className="py-2.5 px-3 text-purple-700">₹{financialResult.monthlyEMI.toLocaleString('en-IN')}</td>
                      <td className={`py-2.5 px-3 font-bold ${row.netCash >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                        ₹{row.netCash.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* Next Step CTAs Bar */}
      <div className="bg-emerald-950 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif text-xl font-bold text-white">
            Ready to Match Government Schemes & Risk Factors?
          </h4>
          <p className="text-emerald-200 text-xs mt-1">
            Check matching collateral-free loans (MUDRA / PMFME) or run a sensitivity risk analysis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('schemes')}
            className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md"
          >
            <Landmark className="h-4 w-4" /> View Matched Schemes <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => setActiveTab('risk-analysis')}
            className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-4 py-3 rounded-xl border border-emerald-600 text-xs sm:text-sm"
          >
            Assess Risks
          </button>
        </div>
      </div>

    </div>
  );
};
