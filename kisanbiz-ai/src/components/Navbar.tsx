import React, { useState } from 'react';
import { useApp, ActiveTab } from '../context/AppContext';
import {
  Store,
  Home,
  UserCheck,
  TrendingUp,
  Calculator,
  ShieldAlert,
  Landmark,
  MessageSquare,
  CheckSquare,
  Users,
  Menu,
  X,
  Globe,
  ChevronRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, profile, language, setLanguage } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profile', label: 'Business Profile', icon: UserCheck },
    { id: 'analyze', label: 'Local Analysis', icon: TrendingUp },
    { id: 'financial-plan', label: 'Financial Plan', icon: Calculator },
    { id: 'risk-analysis', label: 'Risk Analysis', icon: ShieldAlert },
    { id: 'schemes', label: 'Govt Schemes', icon: Landmark },
    { id: 'advisor', label: 'AI Advisor', icon: MessageSquare },
    { id: 'action-plan', label: 'Action Plan', icon: CheckSquare },
    { id: 'expert-session', label: 'Expert Session', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Store className="h-6 w-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-emerald-950">
                  VYPAAR SAATHI
                </span>
                <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Rural AI
                </span>
              </div>
              <p className="text-[11px] font-semibold text-emerald-700 tracking-wide uppercase">
                Hyper-Local Business & Finance Assistant
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-900'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-amber-300' : 'text-emerald-600'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Language & Profile Quick Pill */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-lg p-1 text-xs">
              <Globe className="h-3.5 w-3.5 text-amber-700 ml-1" />
              {(['Hindi', 'Marathi', 'English'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold transition-colors ${
                    language === lang
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-amber-900 hover:bg-amber-100'
                  }`}
                >
                  {lang === 'Hindi' ? 'हिन्दी' : lang === 'Marathi' ? 'मराठी' : 'EN'}
                </button>
              ))}
            </div>

            {/* Profile Quick Pill */}
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl px-3 py-1.5 transition-colors"
            >
              <div className="h-7 w-7 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                {profile.name ? profile.name[0].toUpperCase() : 'U'}
              </div>
              <div className="text-left text-xs">
                <p className="font-bold text-emerald-950 truncate max-w-[100px]">{profile.name}</p>
                <p className="text-[10px] text-emerald-700">{profile.district || 'Location'}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-emerald-600" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => setActiveTab('profile')}
              className="sm:hidden h-8 w-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center"
            >
              {profile.name ? profile.name[0].toUpperCase() : 'U'}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 border border-gray-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-b border-amber-200 px-4 pt-2 pb-4 space-y-1 shadow-lg animate-fadeIn">
          <div className="flex items-center justify-between p-2 mb-2 bg-amber-50 rounded-lg border border-amber-200">
            <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-amber-700" /> Select Language:
            </span>
            <div className="flex gap-1">
              {(['Hindi', 'Marathi', 'English'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                  }}
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    language === lang
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  {lang === 'Hindi' ? 'हिन्दी' : lang === 'Marathi' ? 'मराठी' : 'EN'}
                </button>
              ))}
            </div>
          </div>

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
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-emerald-800 text-white'
                    : 'text-gray-700 hover:bg-emerald-50'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-amber-300' : 'text-emerald-600'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
