import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Globe,
  Bell,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { Language } from '../types';

export const MobileHeader: React.FC = () => {
  const { profile, language, setLanguage, setActiveTab, unreadNotifications } = useApp();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages: Language[] = ['English', 'Hindi', 'Marathi'];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-3.5 py-2.5 transition-colors">
      <div className="flex items-center justify-between gap-2">
        {/* Brand & Location */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer touch-bounce"
        >
          <div className="relative h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-800 to-green-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/20">
            <span className="font-serif font-black text-lg text-amber-300">V</span>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900"></span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-black text-xs tracking-tight text-emerald-950 dark:text-emerald-300">
                VYPAAR SAATHI
              </span>
              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-400 text-emerald-950">
                AI
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
              <MapPin className="h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate max-w-[120px] font-semibold text-slate-700 dark:text-slate-300">
                {profile.villageCity || profile.district}, {profile.state.slice(0, 2)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Action Icons: Language, Dark mode, Avatar */}
        <div className="flex items-center gap-1.5">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu((prev) => !prev)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold touch-bounce"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{language === 'English' ? 'EN' : language === 'Hindi' ? 'हिं' : 'मरा'}</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 top-full mt-1.5 w-32 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50 animate-pop-in">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLanguage(l);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold flex items-center justify-between ${
                      language === l
                        ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{l === 'English' ? 'English' : l === 'Hindi' ? 'हिन्दी' : 'मराठी'}</span>
                    {language === l && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <button
            onClick={() => setActiveTab('profile')}
            className="relative h-8 w-8 rounded-full border-2 border-emerald-600 overflow-hidden shrink-0 touch-bounce shadow-xs"
          >
            <img
              src={profile.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80'}
              alt={profile.name}
              className="h-full w-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
