import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { allSchemes } from '../data/mockData';
import {
  Landmark,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Search,
  Sparkles,
} from 'lucide-react';

export const SchemesView: React.FC = () => {
  const { profile } = useApp();
  const [selectedCat, setSelectedCat] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>('pm-mudra');

  const categories = ['All', 'Collateral-Free Loan', 'Credit Subsidy', 'Self-Employment', 'Women & SHG'];

  const filtered = selectedCat === 'All'
    ? allSchemes
    : allSchemes.filter((s) => s.category === selectedCat);

  return (
    <div className="space-y-3.5 px-3.5 pt-3 pb-24 animate-fade-in-up">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/80 px-2 py-0.5 rounded">
          Govt Schemes & Subsidies
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100">
          Matched Funding Programs
        </h1>
        <p className="text-[11px] text-slate-500">
          Tailored to your business in <strong>{profile.district}, {profile.state}</strong> with capital of ₹{profile.capital.toLocaleString('en-IN')}.
        </p>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all touch-bounce ${
                selectedCat === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes List */}
      <div className="space-y-3">
        {filtered.map((scheme) => {
          const isExpanded = expandedId === scheme.id;
          return (
            <div
              key={scheme.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/20'
                  : 'border-slate-200/80 dark:border-slate-800/80 shadow-2xs'
              }`}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : scheme.id)}
                className="p-4 cursor-pointer space-y-2 select-none"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                      {scheme.category}
                    </span>
                    {scheme.subsidyPercentage && (
                      <span className="text-[9px] font-bold text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-1.5 py-0.5 rounded">
                        {scheme.subsidyPercentage} Subsidy
                      </span>
                    )}
                  </div>

                  <span className="text-[9px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                    {scheme.matchScore}% Match
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-slate-100">
                    {scheme.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                    {scheme.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                  <div>
                    <span className="text-[9px] text-slate-400 block">Max Funding</span>
                    <strong className="font-serif text-slate-900 dark:text-slate-100">
                      {scheme.maxFunding}
                    </strong>
                  </div>

                  <button className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                    {isExpanded ? <>Hide <ChevronUp className="h-3.5 w-3.5" /></> : <>Details <ChevronDown className="h-3.5 w-3.5" /></>}
                  </button>
                </div>
              </div>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-4 space-y-3.5 text-xs animate-fade-in-up">
                  {/* Eligibility */}
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-[11px] flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Eligibility
                    </h4>
                    <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                      {scheme.eligibility.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Documents */}
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-[11px] flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-blue-600" /> Required Documents
                    </h4>
                    <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                      {scheme.documentsRequired.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Official Portal Button */}
                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold p-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs touch-bounce shadow-xs"
                  >
                    <span>Visit Official Govt Portal</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
