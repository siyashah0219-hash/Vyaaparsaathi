import React from 'react';
import { useApp } from '../context/AppContext';
import { LiveMarketTicker } from '../components/LiveMarketTicker';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import {
  Rocket,
  Building2,
  Landmark,
  Calculator,
  MessageSquare,
  Users,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  Briefcase,
  IndianRupee,
  Layers,
  PhoneCall,
  Activity,
  Award,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActiveTab, profile, updateProfile, financialResult, t } = useApp();

  const handleStartNew = () => {
    updateProfile({ businessType: 'new' });
    setActiveTab('profile');
  };

  const handleAnalyzeExisting = () => {
    updateProfile({ businessType: 'existing' });
    setActiveTab('profile');
  };

  return (
    <div className="space-y-8 sm:space-y-12 animate-fade-in-up">
      
      {/* Live Market & Mandi Animated Ticker Banner */}
      <div className="rounded-2xl overflow-hidden shadow-sm animate-pop-in">
        <LiveMarketTicker />
      </div>

      {/* Hero Section with Rich Dynamic Motion */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-950 text-white p-5 sm:p-7 lg:p-9 2xl:p-12 shadow-2xl border border-emerald-700/50">
        
        {/* Animated Background Decorative Blobs */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl pointer-events-none animate-float" />
        <div className="absolute right-20 -bottom-20 w-96 h-96 rounded-full bg-emerald-500/25 blur-3xl pointer-events-none animate-float-reverse" />
        <div className="absolute left-1/3 top-1/2 w-64 h-64 rounded-full bg-teal-400/10 blur-2xl pointer-events-none animate-pulse-glow" />

        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-6 2xl:gap-10 items-center">
          
          {/* Left Column (7 cols on widescreen) */}
          <div className="xl:col-span-7 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-bold uppercase tracking-wider animate-pop-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
              <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-spin-slow" /> Rural Business Advisory Engine
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight text-white leading-tight">
              From Business Idea to <br />
              <span className="text-amber-400 drop-shadow-sm">Business Growth.</span>
            </h1>

            <p className="text-emerald-100 text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl">
              <strong className="text-white font-semibold">VYPAAR SAATHI</strong> is your AI-driven hyper-local business advisory & financial structuring assistant. We analyze village market demand, calculate bankable budget plans, match government schemes (PM MUDRA, PMFME), and connect you with 1-on-1 experts.
            </p>

            {/* Core CTAs Row with Shimmer Animation */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleStartNew}
                className="shimmer-btn inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-6 py-3.5 rounded-xl shadow-xl shadow-amber-400/25 transition-all hover:-translate-y-1 hover:scale-105 active:scale-95 text-sm cursor-pointer group"
              >
                <Rocket className="h-4 w-4 transition-transform group-hover:rotate-12" /> Start a New Business
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleAnalyzeExisting}
                className="inline-flex items-center gap-2 bg-emerald-800/80 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl border border-emerald-600/80 transition-all hover:-translate-y-1 hover:scale-105 active:scale-95 text-sm cursor-pointer group shadow-lg"
              >
                <Building2 className="h-4 w-4 text-amber-300 transition-transform group-hover:scale-110" /> Analyze My Existing Business
              </button>
            </div>

            {/* Live Impact Statistics Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-emerald-800/60">
              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40">
                <p className="text-lg sm:text-xl font-extrabold text-amber-300">
                  <AnimatedCounter value={45000} prefix="₹" suffix="+" />
                </p>
                <p className="text-[10px] text-emerald-200 uppercase font-semibold">Avg Monthly Profit</p>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40">
                <p className="text-lg sm:text-xl font-extrabold text-emerald-300">
                  <AnimatedCounter value={8500} suffix="+" />
                </p>
                <p className="text-[10px] text-emerald-200 uppercase font-semibold">Kisan Guided</p>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40">
                <p className="text-lg sm:text-xl font-extrabold text-amber-300">
                  <AnimatedCounter value={94} suffix="%" />
                </p>
                <p className="text-[10px] text-emerald-200 uppercase font-semibold">Loan Feasibility</p>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40">
                <p className="text-lg sm:text-xl font-extrabold text-emerald-300">
                  <AnimatedCounter value={40} suffix="+" />
                </p>
                <p className="text-[10px] text-emerald-200 uppercase font-semibold">Matched Schemes</p>
              </div>
            </div>

            {/* Active Profile Status Badge */}
            {profile.name && (
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-emerald-200 bg-emerald-950/60 border border-emerald-700/60 rounded-2xl p-3.5 backdrop-blur-md hover-card-lift">
                <span className="flex items-center gap-1.5 font-bold text-amber-300">
                  <CheckCircle2 className="h-4 w-4 text-amber-400" /> Active Profile:
                </span>
                <span className="font-semibold text-white">{profile.name}</span>
                <span className="text-emerald-400">•</span>
                <span className="flex items-center gap-1 text-emerald-100">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400" /> {profile.villageCity || profile.district}, {profile.state}
                </span>
                <span className="text-emerald-400">•</span>
                <span className="flex items-center gap-1 text-emerald-100">
                  <Briefcase className="h-3.5 w-3.5 text-emerald-400" /> {profile.businessCategory}
                </span>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="ml-auto underline font-bold text-amber-300 hover:text-white cursor-pointer"
                >
                  Modify Profile
                </button>
              </div>
            )}
          </div>

          {/* Right Column: 1920x1080 Live Rural Business Intelligence Snapshot Panel */}
          <div className="hidden xl:flex xl:col-span-5 flex-col gap-4">
            <div className="bg-emerald-950/85 backdrop-blur-md border border-emerald-600/40 rounded-3xl p-6 shadow-2xl space-y-4 hover-card-lift">
              <div className="flex items-center justify-between border-b border-emerald-800/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Live Market & Bankability Dashboard
                  </span>
                </div>
                <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  {profile.district} APMC
                </span>
              </div>

              {/* 3 Metric Mini Cards with Animated Counters */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-emerald-900/50 border border-emerald-700/50 space-y-1 hover-card-lift">
                  <p className="text-[10px] uppercase font-bold text-emerald-300">Available Capital</p>
                  <p className="text-lg font-bold text-white">
                    <AnimatedCounter value={profile.capital} prefix="₹" />
                  </p>
                  <p className="text-[10px] text-emerald-400">Self-contribution margin</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-900/50 border border-emerald-700/50 space-y-1 hover-card-lift">
                  <p className="text-[10px] uppercase font-bold text-emerald-300">Bank DSCR Score</p>
                  <p className="text-lg font-bold text-emerald-300">
                    <AnimatedCounter value={Number(financialResult.dscr)} decimals={1} suffix="x" />
                  </p>
                  <p className="text-[10px] text-emerald-400">Healthy bankable ratio</p>
                </div>
              </div>

              {/* Top Govt Scheme Highlight Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent border border-amber-400/30 flex items-center justify-between gap-3 hover-card-lift">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Landmark className="h-4 w-4 text-amber-400" />
                    <p className="text-xs font-bold text-white">PM MUDRA + PMFME 35%</p>
                  </div>
                  <p className="text-[11px] text-emerald-200 mt-0.5">
                    Collateral-free loan up to ₹10L with credit subsidy
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('schemes')}
                  className="shimmer-btn px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-bold shrink-0 transition-all hover:scale-105 cursor-pointer shadow-md"
                >
                  Check Schemes
                </button>
              </div>

              {/* Quick AI Advisor Prompt */}
              <div
                onClick={() => setActiveTab('advisor')}
                className="cursor-pointer p-3 rounded-2xl bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-700/40 flex items-center justify-between text-xs transition-all group hover-card-lift"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-amber-400 transition-transform group-hover:scale-110" />
                  <span className="text-emerald-100 group-hover:text-white">Ask AI Saathi about local buyers in {profile.district}</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-amber-400 group-hover:translate-x-1.5 transition-transform" />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 6 Primary Working Functional Feature Cards */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 dark:text-slate-100">
              {t('home.whatToDo')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              {t('home.selectModule')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Card 1: Start a New Business */}
          <div
            onClick={handleStartNew}
            className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-amber-200 dark:border-amber-900/50 hover:border-amber-400 dark:hover:border-amber-500 shadow-sm hover:shadow-xl space-y-4 hover-card-lift animate-fade-in-up stagger-1 relative overflow-hidden"
          >
            <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 flex items-center justify-center font-bold group-hover:scale-120 group-hover:rotate-6 transition-all duration-300 shadow-sm">
              <Rocket className="h-6 w-6 text-amber-700 dark:text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                Step 1: Setup & Profile
              </span>
              <h3 className="font-serif text-xl font-bold text-emerald-950 dark:text-slate-100 mt-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                Start a New Business
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mt-1">
                Enter your location, budget, and business ideas to build a multi-step profile and generate localized market validation.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-emerald-800 dark:text-emerald-400 group-hover:text-emerald-900">
              Create New Business Profile <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Card 2: Analyze My Existing Business */}
          <div
            onClick={handleAnalyzeExisting}
            className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-500 dark:hover:border-emerald-400 shadow-sm hover:shadow-xl space-y-4 hover-card-lift animate-fade-in-up stagger-2 relative overflow-hidden"
          >
            <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 flex items-center justify-center font-bold group-hover:scale-120 group-hover:rotate-6 transition-all duration-300 shadow-sm">
              <Building2 className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                Hyper-Local Intelligence
              </span>
              <h3 className="font-serif text-xl font-bold text-emerald-950 dark:text-slate-100 mt-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                Analyze My Existing Business
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mt-1">
                Evaluate your village market demand, competitor density, customer segments, and local expansion opportunities.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-emerald-800 dark:text-emerald-400 group-hover:text-emerald-900">
              Run Local Market Analysis <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Card 3: Explore Government Schemes */}
          <div
            onClick={() => setActiveTab('schemes')}
            className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-900/50 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-xl space-y-4 hover-card-lift animate-fade-in-up stagger-3 relative overflow-hidden"
          >
            <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold group-hover:scale-120 group-hover:rotate-6 transition-all duration-300 shadow-sm">
              <Landmark className="h-6 w-6 text-blue-700 dark:text-blue-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                Loans & Subsidies
              </span>
              <h3 className="font-serif text-xl font-bold text-emerald-950 dark:text-slate-100 mt-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                Explore Government Schemes
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mt-1">
                Match your profile against PM MUDRA, PMFME, PMEGP & Stand-Up India schemes with eligibility checkers & application steps.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-blue-800 dark:text-blue-400 group-hover:text-blue-900">
              View Matched Schemes <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
          {/* Card 4: Calculate My Business Budget */}
          <div
            onClick={() => setActiveTab('financial-plan')}
            className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-900/50 hover:border-purple-400 dark:hover:border-purple-500 shadow-sm hover:shadow-xl space-y-4 hover-card-lift animate-fade-in-up stagger-4 relative overflow-hidden"
          >
            <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-300 flex items-center justify-center font-bold group-hover:scale-120 group-hover:rotate-6 transition-all duration-300 shadow-sm">
              <Calculator className="h-6 w-6 text-purple-700 dark:text-purple-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800">
                Bank-Ready Calculator
              </span>
              <h3 className="font-serif text-xl font-bold text-emerald-950 dark:text-slate-100 mt-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                Calculate My Business Budget
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mt-1">
                Calculate EMI, Break-Even sales, DSCR bank approval score, funding mix, and 6-month cash flow projections.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-purple-800 dark:text-purple-400 group-hover:text-purple-900">
              Open Financial Calculator <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Card 5: Talk to AI Advisor */}
          <div
            onClick={() => setActiveTab('advisor')}
            className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-teal-200 dark:border-teal-900/50 hover:border-teal-400 dark:hover:border-teal-500 shadow-sm hover:shadow-xl space-y-4 hover-card-lift animate-fade-in-up stagger-5 relative overflow-hidden"
          >
            <div className="h-12 w-12 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-900 dark:text-teal-300 flex items-center justify-center font-bold group-hover:scale-120 group-hover:rotate-6 transition-all duration-300 shadow-sm">
              <MessageSquare className="h-6 w-6 text-teal-700 dark:text-teal-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                Voice & Text Assistant
              </span>
              <h3 className="font-serif text-xl font-bold text-emerald-950 dark:text-slate-100 mt-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                Talk to AI Advisor
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mt-1">
                Ask questions in Hindi, Marathi, or English using voice mic or text. Get localized answers grounded in your business details.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-teal-800 dark:text-teal-400 group-hover:text-teal-900">
              Start Voice / Text Chat <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Card 6: Book Expert Session */}
          <div
            onClick={() => setActiveTab('expert-session')}
            className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-rose-200 dark:border-rose-900/50 hover:border-rose-400 dark:hover:border-rose-500 shadow-sm hover:shadow-xl space-y-4 hover-card-lift animate-fade-in-up stagger-6 relative overflow-hidden"
          >
            <div className="h-12 w-12 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-300 flex items-center justify-center font-bold group-hover:scale-120 group-hover:rotate-6 transition-all duration-300 shadow-sm">
              <Users className="h-6 w-6 text-rose-700 dark:text-rose-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                1-on-1 Guidance
              </span>
              <h3 className="font-serif text-xl font-bold text-emerald-950 dark:text-slate-100 mt-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                Book Expert Session
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mt-1">
                Schedule a 1-on-1 consultation with agri-business specialists, ex-NABARD bank managers, or SHG enterprise mentors.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-rose-800 dark:text-rose-400 group-hover:text-rose-900">
              Select Expert & Slot <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* User Journey Roadmap Visualization */}
      <section className="bg-emerald-50 dark:bg-slate-900/80 border border-emerald-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
            End-to-End Workflow
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 dark:text-slate-100 mt-2">
            The Complete VYPAAR SAATHI User Journey
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
            Follow this step-by-step path designed specifically for rural micro-entrepreneurs.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-8 gap-3 2xl:gap-4 pt-2">
          {[
            { step: '1', title: 'Business Profile', desc: '5-Step Form', tab: 'profile' },
            { step: '2', title: 'Local Analysis', desc: 'Market & Demand', tab: 'analyze' },
            { step: '3', title: 'Financial Plan', desc: 'EMI & Cash Flow', tab: 'financial-plan' },
            { step: '4', title: 'Risk Analysis', desc: 'Mitigation Matrix', tab: 'risk-analysis' },
            { step: '5', title: 'Govt Schemes', desc: 'MUDRA & PMFME', tab: 'schemes' },
            { step: '6', title: 'AI Advisor', desc: 'Voice & Text', tab: 'advisor' },
            { step: '7', title: 'Action Plan', desc: '30-60-90 Roadmap', tab: 'action-plan' },
            { step: '8', title: 'Expert Session', desc: '1-on-1 Mentorship', tab: 'expert-session' },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setActiveTab(item.tab as any)}
              className="flex flex-col items-center p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-emerald-200 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-100/50 dark:hover:bg-slate-750 transition-all text-center shadow-2xs group hover-card-lift cursor-pointer"
            >
              <span className="h-7 w-7 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center group-hover:bg-amber-400 group-hover:text-emerald-950 transition-all group-hover:scale-120 duration-300">
                {item.step}
              </span>
              <span className="font-bold text-xs text-emerald-950 dark:text-slate-200 mt-2 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
                {item.title}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.desc}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Helpline Contact Card with Shimmer & Floating Glow */}
      <section className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-3xl p-6 sm:p-8 text-emerald-950 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 hover-card-lift">
        <div className="space-y-1 z-10">
          <span className="bg-emerald-950 text-amber-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
            Grassroots Assistance
          </span>
          <h3 className="font-serif text-2xl font-bold text-emerald-950 mt-1">
            Need Help Filling Out Your Profile or Preparing Bank Documents?
          </h3>
          <p className="text-emerald-900 text-xs sm:text-sm font-medium">
            Our District Resource Persons are available to guide you free of charge.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('expert-session')}
          className="shimmer-btn bg-emerald-950 hover:bg-emerald-900 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg text-sm whitespace-nowrap flex items-center gap-2 cursor-pointer z-10 hover:scale-105 active:scale-95 transition-all group"
        >
          <PhoneCall className="h-4 w-4 text-amber-400 group-hover:rotate-12 transition-transform" /> Book Guidance Session
        </button>
      </section>

    </div>
  );
};
