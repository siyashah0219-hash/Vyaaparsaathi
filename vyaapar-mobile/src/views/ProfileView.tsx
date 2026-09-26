import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { indianStatesAndDistricts, businessCategories } from '../data/mockData';
import {
  User,
  MapPin,
  Building2,
  IndianRupee,
  CheckCircle2,
  Sparkles,
  Save,
} from 'lucide-react';
import { BusinessType } from '../types';

export const ProfileView: React.FC = () => {
  const { profile, updateProfile, setActiveTab } = useApp();

  const [formData, setFormData] = useState({
    name: profile.name,
    state: profile.state,
    district: profile.district,
    villageCity: profile.villageCity || '',
    businessCategory: profile.businessCategory,
    businessType: profile.businessType,
    capital: profile.capital,
    monthlySales: profile.monthlySales,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const districts = indianStatesAndDistricts[formData.state] || [];

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    const newDistricts = indianStatesAndDistricts[newState] || [];
    setFormData((prev) => ({
      ...prev,
      state: newState,
      district: newDistricts[0] || '',
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      state: formData.state,
      district: formData.district,
      villageCity: formData.villageCity,
      businessCategory: formData.businessCategory,
      businessType: formData.businessType,
      capital: Number(formData.capital),
      monthlySales: Number(formData.monthlySales),
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-4 px-3.5 pt-3 pb-24 animate-fade-in-up">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex items-center gap-3">
        <div className="relative h-14 w-14 rounded-2xl border-2 border-emerald-600 overflow-hidden shrink-0 shadow-md">
          <img
            src={profile.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80'}
            alt={profile.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
            {profile.name}
          </h1>
          <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
            {profile.businessCategory}
          </p>
          <p className="text-[11px] text-slate-500">
            {profile.district}, {profile.state}
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 p-3 rounded-2xl flex items-center gap-2 text-xs font-bold border border-emerald-300 animate-pop-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>Profile updated! Calculations & schemes adjusted.</span>
        </div>
      )}

      {/* Edit Form */}
      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3.5 text-xs">
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">State</label>
            <select
              value={formData.state}
              onChange={handleStateChange}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
            >
              {Object.keys(indianStatesAndDistricts).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">District</label>
            <select
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
            >
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Village / Town / City</label>
          <input
            type="text"
            value={formData.villageCity}
            onChange={(e) => setFormData({ ...formData, villageCity: e.target.value })}
            placeholder="e.g. Koregaon"
            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Business Category</label>
          <select
            value={formData.businessCategory}
            onChange={(e) => setFormData({ ...formData, businessCategory: e.target.value })}
            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
          >
            {businessCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Business Type */}
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Business Setup Type</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'new', label: 'New Unit' },
              { id: 'existing', label: 'Existing Unit Expansion' },
            ].map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setFormData({ ...formData, businessType: t.id as BusinessType })}
                className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                  formData.businessType === t.id
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Available Capital (₹)</label>
            <input
              type="number"
              value={formData.capital}
              onChange={(e) => setFormData({ ...formData, capital: Number(e.target.value) })}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Monthly Sales (₹)</label>
            <input
              type="number"
              value={formData.monthlySales}
              onChange={(e) => setFormData({ ...formData, monthlySales: Number(e.target.value) })}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 touch-bounce shadow-md pt-2"
        >
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
};
