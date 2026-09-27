import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BusinessProfile } from '../types';
import { indianStatesAndDistricts, businessCategories } from '../data/mockData';
import {
  User,
  MapPin,
  Briefcase,
  IndianRupee,
  Target,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  Building,
  Rocket,
  Users,
  LogOut,
  LogIn,
} from 'lucide-react';
import { SliderField } from '../components/ui/SliderField';

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile, setActiveTab, logout, openAuthModal, isLoggedIn, t } = useApp();

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<BusinessProfile>({ ...profile });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableDistricts =
    indianStatesAndDistricts[formData.state] || indianStatesAndDistricts['Maharashtra'];

  const handleChange = (field: keyof BusinessProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleStateChange = (state: string) => {
    const districts = indianStatesAndDistricts[state] || [];
    setFormData((prev) => ({
      ...prev,
      state,
      district: districts[0] || '',
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    const errs: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) errs.name = 'Please enter your full name.';
    } else if (currentStep === 2) {
      if (!formData.state) errs.state = 'Please select your state.';
      if (!formData.district) errs.district = 'Please select your district.';
      if (!formData.villageCity.trim()) errs.villageCity = 'Please enter your village or town name.';
    } else if (currentStep === 3) {
      if (!formData.businessCategory) errs.businessCategory = 'Please select a business category.';
      if (!formData.targetCustomers.trim()) errs.targetCustomers = 'Please describe your target customers.';
    } else if (currentStep === 4) {
      if (formData.capital <= 0) errs.capital = 'Available capital must be greater than 0.';
      if (formData.monthlySales < 0) errs.monthlySales = 'Monthly sales cannot be negative.';
      if (formData.monthlyExpenses < 0) errs.monthlyExpenses = 'Monthly expenses cannot be negative.';
    } else if (currentStep === 5) {
      if (!formData.businessGoal.trim()) errs.businessGoal = 'Please specify your main business goal.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(5, prev + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (validateStep(5)) {
      updateProfile(formData);
      setActiveTab('analyze');
    }
  };

  return (
    <div className="max-w-5xl 2xl:max-w-6xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-emerald-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-700">
              Interactive 5-Step Wizard
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 dark:text-slate-100 mt-2">
              Business Profile Builder
            </h1>
            <p className="text-gray-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Information entered here is stored in your session and shapes all hyper-local analyses, loan calculations, and AI responses.
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400">Progress</span>
            <span className="font-serif text-2xl font-bold text-emerald-950 dark:text-slate-100">
              {step}/5
            </span>
          </div>
        </div>

        {/* Step Progress Indicators */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-900 dark:text-slate-300">
            <span className={step >= 1 ? 'text-emerald-800 dark:text-emerald-400' : 'text-gray-400 dark:text-slate-600'}>1. Personal</span>
            <span className={step >= 2 ? 'text-emerald-800 dark:text-emerald-400' : 'text-gray-400 dark:text-slate-600'}>2. Location</span>
            <span className={step >= 3 ? 'text-emerald-800 dark:text-emerald-400' : 'text-gray-400 dark:text-slate-600'}>3. Business</span>
            <span className={step >= 4 ? 'text-emerald-800 dark:text-emerald-400' : 'text-gray-400 dark:text-slate-600'}>4. Financials</span>
            <span className={step >= 5 ? 'text-emerald-800 dark:text-emerald-400' : 'text-gray-400 dark:text-slate-600'}>5. Goals</span>
          </div>
          <div className="h-2.5 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden border border-gray-200 dark:border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-800 transition-all duration-300 rounded-full"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Step Card Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-emerald-200 dark:border-slate-800 shadow-md space-y-6 transition-colors">
        
        {/* STEP 1: Personal & Business Status */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="font-serif text-2xl font-bold text-emerald-950 flex items-center gap-2">
                <User className="h-6 w-6 text-emerald-700" /> Step 1: Personal & Enterprise Status
              </h2>
              <p className="text-gray-600 text-xs mt-1">Tell us who you are and whether this is a brand new venture or an existing business.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. Sunita Patil / Ramesh Kumar"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                    errors.name ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {errors.name}</p>}
              </div>

              {/* Profile Avatar Selection */}
              <div>
                <label className="block text-xs font-bold text-emerald-950 dark:text-slate-200 uppercase tracking-wider mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center gap-3">
                  {[
                    { label: 'Sunita', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80' },
                    { label: 'Ramesh', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80' },
                    { label: 'Meena', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80' },
                    { label: 'Rajesh', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80' },
                  ].map((av) => (
                    <button
                      key={av.url}
                      type="button"
                      onClick={() => handleChange('avatarUrl', av.url)}
                      className={`relative h-12 w-12 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                        formData.avatarUrl === av.url
                          ? 'border-emerald-600 ring-2 ring-emerald-500/40 scale-105 shadow-md'
                          : 'border-slate-200 dark:border-slate-700 hover:border-emerald-400 opacity-80 hover:opacity-100'
                      }`}
                      title={av.label}
                    >
                      <img src={av.url} alt={av.label} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
                  Business Stage <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleChange('businessType', 'new')}
                    className={`p-4 rounded-xl border-2 text-left flex items-start gap-3 transition-all ${
                      formData.businessType === 'new'
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Rocket className={`h-6 w-6 shrink-0 mt-0.5 ${formData.businessType === 'new' ? 'text-emerald-700' : 'text-gray-400'}`} />
                    <div>
                      <p className="font-bold text-sm text-emerald-950">Start a New Business</p>
                      <p className="text-xs text-gray-500 mt-0.5">Planning to launch a new unit from scratch.</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleChange('businessType', 'existing')}
                    className={`p-4 rounded-xl border-2 text-left flex items-start gap-3 transition-all ${
                      formData.businessType === 'existing'
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Building className={`h-6 w-6 shrink-0 mt-0.5 ${formData.businessType === 'existing' ? 'text-emerald-700' : 'text-gray-400'}`} />
                    <div>
                      <p className="font-bold text-sm text-emerald-950">Existing Business</p>
                      <p className="text-xs text-gray-500 mt-0.5">Already operating and looking to expand or structure loans.</p>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <SliderField
                  label="Years of Business / Farming Experience"
                  value={formData.experienceYears}
                  onChange={(val) => handleChange('experienceYears', val)}
                  min={0}
                  max={40}
                  step={1}
                  suffix=" Years"
                  colorScheme="emerald"
                  helperText="Experience helps local banks evaluate loan repayment viability and interest concessions."
                  presets={[
                    { label: 'Fresh (0 yrs)', value: 0 },
                    { label: '2 yrs', value: 2 },
                    { label: '5 yrs', value: 5 },
                    { label: '10 yrs', value: 10 },
                    { label: '20+ yrs', value: 20 },
                  ]}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Location */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="font-serif text-2xl font-bold text-emerald-950 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-emerald-700" /> Step 2: Hyper-Local Location
              </h2>
              <p className="text-gray-600 text-xs mt-1">Market demand, mandi prices, and government scheme matches vary by State and District.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 bg-white"
                >
                  {Object.keys(indianStatesAndDistricts).map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
                  District <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => handleChange('district', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 bg-white"
                >
                  {availableDistricts.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
                  Village / Town / City Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.villageCity}
                  onChange={(e) => handleChange('villageCity', e.target.value)}
                  placeholder="e.g. Koregaon, Sinnar, Jetpur, Sarnath"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                    errors.villageCity ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-emerald-600'
                  }`}
                />
                {errors.villageCity && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {errors.villageCity}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Business Information */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="font-serif text-2xl font-bold text-emerald-950 flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-emerald-700" /> Step 3: Business Category & Target Market
              </h2>
              <p className="text-gray-600 text-xs mt-1">Select your primary activity and describe who will buy your produce or services.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
                  Business Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.businessCategory}
                  onChange={(e) => handleChange('businessCategory', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 bg-white font-medium text-emerald-950"
                >
                  {businessCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
                  Target Customer Segment <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.targetCustomers}
                  onChange={(e) => handleChange('targetCustomers', e.target.value)}
                  placeholder="e.g. Local households, village tea stalls, nearby restaurant owners & farmers"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                    errors.targetCustomers ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-emerald-600'
                  }`}
                />
                {errors.targetCustomers && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {errors.targetCustomers}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Financial Information */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="font-serif text-2xl font-bold text-emerald-950 flex items-center gap-2">
                <IndianRupee className="h-6 w-6 text-emerald-700" /> Step 4: Financial Information
              </h2>
              <p className="text-gray-600 text-xs mt-1">Enter your available capital and estimated/actual sales to structure loan calculations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <SliderField
                  label="Capital Available to Invest"
                  value={formData.capital}
                  onChange={(val) => handleChange('capital', val)}
                  min={5000}
                  max={1000000}
                  step={5000}
                  prefix="₹"
                  icon={IndianRupee}
                  colorScheme="emerald"
                  helperText="Self-contribution margin money used to match bank loan criteria."
                  presets={[
                    { label: '₹25K', value: 25000 },
                    { label: '₹50K', value: 50000 },
                    { label: '₹1 Lakh', value: 100000 },
                    { label: '₹2.5 Lakh', value: 250000 },
                    { label: '₹5 Lakh', value: 500000 },
                  ]}
                />
                {errors.capital && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.capital}</p>}
              </div>

              <div>
                <SliderField
                  label="Monthly Sales / Revenue"
                  value={formData.monthlySales}
                  onChange={(val) => handleChange('monthlySales', val)}
                  min={0}
                  max={500000}
                  step={2500}
                  prefix="₹"
                  suffix=" / mo"
                  colorScheme="emerald"
                  helperText="Estimated gross monthly revenue from harvest, dairy, or shop turnover."
                  presets={[
                    { label: '₹20K', value: 20000 },
                    { label: '₹35K', value: 35000 },
                    { label: '₹60K', value: 60000 },
                    { label: '₹1 Lakh', value: 100000 },
                    { label: '₹2 Lakh', value: 200000 },
                  ]}
                />
              </div>

              <div>
                <SliderField
                  label="Monthly Operating Costs"
                  value={formData.monthlyExpenses}
                  onChange={(val) => handleChange('monthlyExpenses', val)}
                  min={0}
                  max={300000}
                  step={1000}
                  prefix="₹"
                  suffix=" / mo"
                  colorScheme="amber"
                  helperText="Raw materials, seeds, fodder, electricity, fuel, and transport."
                  presets={[
                    { label: '₹10K', value: 10000 },
                    { label: '₹22K', value: 22000 },
                    { label: '₹40K', value: 40000 },
                    { label: '₹75K', value: 75000 },
                    { label: '₹1.5 Lakh', value: 150000 },
                  ]}
                />
              </div>

              <div>
                <SliderField
                  label="Estimated Customers / Month"
                  value={formData.customerCount}
                  onChange={(val) => handleChange('customerCount', val)}
                  min={0}
                  max={1000}
                  step={10}
                  suffix=" Customers"
                  icon={Users}
                  colorScheme="blue"
                  helperText="Monthly footfall, wholesale buyers, or regular retail households."
                  presets={[
                    { label: '50', value: 50 },
                    { label: '150', value: 150 },
                    { label: '300', value: 300 },
                    { label: '500', value: 500 },
                    { label: '1000+', value: 1000 },
                  ]}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Goals & Summary Review */}
        {step === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="font-serif text-2xl font-bold text-emerald-950 flex items-center gap-2">
                <Target className="h-6 w-6 text-emerald-700" /> Step 5: Business Goal & Summary Review
              </h2>
              <p className="text-gray-600 text-xs mt-1">Specify your primary objective so our AI can prioritize the best recommendations.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
                Primary Business Goal <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={formData.businessGoal}
                onChange={(e) => handleChange('businessGoal', e.target.value)}
                placeholder="e.g. Procure cold storage equipment, expand distribution to 3 nearby villages, or apply for PM MUDRA subsidy loan"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
              />
              {errors.businessGoal && <p className="text-xs text-red-500 mt-1">{errors.businessGoal}</p>}
            </div>

            {/* Profile Review Summary Card */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-3">
              <h3 className="font-serif text-base font-bold text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-700" /> Review Your Profile Data
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-gray-700">
                <div>
                  <span className="text-gray-500 block">Name</span>
                  <strong className="text-emerald-950">{formData.name}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Stage</span>
                  <strong className="text-emerald-950">{formData.businessType === 'new' ? 'New Business' : 'Existing Business'}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Location</span>
                  <strong className="text-emerald-950">{formData.villageCity}, {formData.district}, {formData.state}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Category</span>
                  <strong className="text-emerald-950">{formData.businessCategory}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Available Capital</span>
                  <strong className="text-emerald-950">₹{formData.capital.toLocaleString('en-IN')}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Monthly Sales</span>
                  <strong className="text-emerald-950">₹{formData.monthlySales.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation Controls */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold shadow-md shadow-emerald-900/20"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-sm font-bold shadow-lg shadow-amber-400/30 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="h-4 w-4" /> Generate My Business Analysis <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>

      </div>

      {/* Account Session & Logout Control Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-sm">
            {profile.name ? profile.name[0].toUpperCase() : 'U'}
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Current Session: <strong className="text-slate-900 dark:text-white">{profile.name}</strong>
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              {isLoggedIn ? 'Active verified profile' : 'Guest mode'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={openAuthModal}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer"
          >
            {t('action.switchAccount')}
          </button>
          {isLoggedIn ? (
            <button
              type="button"
              onClick={logout}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-950/60 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-bold transition-all cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>{t('action.logout')}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={openAuthModal}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>{t('action.login')}</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
