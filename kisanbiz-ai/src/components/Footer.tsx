import React from 'react';
import { useApp } from '../context/AppContext';
import { Store, ShieldCheck, PhoneCall, Heart, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t-4 border-amber-500 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-emerald-800/60">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg bg-amber-500 text-emerald-950 flex items-center justify-center font-bold">
                <Store className="h-5 w-5" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                VYPAAR SAATHI
              </span>
            </div>
            <p className="text-xs text-emerald-200 leading-relaxed">
              Empowering rural micro-entrepreneurs across Bharat with hyper-local business intelligence, bankable loan structuring, and direct government scheme access.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
              <ShieldCheck className="h-4 w-4" /> 100% Private & Safe Local Processing
            </div>
          </div>

          {/* Quick Module Navigation */}
          <div>
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-3">
              Application Modules
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200">
              <li>
                <button onClick={() => setActiveTab('profile')} className="hover:text-white hover:underline">
                  Business Profile Builder
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('analyze')} className="hover:text-white hover:underline">
                  Hyper-Local Market Analysis
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('financial-plan')} className="hover:text-white hover:underline">
                  Financial Calculator & Loan Plan
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('risk-analysis')} className="hover:text-white hover:underline">
                  Risk Assessment & Sensitivity
                </button>
              </li>
            </ul>
          </div>

          {/* Schemes & Advisory */}
          <div>
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-3">
              Resources & Advisory
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200">
              <li>
                <button onClick={() => setActiveTab('schemes')} className="hover:text-white hover:underline">
                  PM MUDRA & PMFME Schemes
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('advisor')} className="hover:text-white hover:underline">
                  Interactive Voice AI Advisor
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('action-plan')} className="hover:text-white hover:underline">
                  30-60-90 Day Action Roadmap
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('expert-session')} className="hover:text-white hover:underline">
                  Book 1-on-1 Expert Guidance
                </button>
              </li>
            </ul>
          </div>

          {/* Helpline & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
              Rural Entrepreneur Support
            </h4>
            <div className="bg-emerald-900/80 border border-emerald-700/60 rounded-xl p-3">
              <p className="text-[11px] text-emerald-300">Toll-Free Helpline (Mon-Sat 9AM-6PM)</p>
              <p className="text-lg font-bold text-amber-300 flex items-center gap-2 mt-1">
                <PhoneCall className="h-5 w-5 text-amber-400" /> 1800-VYPAAR-SAATHI
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-300">
              <Award className="h-4 w-4 text-amber-400" /> Recognized by Rural MSME Advisory Body
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400 gap-3">
          <p>© 2026 VYPAAR SAATHI. Built for Bharat's Ambitious Micro-Entrepreneurs.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3.5 w-3.5 text-red-400 fill-red-400" /> for Rural Business Growth
          </p>
        </div>
      </div>
    </footer>
  );
};
