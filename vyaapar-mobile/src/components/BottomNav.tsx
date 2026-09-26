import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  TrendingUp,
  Calculator,
  Landmark,
  Bot,
  Sparkles,
} from 'lucide-react';
import { MobileTab } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems: { id: MobileTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'mandi', label: 'Mandi', icon: TrendingUp },
    { id: 'finance', label: 'Finance', icon: Calculator },
    { id: 'schemes', label: 'Schemes', icon: Landmark },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-nav border-t border-slate-200/90 dark:border-slate-800/90 px-3 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[max(0.375rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between max-w-md mx-auto relative">
        
        {/* Left 2 items */}
        {navItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all touch-bounce ${
                isActive
                  ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-xl transition-transform ${isActive ? 'scale-110 bg-emerald-50 dark:bg-emerald-950/60' : ''}`}>
                <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}

        {/* Center Prominent AI Saathi Button */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-6">
          <div className="relative group">
            {/* Glowing Aura Ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 via-green-400 to-amber-400 opacity-80 blur-sm animate-pulse-glow"></div>
            
            <button
              onClick={() => setActiveTab('ai-chat')}
              className={`relative h-13 w-13 rounded-full flex items-center justify-center text-white shadow-xl transition-all touch-bounce ${
                activeTab === 'ai-chat'
                  ? 'bg-amber-500 ring-4 ring-emerald-600/40 text-emerald-950'
                  : 'bg-gradient-to-tr from-emerald-800 via-emerald-600 to-green-500'
              }`}
              aria-label="Open AI Advisor"
            >
              <Bot className="h-6 w-6 stroke-[2.2]" />
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber-400 border-2 border-white dark:border-slate-900 flex items-center justify-center animate-bounce">
                <Sparkles className="h-2 w-2 text-emerald-950" />
              </div>
            </button>
          </div>
          <span className={`text-[10px] mt-1 font-bold ${activeTab === 'ai-chat' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-800 dark:text-emerald-300'}`}>
            AI Saathi
          </span>
        </div>

        {/* Right 2 items */}
        {navItems.slice(2, 4).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all touch-bounce ${
                isActive
                  ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-xl transition-transform ${isActive ? 'scale-110 bg-emerald-50 dark:bg-emerald-950/60' : ''}`}>
                <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}

      </div>
    </nav>
  );
};
