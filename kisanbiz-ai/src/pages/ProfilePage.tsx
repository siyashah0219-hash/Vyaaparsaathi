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
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile, setActiveTab } = useApp();

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
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              Interactive 5-Step Wizard
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 mt-2">
              Business Profile Builder
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              Information entered here is stored in your session and shapes all hyper-local analyses, loan calculations, and AI responses.
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-bold text-emerald-800">Progress</span>
            <span className="font-serif text-2xl font-bold text-emerald-950">
              {step}/5
            </span>
          </div>
        </div>

        {/* Step Progress Indicators */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
            <span className={step >= 1 ? 'text-emerald-800' : 'text-gray-400'}>1. Personal</span>
            <span className={step >= 2 ? 'text-emerald-800' : 'text-gray-400'}>2. Location</span>
            <span className={step >= 3 ? 'text-emerald-800' : 'text-gray-400'}>3. Business</span>
            <span className={step >= 4 ? 'text-emerald-800' : 'text-gray-400'}>4. Financials</span>
            <span className={step >= 5 ? 'text-emerald-800' : 'text-gray-400'}>5. Goals</span>
          </div>
          <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-800 transition-all duration-300 rounded-full"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Step Card Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-md space-y-6">
        
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
                <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
                  Years of Business / Farming Experience
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={formData.experienceYears}
                  onChange={(e) => handleChange('experienceYears', Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
                  Capital Available to Invest (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1000"
                  step="5000"
                  value={formData.capital}
                  onChange={(e) => handleChange('capital', Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 font-semibold"
                />
                {errors.capital && <p className="text-xs text-red-500 mt-1">{errors.capital}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
                  Monthly Sales / Revenue (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="2000"
                  value={formData.monthlySales}
                  onChange={(e) => handleChange('monthlySales', Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
                  Monthly Operating Costs (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.monthlyExpenses}
                  onChange={(e) => handleChange('monthlyExpenses', Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
                  Estimated Customers per Month
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.customerCount}
                  onChange={(e) => handleChange('customerCount', Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
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

    </div>
  );
};
