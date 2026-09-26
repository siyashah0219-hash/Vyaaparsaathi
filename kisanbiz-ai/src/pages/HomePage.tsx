import React from 'react';
import { useApp } from '../context/AppContext';
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
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActiveTab, profile, updateProfile } = useApp();

  const handleStartNew = () => {
    updateProfile({ businessType: 'new' });
    setActiveTab('profile');
  };

  const handleAnalyzeExisting = () => {
    updateProfile({ businessType: 'existing' });
    setActiveTab('profile');
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-950 text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-emerald-700/50">
        
        {/* Background Decorative Pattern */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
        <div className="absolute right-20 -bottom-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" /> Rural Business Advisory Engine
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
            From Business Idea to <br />
            <span className="text-amber-400">Business Growth.</span>
          </h1>

          <p className="text-emerald-100 text-base sm:text-lg leading-relaxed max-w-2xl">
            <strong className="text-white font-semibold">VYPAAR SAATHI</strong> is your AI-driven hyper-local business advisory & financial structuring assistant. We analyze village market demand, calculate bankable budget plans, match government schemes (PM MUDRA, PMFME), and connect you with 1-on-1 experts.
          </p>

          {/* Core CTAs Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleStartNew}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-400/20 transition-all hover:-translate-y-0.5 text-sm"
            >
              <Rocket className="h-4 w-4" /> Start a New Business
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={handleAnalyzeExisting}
              className="inline-flex items-center gap-2 bg-emerald-800/80 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl border border-emerald-600/80 transition-all text-sm"
            >
              <Building2 className="h-4 w-4 text-amber-300" /> Analyze My Existing Business
            </button>
          </div>

          {/* Active Profile Status Badge */}
          {profile.name && (
            <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-emerald-200 bg-emerald-950/60 border border-emerald-700/60 rounded-2xl p-3.5 backdrop-blur-md">
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
                className="ml-auto underline font-bold text-amber-300 hover:text-white"
              >
                Modify Profile
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 6 Primary Working Functional Feature Cards (User Request Section 2) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950">
              What would you like to do today?
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              Select a module below. Every tool is fully functional and uses your persistent profile.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-full">
            <ShieldCheck className="h-4 w-4 text-emerald-700" /> Live Functional Prototype
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Card 1: Start a New Business */}
          <div
            onClick={handleStartNew}
            className="group cursor-pointer bg-white rounded-2xl p-6 border-2 border-amber-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all space-y-4 hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Rocket className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Step 1: Setup & Profile
              </span>
              <h3 className="font-serif text-xl font-bold text-emerald-950 mt-2 group-hover:text-emerald-700 transition-colors">
                Start a New Business
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed mt-1">
                Enter your location, budget, and business ideas to build a multi-step profile and generate localized market validation.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-emerald-800 group-hover:text-emerald-900">
              Create New Business Profile <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Analyze My Existing Business */}
          <div
            onClick={handleAnalyzeExisting}
            className="group cursor-pointer bg-white rounded-2xl p-6 border-2 border-emerald-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all space-y-4 hover:-translate-y-1"
          >
            <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Building2 className="h-6 w-6 text-emerald-700" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Hyper-Local Intelligence
              </span>
              <h3 className="font-serif text-xl font-bold text-emerald-950 mt-2 group-hover:text-emerald-700 transition-colors">
                Analyze My Existing Business
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed mt-1">
                Evaluate your village market demand, competitor density, customer segments, and local expansion opportunities.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-emerald-800 group-hover:text-emerald-900">
              Run Local Market Analysis <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Explore Government Schemes */}
          <div
            onClick={() => setActiveTab('schemes')}
            className="group cursor-pointer bg-white rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all space-y-4 hover:-translate-y-1"
          >
            <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Landmark className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Loans & Subsidies
              </span>
              <h3 className="font-serif text-xl font-bold text-emerald-950 mt-2 group-hover:text-emerald-700 transition-colors">
                Explore Government Schemes
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed mt-1">
                Match your profile against PM MUDRA, PMFME, PMEGP & Stand-Up India schemes with eligibility checkers & application steps.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-blue-800 group-hover:text-blue-900">
              View Matched Schemes <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Calculate My Business Budget */}
          <div
            onClick={() => setActiveTab('financial-plan')}
            className="group cursor-pointer bg-white rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 shadow-sm hover:shadow-xl transition-all space-y-4 hover:-translate-y-1"
          >
            <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Calculator className="h-6 w-6 text-purple-700" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                Bank-Ready Calculator
              </span>
              <h3 className="font-serif text-xl font-bold text-emerald-950 mt-2 group-hover:text-emerald-700 transition-colors">
                Calculate My Business Budget
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed mt-1">
                Calculate EMI, Break-Even sales, DSCR bank approval score, funding mix, and 6-month cash flow projections.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-purple-800 group-hover:text-purple-900">
              Open Financial Calculator <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Talk to AI Advisor */}
          <div
            onClick={() => setActiveTab('advisor')}
            className="group cursor-pointer bg-white rounded-2xl p-6 border-2 border-teal-200 hover:border-teal-400 shadow-sm hover:shadow-xl transition-all space-y-4 hover:-translate-y-1"
          >
            <div className="h-12 w-12 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <MessageSquare className="h-6 w-6 text-teal-700" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Voice & Text Assistant
              </span>
              <h3 className="font-serif text-xl font-bold text-emerald-950 mt-2 group-hover:text-emerald-700 transition-colors">
                Talk to AI Advisor
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed mt-1">
                Ask questions in Hindi, Marathi, or English using voice mic or text. Get localized answers grounded in your business details.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-teal-800 group-hover:text-teal-900">
              Start Voice / Text Chat <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Book Expert Session */}
          <div
            onClick={() => setActiveTab('expert-session')}
            className="group cursor-pointer bg-white rounded-2xl p-6 border-2 border-rose-200 hover:border-rose-400 shadow-sm hover:shadow-xl transition-all space-y-4 hover:-translate-y-1"
          >
            <div className="h-12 w-12 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6 text-rose-700" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                1-on-1 Guidance
              </span>
              <h3 className="font-serif text-xl font-bold text-emerald-950 mt-2 group-hover:text-emerald-700 transition-colors">
                Book Expert Session
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed mt-1">
                Schedule a 1-on-1 consultation with agri-business specialists, ex-NABARD bank managers, or SHG enterprise mentors.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-rose-800 group-hover:text-rose-900">
              Select Expert & Slot <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* User Journey Roadmap Visualization */}
      <section className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            End-to-End Workflow
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 mt-2">
            The Complete VYPAAR SAATHI User Journey
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Follow this step-by-step path designed specifically for rural micro-entrepreneurs.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
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
              className="flex flex-col items-center p-3.5 bg-white rounded-xl border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-100/50 transition-all text-center shadow-2xs group"
            >
              <span className="h-7 w-7 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center group-hover:bg-amber-400 group-hover:text-emerald-950 transition-colors">
                {item.step}
              </span>
              <span className="font-bold text-xs text-emerald-950 mt-2 group-hover:text-emerald-800">
                {item.title}
              </span>
              <span className="text-[10px] text-gray-500">{item.desc}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Helpline Contact Card */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-emerald-950 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
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
          className="bg-emerald-950 hover:bg-emerald-900 text-white font-bold px-6 py-3.5 rounded-xl shadow-md text-sm whitespace-nowrap flex items-center gap-2"
        >
          <PhoneCall className="h-4 w-4 text-amber-400" /> Book Guidance Session
        </button>
      </section>

    </div>
  );
};
