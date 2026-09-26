import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { fetchLiveMandiPrices, MandiPriceItem } from '../services/apiService';
import {
  Store,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Search,
  MapPin,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const MandiView: React.FC = () => {
  const { profile } = useApp();
  const [prices, setPrices] = useState<MandiPriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');

  const loadData = async () => {
    setLoading(true);
    const data = await fetchLiveMandiPrices(profile.state, profile.district);
    setPrices(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [profile.state, profile.district]);

  const filteredPrices = prices.filter((p) => {
    const matchesSearch = p.commodity.toLowerCase().includes(search.toLowerCase()) ||
      p.market.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-3.5 px-3.5 pt-3 pb-24 animate-fade-in-up">
      {/* Header Info */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
              Agmarknet APMC Feed
            </span>
            <h1 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              Live Mandi Rates
            </h1>
            <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3 text-emerald-600" />
              <span>{profile.district}, {profile.state}</span>
            </p>
          </div>

          <button
            onClick={loadData}
            disabled={loading}
            className="p-2.5 rounded-xl bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-slate-700 touch-bounce"
            title="Refresh prices"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crop (e.g. Wheat, Soyabean, Onion)..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* Commodity Cards Feed */}
      {loading ? (
        <div className="py-12 text-center text-xs text-slate-500 space-y-2">
          <RefreshCw className="h-6 w-6 animate-spin text-emerald-600 mx-auto" />
          <p>Fetching real-time APMC Mandi price feeds...</p>
        </div>
      ) : filteredPrices.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-500 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200">
          No commodities found matching "{search}".
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredPrices.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2 touch-bounce"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {item.commodity}
                  </h3>
                  <span className="text-[10px] text-slate-500 block">
                    {item.market}
                  </span>
                </div>

                <span
                  className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.trend === 'up'
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                      : item.trend === 'down'
                      ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {item.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : item.trend === 'down' ? <TrendingDown className="h-3 w-3" /> : null}
                  {item.trend === 'up' ? `+${item.changePercent}%` : item.trend === 'down' ? `${item.changePercent}%` : 'Stable'}
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-1 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Modal Price</span>
                  <span className="font-serif text-lg font-bold text-emerald-950 dark:text-emerald-300">
                    ₹{item.modalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-500 ml-1">/ {item.unit}</span>
                </div>

                <div className="text-right text-[10px] text-slate-500">
                  <span>Range:</span>
                  <span className="block font-semibold text-slate-700 dark:text-slate-300">
                    ₹{item.minPrice} - ₹{item.maxPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
