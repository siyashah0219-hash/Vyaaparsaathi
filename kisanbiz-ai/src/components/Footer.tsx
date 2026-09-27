import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { PhoneCall, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, t } = useApp();

  return (
    <footer className="mt-8 border-t border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md text-slate-600 dark:text-slate-400 py-5 transition-colors">
      <div className="max-w-[1820px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand & Compact Tagline */}
          <div className="flex items-center gap-3">
            <div className="cursor-pointer" onClick={() => setActiveTab('home')}>
              <Logo size="sm" showTagline={false} />
            </div>
            <span className="hidden sm:inline-block h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Horizontal Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setActiveTab('home')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => setActiveTab('analyze')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {t('nav.analyze')}
            </button>
            <button
              onClick={() => setActiveTab('financial-plan')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {t('nav.financialPlan')}
            </button>
            <button
              onClick={() => setActiveTab('schemes')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {t('nav.schemes')}
            </button>
            <button
              onClick={() => setActiveTab('advisor')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {t('nav.advisor')}
            </button>
            <button
              onClick={() => setActiveTab('expert-session')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {t('nav.expertSession')}
            </button>
          </nav>

          {/* Helpline & Security Badges */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold">
              <PhoneCall className="h-3 w-3 text-emerald-600" />
              <span>1800-VYPAAR-SAATHI</span>
            </div>
            <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>100% Private Local Engine</span>
            </div>
          </div>

        </div>

        {/* Compact Bottom Line */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 gap-2">
          <p>{t('footer.copyright')}</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> for Bharat's Rural Micro-Entrepreneurs
          </p>
        </div>
      </div>
    </footer>
  );
};
