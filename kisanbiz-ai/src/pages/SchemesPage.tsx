import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { allSchemes } from '../data/mockData';
import { GovtScheme } from '../types';
import {
  Landmark,
  ShieldCheck,
  CheckCircle2,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Search,
  Sparkles,
  Layers,
} from 'lucide-react';

export const SchemesPage: React.FC = () => {
  const { profile, setActiveTab } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>('pm-mudra');

  const categories = [
    'All',
    'Collateral-Free Loan',
    'Credit Subsidy',
    'Self-Employment',
    'Women & SHG',
  ];

  const filteredSchemes =
    selectedCategory === 'All'
      ? allSchemes
      : allSchemes.filter((s) => s.category === selectedCategory);

  const toggleExpand = (id: string) => {
    setExpandedSchemeId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-emerald-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/70 px-3 py-1 rounded-full border border-blue-300 dark:border-blue-800">
            Government & NGO Support Directory
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 dark:text-slate-100 mt-2">
            Matched Government Schemes & Subsidies
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
            Personalized loan and capital subsidy programs matched to your work in <strong>{profile.district}, {profile.state}</strong> and your available capital of <strong>₹{profile.capital.toLocaleString('en-IN')}</strong>.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700 hover:text-emerald-900 dark:hover:text-white border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat === 'All' ? 'All Matched Schemes' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Cards List */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme, idx) => {
          const isExpanded = expandedSchemeId === scheme.id;
          return (
            <div
              key={scheme.id}
              className={`bg-white dark:bg-slate-900 rounded-3xl border transition-all duration-300 overflow-hidden hover-card-lift ${
                isExpanded
                  ? 'border-emerald-500 shadow-lg ring-1 ring-emerald-500/20'
                  : 'border-emerald-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 shadow-2xs'
              }`}
            >
              {/* Main Card Summary Header */}
              <div
                onClick={() => toggleExpand(scheme.id)}
                className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
              >
                <div className="space-y-2 max-w-4xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                      {scheme.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                      {scheme.matchScore}% Match Confidence
                    </span>
                    {scheme.subsidyPercentage && (
                      <span className="text-[10px] font-bold text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/70 px-2 py-0.5 rounded">
                        {scheme.subsidyPercentage} Subsidy
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-emerald-950 dark:text-slate-100">
                    {scheme.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {scheme.description}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100 dark:border-slate-800">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Max Funding Amount
                    </span>
                    <span className="font-serif text-lg font-bold text-emerald-950 dark:text-slate-100">
                      {scheme.maxFunding}
                    </span>
                  </div>

                  <button className="flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-slate-700 hover:bg-emerald-100 dark:hover:bg-slate-700 transition-all hover:scale-105 active:scale-95">
                    {isExpanded ? (
                      <>Hide Details <ChevronUp className="h-4 w-4" /></>
                    ) : (
                      <>View Steps & Docs <ChevronDown className="h-4 w-4" /></>
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Details Walkthrough */}
              {isExpanded && (
                <div className="border-t border-slate-100 dark:border-slate-800 bg-emerald-50/40 dark:bg-slate-950/50 p-6 sm:p-8 space-y-6 animate-fade-in-up">
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Eligibility Column */}
                    <div className="space-y-3 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-emerald-200 dark:border-slate-800">
                      <h4 className="font-serif text-sm font-bold text-emerald-950 dark:text-slate-100 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-700 dark:text-emerald-400" /> Who Qualifies?
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                        {scheme.eligibility.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Required Documents */}
                    <div className="space-y-3 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-emerald-200 dark:border-slate-800">
                      <h4 className="font-serif text-sm font-bold text-emerald-950 dark:text-slate-100 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-emerald-700 dark:text-emerald-400" /> Documents Checklist
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                        {scheme.documentsRequired.map((doc, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Application Steps */}
                    <div className="space-y-3 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-emerald-200 dark:border-slate-800">
                      <h4 className="font-serif text-sm font-bold text-emerald-950 dark:text-slate-100 flex items-center gap-2">
                        <Landmark className="h-4 w-4 text-emerald-700 dark:text-emerald-400" /> How to Apply
                      </h4>
                      <ol className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                        {scheme.applicationSteps.map((step, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                  </div>

                  {/* External Portal Link */}
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-gray-500">
                      Managing Agency: <strong>{scheme.agency}</strong>
                    </p>
                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-white px-4 py-2.5 rounded-xl border border-emerald-300 hover:bg-emerald-50 shadow-2xs"
                    >
                      Visit Official Portal <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation CTAs Bar */}
      <div className="bg-emerald-950 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif text-xl font-bold text-white">
            Have Questions About Bank Loan Approval?
          </h4>
          <p className="text-emerald-200 text-xs mt-1">
            Ask our Voice & Text AI Advisor or book a 1-on-1 session with an ex-NABARD specialist.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('advisor')}
            className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md"
          >
            Ask AI Advisor <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => setActiveTab('expert-session')}
            className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-4 py-3 rounded-xl border border-emerald-600 text-xs sm:text-sm"
          >
            Book Expert
          </button>
        </div>
      </div>

    </div>
  );
};
