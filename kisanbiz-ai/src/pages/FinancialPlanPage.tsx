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

          <div className="space-y-4 text-xs">
            
            {/* Total Startup / Expansion Cost */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-emerald-950">
                <span>Total Startup / Expansion Cost</span>
                <span className="text-emerald-800">₹{financialInput.startupCost.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={financialInput.startupCost}
                onChange={(e) => handleInputChange('startupCost', Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>

            {/* Own Capital Contribution */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-emerald-950">
                <span>Your Own Capital</span>
                <span className="text-emerald-800">₹{financialInput.ownCapital.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="5000"
                max={financialInput.startupCost}
                step="5000"
                value={financialInput.ownCapital}
                onChange={(e) => handleInputChange('ownCapital', Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>

            {/* Monthly Expected Revenue */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-emerald-950">
                <span>Monthly Expected Sales / Revenue</span>
                <span className="text-emerald-800">₹{financialInput.monthlyRevenue.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="200000"
                step="2000"
                value={financialInput.monthlyRevenue}
                onChange={(e) => handleInputChange('monthlyRevenue', Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>

            {/* Monthly Operating Expenses */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-emerald-950">
                <span>Monthly Operating Expenses</span>
                <span className="text-emerald-800">₹{financialInput.monthlyExpenses.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="2000"
                max={financialInput.monthlyRevenue}
                step="1000"
                value={financialInput.monthlyExpenses}
                onChange={(e) => handleInputChange('monthlyExpenses', Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>

            {/* Bank Interest & Tenure Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Bank Interest %</label>
                <input
                  type="number"
                  step="0.5"
                  value={financialInput.interestRate}
                  onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
                  className="w-full p-2.5 border rounded-xl font-bold text-emerald-950 text-xs outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Tenure (Months)</label>
                <select
                  value={financialInput.tenureMonths}
                  onChange={(e) => handleInputChange('tenureMonths', Number(e.target.value))}
                  className="w-full p-2.5 border rounded-xl font-bold text-emerald-950 text-xs bg-white outline-none focus:border-emerald-600"
                >
                  <option value={12}>12 Months (1 Year)</option>
                  <option value={24}>24 Months (2 Years)</option>
                  <option value={36}>36 Months (3 Years)</option>
                  <option value={60}>60 Months (5 Years)</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Dynamic Calculation Results (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top Key Performance Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Term Loan Needed */}
            <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-2xs space-y-1">
              <span className="text-xs text-gray-500 font-medium">Bank Loan Required</span>
              <p className="font-serif text-2xl font-bold text-emerald-950">
                ₹{financialResult.termLoanNeeded.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-gray-500">
                After ₹{financialInput.ownCapital.toLocaleString('en-IN')} own capital
              </p>
            </div>

            {/* Monthly EMI */}
            <div className="bg-white rounded-2xl p-5 border border-purple-200 shadow-2xs space-y-1">
              <span className="text-xs text-gray-500 font-medium">Monthly Bank EMI</span>
              <p className="font-serif text-2xl font-bold text-purple-950">
                ₹{financialResult.monthlyEMI.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-purple-700 font-medium">
                @{financialInput.interestRate}% for {financialInput.tenureMonths} mos
              </p>
            </div>

            {/* DSCR Score */}
            <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-2xs space-y-1">
              <span className="text-xs text-gray-500 font-medium">DSCR Score (Bank Approval)</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-emerald-950">
                  {financialResult.dscr}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    financialResult.dscrStatus === 'Healthy'
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {financialResult.dscrStatus}
                </span>
              </div>
              <p className="text-[10px] text-gray-500">Target DSCR &gt; 1.25 for MUDRA</p>
            </div>

          </div>

          {/* Funding Mix Breakdown */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-emerald-950 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-emerald-700" /> Proposed Funding Mix Breakdown
              </h3>
              <span className="text-xs font-bold text-emerald-800">
                Total ₹{financialInput.startupCost.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Progress Stack Bar */}
            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex">
              <div
                className="bg-emerald-700 h-full"
                style={{
                  width: `${Math.min(100, (financialResult.fundingMix.ownCapital / financialInput.startupCost) * 100)}%`,
                }}
                title="Own Capital"
              />
              <div
                className="bg-purple-600 h-full"
                style={{
                  width: `${Math.min(100, (financialResult.fundingMix.termLoan / financialInput.startupCost) * 100)}%`,
                }}
                title="Term Loan"
              />
              <div
                className="bg-amber-400 h-full"
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
