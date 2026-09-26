import React, { useState, useRef, useEffect } from 'react';
import { useApp, ActiveTab } from '../context/AppContext';
import { Logo } from './Logo';
import {
  Home,
  TrendingUp,
  Calculator,
  ShieldAlert,
  Landmark,
  CheckSquare,
  Users,
  Menu,
  X,
  Globe,
  ChevronDown,
  Check,
  Sun,
  Moon,
  MapPin,
  Briefcase,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, profile, language, setLanguage, theme, toggleTheme } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // All navigation items directly in the main navigation bar (no "More" dropdown)
  const navItems: {
    id: ActiveTab;
    label: string;
    shortLabel: string;
    icon: React.ElementType;
  }[] = [
    { id: 'home', label: 'Home', shortLabel: 'Home', icon: Home },
    { id: 'analyze', label: 'Market Analysis', shortLabel: 'Market', icon: TrendingUp },
    { id: 'financial-plan', label: 'Finance & Loan', shortLabel: 'Finance', icon: Calculator },
    { id: 'schemes', label: 'Govt Schemes', shortLabel: 'Schemes', icon: Landmark },
    { id: 'risk-analysis', label: 'Risk Matrix', shortLabel: 'Risk', icon: ShieldAlert },
    { id: 'action-plan', label: 'Action Plan', shortLabel: 'Action Plan', icon: CheckSquare },
    { id: 'expert-session', label: 'Mentors', shortLabel: 'Mentors', icon: Users },
  ];

  const languageOptions = [
    { id: 'English' as const, nativeLabel: 'English', code: 'EN' },
    { id: 'Hindi' as const, nativeLabel: 'हिन्दी', code: 'HI' },
    { id: 'Marathi' as const, nativeLabel: 'मराठी', code: 'MR' },
  ];

  const currentLang = languageOptions.find((l) => l.id === language) || languageOptions[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 shadow-xs transition-colors duration-200 w-full max-w-full">
      <div className="max-w-[1820px] w-full mx-auto px-2 sm:px-4 lg:px-3 xl:px-5 2xl:px-8">
        <div className="flex items-center justify-between h-15 sm:h-16 gap-1.5 sm:gap-2 2xl:gap-4">
          
          {/* Reduced Size Brand Logo */}
          <div
            className="cursor-pointer group shrink-0"
            onClick={() => setActiveTab('home')}
            title="VYPAAR SAATHI — Rural AI Platform"
          >
            <Logo size="sm" showTagline={false} />
          </div>

          {/* Desktop Main Navigation Bar (All items direct, No "More" dropdown, No Profile in middle, No AI Advisor) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 shrink min-w-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={item.label}
                  className={`relative flex items-center gap-1 xl:gap-1.5 px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-xl text-xs 2xl:text-[13px] font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-800/20 dark:bg-emerald-600'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 2xl:h-4 2xl:w-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span className="hidden 2xl:inline whitespace-nowrap">{item.label}</span>
                  <span className="2xl:hidden whitespace-nowrap">{item.shortLabel}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Theme, Language Dropdown ("Dropbox"), and Profile Picture in Corner */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-1.5 xl:p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-emerald-50 dark:hover:bg-slate-700 hover:border-emerald-300 dark:hover:border-slate-600 transition-all hover:scale-105 cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-400 animate-spin-once" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </button>

            {/* Language Dropdown ("Dropbox") */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 xl:gap-1.5 px-2 xl:px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-700 hover:border-emerald-300 dark:hover:border-slate-600 transition-all text-xs font-semibold cursor-pointer shadow-2xs"
                title="Select Language"
                aria-haspopup="listbox"
                aria-expanded={langDropdownOpen}
              >
                <Globe className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-bold text-[11px] xl:text-xs">{currentLang.nativeLabel}</span>
                <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-1.5 z-50 animate-fadeIn backdrop-blur-md">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 mb-1">
                    Select Language / भाषा
                  </div>
                  {languageOptions.map((opt) => {
                    const isSelected = language === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setLanguage(opt.id);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-bold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                            {opt.code}
                          </span>
                          <span>{opt.nativeLabel}</span>
                        </div>
                        {isSelected && <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Profile Picture in the Corner */}
            <button
              onClick={() => setActiveTab('profile')}
              className={`relative group p-0.5 rounded-full border-2 transition-all shrink-0 cursor-pointer ${
                activeTab === 'profile'
                  ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                  : 'border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:scale-105'
              }`}
              title={`Profile: ${profile.name} (${profile.district})`}
              aria-label="User Profile"
            >
              <div className="h-8 w-8 2xl:h-8.5 2xl:w-8.5 rounded-full overflow-hidden bg-gradient-to-tr from-emerald-700 via-emerald-600 to-green-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  profile.name ? profile.name[0].toUpperCase() : 'U'
                )}
              </div>
              <span className="absolute bottom-0 right-0 h-2 w-2 2xl:h-2.5 2xl:w-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-2xs"></span>
            </button>
          </div>

          {/* Mobile & Tablet Controls (Visible below lg) */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-amber-400"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Mobile Profile Avatar */}
            <button
              onClick={() => setActiveTab('profile')}
              aria-label="Go to profile"
              className="h-8.5 w-8.5 rounded-full overflow-hidden border border-emerald-400 dark:border-emerald-600 shadow-xs flex items-center justify-center bg-gradient-to-tr from-emerald-600 to-green-600 text-white font-bold text-xs"
            >
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                profile.name ? profile.name[0].toUpperCase() : 'U'
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="h-6 w-6 text-red-500" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/98 dark:bg-slate-900/98 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-fadeIn backdrop-blur-lg">
          
          {/* Active Profile Header Card in Mobile Drawer */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50/50 dark:from-slate-800 dark:via-emerald-950/40 dark:to-slate-800 border border-emerald-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shadow-xs border border-emerald-300 dark:border-emerald-600">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  profile.name ? profile.name[0].toUpperCase() : 'U'
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{profile.name}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">
                  <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3 text-emerald-600" /> {profile.district}, {profile.state}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5"><Briefcase className="h-3 w-3 text-amber-600" /> {profile.businessCategory}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveTab('profile');
                setMobileOpen(false);
              }}
              className="px-2.5 py-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-700 border border-emerald-300 dark:border-slate-600 rounded-lg shadow-2xs cursor-pointer hover:bg-emerald-50 dark:hover:bg-slate-600"
            >
              Edit
            </button>
          </div>

          {/* Language Selector in Drawer */}
          <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-emerald-600" /> Select Language:
            </span>
            <div className="flex gap-1">
              {(['Hindi', 'Marathi', 'English'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    language === lang
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  {lang === 'Hindi' ? 'हिन्दी' : lang === 'Marathi' ? 'मराठी' : 'EN'}
                </button>
              ))}
            </div>
          </div>

          {/* Nav Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-amber-300' : 'text-slate-500 dark:text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      )}
    </header>
  );
};
