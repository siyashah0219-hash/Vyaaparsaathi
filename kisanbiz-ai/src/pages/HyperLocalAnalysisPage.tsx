import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { generateHyperLocalAnalysis } from '../data/mockData';
import { fetchLiveMandiPrices, MandiPriceItem } from '../services/apiService';
import {
  MapPin,
  Building2,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Users,
  Target,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Store,
  Sparkles,
  Calculator,
  Landmark,
  RefreshCw,
} from 'lucide-react';

export const HyperLocalAnalysisPage: React.FC = () => {
  const { profile, setActiveTab } = useApp();
  const analysis = generateHyperLocalAnalysis(profile);

  const [mandiPrices, setMandiPrices] = useState<MandiPriceItem[]>([]);
  const [loadingPrices, setLoadingPrices] = useState<boolean>(true);

  const loadPrices = async () => {
    setLoadingPrices(true);
    const data = await fetchLiveMandiPrices(profile.state, profile.district);
    setMandiPrices(data);
    setLoadingPrices(false);
  };

  useEffect(() => {
    loadPrices();
  }, [profile.state, profile.district]);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                Hyper-Local Market Intelligence
              </span>
              <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                {profile.businessType === 'new' ? 'New Setup Mode' : 'Existing Unit Expansion'}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 mt-2">
              Market Analysis for {analysis.businessCategory}
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-emerald-700 shrink-0" />
              <span>
                <strong>{profile.villageCity || profile.district}</strong>, {analysis.district} District, {analysis.state}
              </span>
            </p>
          </div>

          <button
            onClick={() => setActiveTab('profile')}
            className="self-start sm:self-center px-4 py-2 rounded-xl border border-emerald-300 text-xs font-bold text-emerald-800 hover:bg-emerald-50 transition-colors"
          >
            Change Location / Category
          </button>
        </div>

        {/* Prototype Data Badge */}
        <div className="flex items-center justify-between gap-2 text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0" />
            <span>
              Live Mandi Price Feeds & Regional Market Intelligence for <strong>{analysis.district}, {analysis.state}</strong>.
            </span>
          </div>
          <button
            onClick={loadPrices}
            className="flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-950 text-xs shrink-0"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loadingPrices ? 'animate-spin' : ''}`} /> Refresh Feed
          </button>
        </div>
      </div>

      {/* Top Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Setup Cost */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-emerald-200 dark:border-slate-800 shadow-2xs space-y-2 hover-card-lift animate-fade-in-up stagger-1">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-slate-400">
            <span>Est. Setup Cost</span>
            <IndianRupee className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          </div>
          <p className="font-serif text-2xl font-bold text-emerald-950 dark:text-slate-100">
            ₹{analysis.setupCostEstimate.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
            Range: {analysis.setupCostRange}
          </p>
        </div>

        {/* Operating Cost */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-emerald-200 dark:border-slate-800 shadow-2xs space-y-2 hover-card-lift animate-fade-in-up stagger-2">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-slate-400">
            <span>Est. Monthly Operating Cost</span>
            <Building2 className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          </div>
          <p className="font-serif text-2xl font-bold text-emerald-950 dark:text-slate-100">
            ₹{analysis.monthlyOperatingCost.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
            Range: {analysis.monthlyOperatingCostRange}
          </p>
        </div>

        {/* Customer Demand Score */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-emerald-200 dark:border-slate-800 shadow-2xs space-y-2 hover-card-lift animate-fade-in-up stagger-3">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-slate-400">
            <span>Customer Demand</span>
            <TrendingUp className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-emerald-950 dark:text-slate-100">
              {analysis.customerDemandScore}
            </span>
            <span className="text-xs text-gray-500 dark:text-slate-400 font-bold">/ 100</span>
          </div>
          <span className="inline-block bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
            High Growth Potential
          </span>
        </div>

        {/* Competitor Intensity */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-emerald-200 dark:border-slate-800 shadow-2xs space-y-2 hover-card-lift animate-fade-in-up stagger-4">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-slate-400">
            <span>Competitor Density</span>
            <Users className="h-4 w-4 text-amber-700 dark:text-amber-400" />
          </div>
          <p className="font-serif text-2xl font-bold text-emerald-950 dark:text-slate-100">
            {analysis.competitorIntensity}
          </p>
          <p className="text-[11px] text-gray-600 dark:text-slate-400 font-medium truncate">
            {analysis.competitorCountEstimate}
          </p>
        </div>

      </div>

      {/* LIVE MANDI COMMODITY PRICE FEED (API INTEGRATED) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-emerald-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-emerald-950 dark:text-slate-100 flex items-center gap-2">
            <Store className="h-6 w-6 text-emerald-700 dark:text-emerald-400" /> Live Mandi Commodity Price Feed ({profile.district}, {profile.state})
          </h3>
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
            Updated Today
          </span>
        </div>

        {loadingPrices ? (
          <div className="py-8 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin text-emerald-700 dark:text-emerald-400" /> Loading live mandi price feeds...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 2xl:gap-6">
            {mandiPrices.map((item, idx) => (
              <div
                key={idx}
                className="bg-emerald-50/50 dark:bg-slate-800/70 p-4 rounded-2xl border border-emerald-200 dark:border-slate-700 space-y-2 text-xs transition-all duration-300 hover-card-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950 dark:text-slate-100 text-sm">{item.commodity}</span>
                  <span
                    className={`flex items-center gap-1 font-bold px-2 py-0.5 rounded text-[10px] transition-transform hover:scale-105 ${
                      item.trend === 'up'
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                        : item.trend === 'down'
                        ? 'bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : item.trend === 'down' ? <TrendingDown className="h-3 w-3" /> : null}
                    {item.trend === 'up' ? `+${item.changePercent}%` : item.trend === 'down' ? `${item.changePercent}%` : 'Stable'}
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] block">Modal Price / {item.unit}</span>
                    <span className="font-serif text-xl font-bold text-emerald-950 dark:text-slate-100">
                      ₹{item.modalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="text-right text-[10px] text-slate-500 dark:text-slate-400">
                    <span>Range: ₹{item.minPrice}–₹{item.maxPrice}</span>
                    <span className="block text-emerald-800 dark:text-emerald-400 font-semibold">{item.market}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Target Segment & Pricing Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Target Customers */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-emerald-200 dark:border-slate-800 shadow-2xs space-y-3 transition-colors">
          <h3 className="font-serif text-lg font-bold text-emerald-950 dark:text-slate-100 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-700 dark:text-emerald-400" /> Target Customer Segment
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-emerald-50/60 dark:bg-slate-800/60 p-4 rounded-2xl border border-emerald-100 dark:border-slate-700">
            {analysis.targetCustomerSegment}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Based on consumer demographics in <strong>{profile.villageCity || profile.district}</strong> and nearby village haats.
          </p>
        </div>

        {/* Pricing Strategy */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-emerald-200 dark:border-slate-800 shadow-2xs space-y-3 transition-colors">
          <h3 className="font-serif text-lg font-bold text-emerald-950 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" /> Recommended Pricing Strategy
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-amber-50/60 dark:bg-slate-800/60 p-4 rounded-2xl border border-amber-200 dark:border-slate-700">
            {analysis.suggestedPricingStrategy}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ensures competitive positioning against established local traders while preserving profit margins.
          </p>
        </div>

      </div>

      {/* Local Market Observations (Field Notes) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-emerald-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <h3 className="font-serif text-xl font-bold text-emerald-950 dark:text-slate-100 flex items-center gap-2">
          <Store className="h-6 w-6 text-emerald-700 dark:text-emerald-400" /> Local Market Observations ({analysis.district}, {analysis.state})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3">
          {analysis.marketObservations.map((obs, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 bg-emerald-50/50 dark:bg-slate-800/60 p-4 rounded-2xl border border-emerald-100 dark:border-slate-700 text-xs sm:text-sm text-emerald-950 dark:text-slate-200 font-medium"
            >
              <span className="h-6 w-6 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="leading-relaxed">{obs}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities & Key Challenges Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Business Opportunities */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm space-y-4">
          <h3 className="font-serif text-lg font-bold text-emerald-950 flex items-center gap-2 text-emerald-800">
            <Lightbulb className="h-5 w-5 text-amber-500" /> High-Potential Opportunities
          </h3>
          <ul className="space-y-3">
            {analysis.potentialOpportunities.map((opp, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                <span className="h-2 w-2 rounded-full bg-emerald-600 mt-2 shrink-0" />
                <span className="leading-relaxed">{opp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Operational Challenges */}
        <div className="bg-white rounded-3xl p-6 border border-red-200 shadow-sm space-y-4">
          <h3 className="font-serif text-lg font-bold text-emerald-950 flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5 text-red-500" /> Key Market & Operational Challenges
          </h3>
          <ul className="space-y-3">
            {analysis.keyChallenges.map((chal, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                <span className="h-2 w-2 rounded-full bg-red-500 mt-2 shrink-0" />
                <span className="leading-relaxed">{chal}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Action Next Navigation Bar */}
      <div className="bg-emerald-950 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif text-xl font-bold text-white">
            Next Step: Structure Your Financial Budget & Loan
          </h4>
          <p className="text-emerald-200 text-xs mt-1">
            Convert this hyper-local market analysis into an EMI calculator, break-even target, and cash flow plan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('financial-plan')}
            className="shimmer-btn bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-5 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-xs sm:text-sm flex items-center gap-2 transition-all duration-200"
          >
            <Calculator className="h-4 w-4" /> Financial Plan & Calculator <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => setActiveTab('schemes')}
            className="bg-emerald-800 hover:bg-emerald-700 hover:scale-105 active:scale-95 text-white font-bold px-4 py-3 rounded-xl border border-emerald-600 text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-200"
          >
            <Landmark className="h-4 w-4 text-amber-300" /> Govt Schemes
          </button>
        </div>
      </div>

    </div>
  );
};
