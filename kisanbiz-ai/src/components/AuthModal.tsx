import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BusinessProfile } from '../types';
import { defaultProfile, indianStatesAndDistricts, businessCategories } from '../data/mockData';
import {
  X,
  User,
  Phone,
  MapPin,
  Briefcase,
  Sparkles,
  CheckCircle2,
  LogIn,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEMO_ACCOUNTS: Array<{
  id: string;
  name: string;
  role: string;
  district: string;
  state: string;
  category: string;
  capital: number;
  avatarUrl: string;
  profile: Partial<BusinessProfile>;
}> = [
  {
    id: 'sunita',
    name: 'Sunita Patil',
    role: 'Dairy Farmer & Chilling Unit',
    district: 'Satara',
    state: 'Maharashtra',
    category: 'Dairy & Animal Husbandry',
    capital: 45000,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
    profile: defaultProfile,
  },
  {
    id: 'ramesh',
    name: 'Ramesh Verma',
    role: 'Spice Processing Entrepreneur',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    category: 'Spices & Condiments Processing',
    capital: 120000,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    profile: {
      name: 'Ramesh Verma',
      state: 'Uttar Pradesh',
      district: 'Varanasi',
      villageCity: 'Rohania',
      businessCategory: 'Spices & Condiments Processing',
      businessType: 'new',
      capital: 120000,
      monthlySales: 45000,
      monthlyExpenses: 28000,
      customerCount: 120,
      experienceYears: 4,
      businessGoal: 'Install automated grinding & vacuum packaging line to supply urban supermarkets',
      targetCustomers: 'Retail grocery marts, local restaurants & temple prasad vendors',
      language: 'Hindi',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    },
  },
  {
    id: 'meena',
    name: 'Meena Devi',
    role: 'SHG Pickle & Food Processing Leader',
    district: 'Patna',
    state: 'Bihar',
    category: 'Food Processing & Value Addition',
    capital: 65000,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
    profile: {
      name: 'Meena Devi',
      state: 'Bihar',
      district: 'Patna',
      villageCity: 'Danapur',
      businessCategory: 'Food Processing & Value Addition',
      businessType: 'existing',
      capital: 65000,
      monthlySales: 38000,
      monthlyExpenses: 21000,
      customerCount: 95,
      experienceYears: 2,
      businessGoal: 'Brand registration under PMFME scheme and expand supply to district rail canteens',
      targetCustomers: 'Weekly haats, highway dhabas & local cooperative stores',
      language: 'Hindi',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
    },
  },
];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, t } = useApp();
  const [mode, setMode] = useState<'demo' | 'custom'>('demo');
  const [customName, setCustomName] = useState('');
  const [customPhone, setCustomPhone] = useState('');
  const [customState, setCustomState] = useState('Maharashtra');
  const [customDistrict, setCustomDistrict] = useState('Satara');
  const [customCategory, setCustomCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const districts =
    indianStatesAndDistricts[customState] ||
    indianStatesAndDistricts['Maharashtra'] ||
    [];

  const handleSelectDemo = (demo: (typeof DEMO_ACCOUNTS)[0]) => {
    setIsSubmitting(true);
    setTimeout(() => {
      login(demo.profile);
      setIsSubmitting(false);
      onClose();
    }, 250);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      login({
        name: customName.trim(),
        state: customState,
        district: customDistrict,
        villageCity: customDistrict,
        businessCategory: customCategory.trim() || 'Dairy & Animal Husbandry',
        businessType: 'new',
        capital: 50000,
        monthlySales: 25000,
        monthlyExpenses: 15000,
        customerCount: 40,
        experienceYears: 1,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(customName)}`,
      });
      setIsSubmitting(false);
      onClose();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in-up">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-emerald-500/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow-lg shadow-amber-400/20">
              <LogIn className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                {t('action.login')} / {t('action.switchAccount')}
              </h3>
              <p className="text-xs text-emerald-100 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-300" />
                Vypaar Saathi Rural Enterprise Account
              </p>
            </div>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex bg-emerald-950/40 p-1 rounded-xl mt-5 border border-emerald-600/30">
            <button
              onClick={() => setMode('demo')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'demo'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              ⚡ 1-Click Demo Profiles
            </button>
            <button
              onClick={() => setMode('custom')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'custom'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              ✍️ Enter Custom Details
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {mode === 'demo' ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Choose a pre-configured verified rural business profile to instantly explore tailored advisory & finances:
              </p>

              {DEMO_ACCOUNTS.map((acc) => (
                <div
                  key={acc.id}
                  onClick={() => handleSelectDemo(acc)}
                  className="group cursor-pointer p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={acc.avatarUrl}
                      alt={acc.name}
                      className="h-11 w-11 rounded-full object-cover border-2 border-emerald-500/60 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm text-slate-900 dark:text-white">
                          {acc.name}
                        </p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                          ₹{(acc.capital / 1000).toFixed(0)}k Capital
                        </span>
                      </div>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                        {acc.role}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        {acc.district}, {acc.state}
                      </p>
                    </div>
                  </div>

                  <button className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 border border-emerald-300 dark:border-slate-600 text-xs font-bold text-emerald-700 dark:text-emerald-300 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs shrink-0">
                    Select
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name / उद्यमी का नाम *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. Ramesh Verma"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mobile Number / मोबाइल नंबर
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    value={customPhone}
                    onChange={(e) => setCustomPhone(e.target.value)}
                    placeholder="10-digit Mobile Number"
                    maxLength={10}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    State / राज्य
                  </label>
                  <select
                    value={customState}
                    onChange={(e) => {
                      setCustomState(e.target.value);
                      const newDist = (indianStatesAndDistricts[e.target.value] || [])[0] || '';
                      setCustomDistrict(newDist);
                    }}
                    className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {Object.keys(indianStatesAndDistricts).map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    District / ज़िला
                  </label>
                  <select
                    value={customDistrict}
                    onChange={(e) => setCustomDistrict(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {districts.map((dst) => (
                      <option key={dst} value={dst}>
                        {dst}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Business Category / व्यवसाय श्रेणी
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="e.g. Dairy & Animal Husbandry, Kirana Store"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !customName.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-600 hover:to-green-500 text-white font-bold text-sm shadow-lg shadow-emerald-700/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <UserCheck className="h-4 w-4" />
                {isSubmitting ? 'Logging in...' : 'Sign In & Save Profile'}
              </button>
            </form>
          )}
        </div>

        {/* Footer Note */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>All profile calculations are saved locally on this browser.</span>
          <button onClick={onClose} className="hover:underline font-bold text-slate-700 dark:text-slate-300">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
