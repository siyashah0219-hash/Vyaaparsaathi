import React from 'react';
import { useApp } from '../context/AppContext';
import { generateHyperLocalAnalysis } from '../data/mockData';
import {
  TrendingUp,
  Calculator,
  Landmark,
  CheckSquare,
  Users,
  Store,
  ArrowRight,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Building2,
  IndianRupee,
  Calendar,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { profile, financialResult, financialInput, setActiveTab, actionTasks } = useApp();
  const analysis = generateHyperLocalAnalysis(profile);

  const completedTasks = actionTasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedTasks / actionTasks.length) * 100);

  const quickActions = [
    { id: 'mandi', label: 'Live Mandi', desc: 'Local crop rates', icon: Store, color: 'from-amber-500 to-orange-600', badge: 'Live Feed' },
    { id: 'finance', label: 'Loan & EMI', desc: 'Bank calculator', icon: Calculator, color: 'from-emerald-600 to-teal-700', badge: 'MUDRA Ready' },
    { id: 'schemes', label: 'Govt Schemes', desc: '35% subsidies', icon: Landmark, color: 'from-blue-600 to-indigo-700', badge: 'Matched' },
    { id: 'roadmap', label: 'Action Plan', desc: `${completedTasks}/${actionTasks.length} done`, icon: CheckSquare, color: 'from-purple-600 to-violet-800', badge: `${progressPercent}%` },
    { id: 'mentors', label: 'Expert Help', desc: '1-on-1 advice', icon: Users, color: 'from-rose-600 to-pink-700', badge: 'Verified' },
  ];

  return (
    <div className="space-y-4 px-3.5 pt-3 pb-24 animate-fade-in-up">
      
      {/* Farmer Business Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-950 p-5 text-white shadow-xl border border-emerald-700/60">
        {/* Ambient background glow */}
        <div className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-emerald-500/20 blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-amber-500/20 blur-2xl"></div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 bg-amber-400/20 border border-amber-300/40 px-2.5 py-0.5 rounded-full">
              {profile.businessType === 'new' ? 'New Unit Setup' : 'Existing Unit'}
            </span>
            <span className="text-[11px] text-emerald-200 font-semibold">
              {profile.villageCity || profile.district}
            </span>
          </div>

          <div>
            <h1 className="font-serif text-2xl font-bold text-white tracking-tight">
              Namaskar, {profile.name.split(' ')[0]} ji 🙏
            </h1>
            <p className="text-xs text-emerald-100 font-medium mt-0.5">
              {profile.businessCategory}
            </p>
          </div>

          {/* Quick Metrics Bar inside card */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-700/60 text-center">
            <div className="bg-emerald-950/60 rounded-xl p-2 border border-emerald-600/40">
              <span className="text-[10px] text-emerald-300 block font-medium">Own Capital</span>
              <span className="font-serif text-sm font-bold text-white">
                ₹{profile.capital.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="bg-emerald-950/60 rounded-xl p-2 border border-emerald-600/40">
              <span className="text-[10px] text-emerald-300 block font-medium">Bank EMI</span>
              <span className="font-serif text-sm font-bold text-amber-300">
                ₹{financialResult.monthlyEMI.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="bg-emerald-950/60 rounded-xl p-2 border border-emerald-600/40">
              <span className="text-[10px] text-emerald-300 block font-medium">DSCR Score</span>
              <span className="font-serif text-sm font-bold text-emerald-400">
                {financialResult.dscr}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Quick Modules
          </h2>
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
            Touch to Open
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {quickActions.slice(0, 4).map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                onClick={() => setActiveTab(action.id as any)}
                className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between space-y-2 cursor-pointer touch-bounce transition-all hover:border-emerald-400"
              >
                <div className="flex items-center justify-between">
                  <div className={`h-9 w-9 rounded-xl bg-gradient-to-tr ${action.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.5 rounded">
                    {action.badge}
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {action.label}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {action.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Demand & Setup Cost Snapshot */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-serif text-sm font-bold text-slate-900 dark:text-slate-100">
                Market Demand in {profile.district}
              </h3>
              <p className="text-[10px] text-slate-500">Based on local Mandi & consumer data</p>
            </div>
          </div>
          <span className="font-serif text-xl font-bold text-emerald-700 dark:text-emerald-400">
            {analysis.customerDemandScore}<span className="text-xs text-slate-400">/100</span>
          </span>
        </div>

        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"
            style={{ width: `${analysis.customerDemandScore}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700">
            <span className="text-[10px] text-slate-500 block">Est. Setup Cost</span>
            <strong className="font-serif text-slate-900 dark:text-slate-100">
              ₹{analysis.setupCostEstimate.toLocaleString('en-IN')}
            </strong>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700">
            <span className="text-[10px] text-slate-500 block">Monthly Expense</span>
            <strong className="font-serif text-slate-900 dark:text-slate-100">
              ₹{analysis.monthlyOperatingCost.toLocaleString('en-IN')}
            </strong>
          </div>
        </div>
      </div>

      {/* Roadmap Progress Pill Banner */}
      <div
        onClick={() => setActiveTab('roadmap')}
        className="bg-gradient-to-r from-amber-500/15 via-amber-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-3.5 border border-amber-300 dark:border-slate-700 flex items-center justify-between cursor-pointer touch-bounce shadow-2xs"
      >
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-amber-500 text-emerald-950 flex items-center justify-center font-bold shadow-xs shrink-0">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
              30-60-90 Day Execution Roadmap
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              {completedTasks} of {actionTasks.length} tasks completed ({progressPercent}%)
            </p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-slate-500" />
      </div>

      {/* Call Expert / Mentors Banner */}
      <div
        onClick={() => setActiveTab('mentors')}
        className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer touch-bounce shadow-2xs"
      >
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-400 flex items-center justify-center font-bold shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Talk to Agriculture Business Mentors
            </h4>
            <p className="text-[11px] text-slate-500">
              Book a 1-on-1 call with verified specialists
            </p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-slate-500" />
      </div>

      {/* Kisan Call Center Helpline Button */}
      <a
        href="tel:18001801551"
        className="w-full bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl py-3 px-4 flex items-center justify-center gap-2 text-xs font-bold shadow-md touch-bounce"
      >
        <PhoneCall className="h-4 w-4 text-amber-400" />
        <span>Toll-Free Kisan Call Center: 1800-180-1551</span>
      </a>

    </div>
  );
};
