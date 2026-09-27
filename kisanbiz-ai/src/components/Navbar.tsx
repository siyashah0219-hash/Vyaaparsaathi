import React, { useState, useRef, useEffect } from 'react';
import { useApp, ActiveTab } from '../context/AppContext';
import { Logo } from './Logo';
import {
  Home,
  TrendingUp,
  Calculator,
  Landmark,
  ShieldAlert,
  CheckSquare,
  Users,
  Globe,
  Menu,
  X,
  ChevronDown,
  Check,
  MapPin,
  Briefcase,
  LogOut,
  LogIn,
  User,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    profile,
    language,
    setLanguage,
    isLoggedIn,
    logout,
    openAuthModal,
    t,
  } = useApp();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const langDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (langDropdownRef.current && !langDropdownRef.current.contains(target)) {
        setLangDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dynamic navigation items translated in real-time
  const navItems: {
    id: ActiveTab;
    label: string;
    shortLabel: string;
    icon: React.ElementType;
  }[] = [
    { id: 'home', label: t('nav.home'), shortLabel: t('nav.short.home'), icon: Home },
    { id: 'analyze', label: t('nav.analyze'), shortLabel: t('nav.short.analyze'), icon: TrendingUp },
    { id: 'financial-plan', label: t('nav.financialPlan'), shortLabel: t('nav.short.financialPlan'), icon: Calculator },
    { id: 'schemes', label: t('nav.schemes'), shortLabel: t('nav.short.schemes'), icon: Landmark },
    { id: 'risk-analysis', label: t('nav.riskAnalysis'), shortLabel: t('nav.short.riskAnalysis'), icon: ShieldAlert },
    { id: 'action-plan', label: t('nav.actionPlan'), shortLabel: t('nav.short.actionPlan'), icon: CheckSquare },
    { id: 'expert-session', label: t('nav.expertSession'), shortLabel: t('nav.short.expertSession'), icon: Users },
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
          
          {/* Brand Logo */}
          <div
            className="cursor-pointer group shrink-0"
            onClick={() => setActiveTab('home')}
            title="VYPAAR SAATHI — Rural AI Platform"
          >
            <Logo size="sm" showTagline={false} />
          </div>

          {/* Desktop Main Navigation Bar */}
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

          {/* Right Action Controls: Live Language Dropdown and Profile/Auth */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
            {/* Live Language Dropdown ("Dropbox") */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 xl:gap-1.5 px-2 xl:px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-700 hover:border-emerald-300 dark:hover:border-slate-600 transition-all text-xs font-semibold cursor-pointer shadow-2xs"
                title="Select Language / भाषा चुनें"
                aria-haspopup="listbox"
                aria-expanded={langDropdownOpen}
              >
                <Globe className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-bold text-[11px] xl:text-xs">{currentLang.nativeLabel}</span>
                <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-1.5 z-50 animate-fadeIn backdrop-blur-md">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 mb-1 flex items-center justify-between">
                    <span>{t('action.selectLanguage')}</span>
                    <span className="text-emerald-600 text-[9px] font-bold">LIVE</span>
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

            {/* Profile Avatar / Login & Logout Menu in the Corner */}
            <div className="relative" ref={profileDropdownRef}>
              {isLoggedIn ? (
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className={`relative group p-0.5 rounded-full border-2 transition-all shrink-0 cursor-pointer ${
                    activeTab === 'profile' || profileDropdownOpen
                      ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                      : 'border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:scale-105'
                  }`}
                  title={`Account: ${profile.name} (Click for Menu & Logout)`}
                  aria-label="User Account Menu"
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
              ) : (
                <button
                  onClick={openAuthModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-600 hover:to-green-500 text-white text-xs font-bold shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span>{t('action.login')}</span>
                </button>
              )}

              {/* User Account & Logout Dropdown Menu */}
              {profileDropdownOpen && isLoggedIn && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-fadeIn backdrop-blur-md">
                  {/* User Profile Card */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700 mb-1.5">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {profile.name}
                    </p>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium truncate mt-0.5">
                      {profile.businessCategory}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                      <span className="truncate">{profile.district}, {profile.state}</span>
                    </p>
                  </div>

                  {/* Menu Options */}
                  <div className="space-y-0.5">
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                    >
                      <User className="h-4 w-4 text-emerald-600" />
                      <span>{t('action.editProfile')}</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('financial-plan');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                    >
                      <Calculator className="h-4 w-4 text-teal-600" />
                      <span>{t('nav.financialPlan')}</span>
                    </button>

                    <button
                      onClick={() => {
                        openAuthModal();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                    >
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      <span>{t('action.switchAccount')}</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 my-1 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 text-red-500" />
                      <span>{t('action.logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile & Tablet Controls (Visible below lg) */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Profile / Login Button */}
            {isLoggedIn ? (
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
            ) : (
              <button
                onClick={openAuthModal}
                className="p-2 rounded-xl bg-emerald-700 text-white text-xs font-bold"
                aria-label="Log in"
              >
                <LogIn className="h-4 w-4" />
              </button>
            )}

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
          
          {/* Active Profile or Guest Card in Mobile Drawer */}
          {isLoggedIn ? (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50/50 dark:from-slate-800 dark:via-emerald-950/40 dark:to-slate-800 border border-emerald-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shadow-xs border border-emerald-300 dark:border-emerald-600 shrink-0">
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
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{profile.name}</p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 truncate">
                    <span className="flex items-center gap-0.5 truncate"><MapPin className="h-3 w-3 text-emerald-600 shrink-0" /> {profile.district}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 truncate"><Briefcase className="h-3 w-3 text-amber-600 shrink-0" /> {profile.businessCategory}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setMobileOpen(false);
                  }}
                  className="px-2.5 py-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-700 border border-emerald-300 dark:border-slate-600 rounded-lg shadow-2xs cursor-pointer hover:bg-emerald-50"
                >
                  {t('action.editProfile')}
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="p-1 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 rounded-lg"
                  title="Log out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{t('action.guest')}</p>
                <p className="text-[10px] text-slate-500">Sign in to save custom financial plans</p>
              </div>
              <button
                onClick={() => {
                  openAuthModal();
                  setMobileOpen(false);
                }}
                className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>{t('action.login')}</span>
              </button>
            </div>
          )}

          {/* Language Selector in Drawer */}
          <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-emerald-600" /> {t('action.selectLanguage')}:
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

          {/* Mobile Logout Button at Bottom of Drawer */}
          {isLoggedIn && (
            <button
              onClick={() => {
                logout();
                setMobileOpen(false);
              }}
              className="w-full mt-2 py-2.5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/80 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>{t('action.logout')}</span>
            </button>
          )}

        </div>
      )}
    </header>
  );
};
