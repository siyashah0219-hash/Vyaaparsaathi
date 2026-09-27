import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { PhoneCall, Heart, ShieldCheck, Award, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, t } = useApp();

  return (
    <footer className="mt-14 border-t-2 border-emerald-600/30 dark:border-emerald-500/20 bg-emerald-950/95 dark:bg-slate-950 text-emerald-100 dark:text-slate-300 pt-12 pb-8 transition-colors">
      <div className="max-w-[1820px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10 border-b border-emerald-800/60 dark:border-slate-800">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="cursor-pointer" onClick={() => setActiveTab('home')}>
              <Logo size="md" showTagline={false} className="[&_span]:text-white" />
            </div>
            <p className="text-xs sm:text-sm text-emerald-200/90 dark:text-slate-400 leading-relaxed">
              Empowering rural micro-entrepreneurs across Bharat with hyper-local business intelligence, bankable loan structuring, and direct government scheme access.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>100% Private & Safe Local Processing</span>
            </div>
          </div>

          {/* Col 2: Core Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {t('footer.modules')}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-200/80 dark:text-slate-400">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-white dark:hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="hover:text-white dark:hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  {t('nav.profile')} & Setup
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('analyze')}
                  className="hover:text-white dark:hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  {t('nav.analyze')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('financial-plan')}
                  className="hover:text-white dark:hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  {t('nav.financialPlan')} & Loan Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('risk-analysis')}
                  className="hover:text-white dark:hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  {t('nav.riskAnalysis')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Schemes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {t('footer.resources')}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-200/80 dark:text-slate-400">
              <li>
                <button
                  onClick={() => setActiveTab('schemes')}
                  className="hover:text-white dark:hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  {t('nav.schemes')} (PM MUDRA & PMFME)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('advisor')}
                  className="hover:text-white dark:hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  {t('nav.advisor')} (Voice & Text)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('action-plan')}
                  className="hover:text-white dark:hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  {t('nav.actionPlan')} (30-60-90 Days)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('expert-session')}
                  className="hover:text-white dark:hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  {t('nav.expertSession')} (Mentorship)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Toll-Free Helpline & Support Card */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {t('footer.helpline')}
            </h4>
            <div className="p-4 rounded-2xl bg-emerald-900/70 dark:bg-slate-900 border border-emerald-700/50 dark:border-slate-800 space-y-2">
              <p className="text-[11px] text-emerald-300/90 dark:text-slate-400">
                Grassroots Rural Entrepreneur Support (Mon–Sat 9AM–6PM)
              </p>
              <div className="flex items-center gap-2 font-bold text-base sm:text-lg text-amber-300">
                <PhoneCall className="h-5 w-5 text-amber-400 shrink-0" />
                <span>1800-VYPAAR-SAATHI</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-300 dark:text-slate-400 pt-1">
              <Award className="h-4 w-4 text-amber-400 shrink-0" />
              <span>Recognized by Rural MSME Advisory Bodies</span>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/80 dark:text-slate-500 gap-3">
          <p>{t('footer.copyright')}</p>
          <p className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 text-rose-400 fill-rose-400" />
            <span>for Bharat's Rural Micro-Entrepreneurs</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
