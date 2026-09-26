import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { sampleRiskFactors } from '../data/mockData';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Percent,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export const RiskAnalysisPage: React.FC = () => {
  const { profile, financialResult, financialInput, setActiveTab } = useApp();

  // Sensitivity Test Sliders
  const [salesDipPercent, setSalesDipPercent] = useState<number>(15);
  const [costIncreasePercent, setCostIncreasePercent] = useState<number>(10);

  // Calculate adjusted numbers under sensitivity test
  const adjustedSales = Math.round(financialInput.monthlyRevenue * (1 - salesDipPercent / 100));
  const adjustedCosts = Math.round(financialInput.monthlyExpenses * (1 + costIncreasePercent / 100));
  const adjustedNetOperating = adjustedSales - adjustedCosts;
  const adjustedNetProfit = adjustedNetOperating - financialResult.monthlyEMI;
  const adjustedDscr = financialResult.monthlyEMI > 0 ? Number((adjustedNetOperating / financialResult.monthlyEMI).toFixed(2)) : 2.5;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-red-800 bg-red-100 px-3 py-1 rounded-full border border-red-300">
            Risk & Sensitivity Matrix
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 mt-2">
            Risk Analysis & Mitigation Strategies
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Every business faces local challenges. Identify key risk factors for <strong>{profile.businessCategory}</strong> in <strong>{profile.district}, {profile.state}</strong> and test your financial buffer against sales dips.
          </p>
        </div>
      </div>

      {/* Sensitivity Analysis Simulator */}
      <div className="bg-gradient-to-br from-amber-500/10 via-amber-50 to-emerald-50 rounded-3xl p-6 sm:p-8 border border-amber-300 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-emerald-950 flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-amber-600" /> Sensitivity Stress Test Calculator
          </h3>
          <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Simulate Market Dips
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Slider 1: Sales Dip */}
          <div className="space-y-2 text-xs bg-white p-4 rounded-2xl border border-amber-200">
            <div className="flex justify-between font-bold text-emerald-950">
              <span>What if monthly sales drop by?</span>
              <span className="text-red-600 font-bold">{salesDipPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="5"
              value={salesDipPercent}
              onChange={(e) => setSalesDipPercent(Number(e.target.value))}
              className="w-full accent-red-600 cursor-pointer"
            />
            <p className="text-[11px] text-gray-500">
              New Simulated Sales: <strong>₹{adjustedSales.toLocaleString('en-IN')}</strong> / month
            </p>
          </div>

          {/* Slider 2: Cost Increase */}
          <div className="space-y-2 text-xs bg-white p-4 rounded-2xl border border-amber-200">
            <div className="flex justify-between font-bold text-emerald-950">
              <span>What if raw material costs rise by?</span>
              <span className="text-amber-700 font-bold">{costIncreasePercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="5"
              value={costIncreasePercent}
              onChange={(e) => setCostIncreasePercent(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <p className="text-[11px] text-gray-500">
              New Simulated Expenses: <strong>₹{adjustedCosts.toLocaleString('en-IN')}</strong> / month
            </p>
          </div>

        </div>

        {/* Stress Test Outcome Results Banner */}
        <div className="bg-white rounded-2xl p-5 border border-amber-300 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-gray-500 font-semibold block">Stress Test Outcome</span>
            <p className="font-serif text-lg font-bold text-emerald-950">
              Simulated Monthly Net Profit: <span className={adjustedNetProfit >= 0 ? 'text-emerald-700' : 'text-red-600'}>₹{adjustedNetProfit.toLocaleString('en-IN')}</span>
            </p>
          </div>

          <div className="space-y-1 text-right">
            <span className="text-gray-500 font-semibold block">Simulated DSCR Score</span>
            <span className={`text-base font-bold px-3 py-1 rounded-lg ${adjustedDscr >= 1.2 ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'}`}>
              {adjustedDscr} ({adjustedDscr >= 1.2 ? 'Passes Bank Cushion' : 'Tight Margin Risk'})
            </span>
          </div>
        </div>
      </div>

      {/* Identified Risk Factors & Mitigation Matrix */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-emerald-950 flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-emerald-700" /> Key Risk Factors & Actionable Mitigations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sampleRiskFactors.map((risk) => (
            <div
              key={risk.id}
              className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    {risk.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      risk.severity === 'High'
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {risk.severity} Severity
                  </span>
                </div>

                <h4 className="font-serif text-lg font-bold text-emerald-950">
                  {risk.name}
                </h4>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {risk.description}
                </p>
              </div>

              {/* Mitigation Strategy Box */}
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 text-xs space-y-1">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" /> Mitigation Strategy:
                </span>
                <p className="text-emerald-900 font-medium leading-relaxed">
                  {risk.mitigationStrategy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation CTAs Bar */}
      <div className="bg-emerald-950 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif text-xl font-bold text-white">
            Proceed to Action Plan & Execution Roadmap
          </h4>
          <p className="text-emerald-200 text-xs mt-1">
            Convert mitigations into a 30-60-90 day checkable task roadmap.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('action-plan')}
            className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md"
          >
            Open 30-60-90 Action Plan <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => setActiveTab('advisor')}
            className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-4 py-3 rounded-xl border border-emerald-600 text-xs sm:text-sm"
          >
            Ask AI Advisor
          </button>
        </div>
      </div>

    </div>
  );
};
