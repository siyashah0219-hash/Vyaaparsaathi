import React from 'react';
import { TrendingUp, TrendingDown, Sparkles, Activity, ShieldCheck } from 'lucide-react';

export const LiveMarketTicker: React.FC = () => {
  const tickerItems = [
    { label: 'Raw Cow Milk', price: '₹38.50 / L', change: '+1.8%', up: true, category: 'Dairy' },
    { label: 'Wheat (Sharbati)', price: '₹2,380 / Qtl', change: '+3.2%', up: true, category: 'Grain' },
    { label: 'PMFME Micro-Food Subsidy', price: '35% Credit Grant', status: 'Active', category: 'Scheme' },
    { label: 'Yellow Soybean', price: '₹4,680 / Qtl', change: '+1.4%', up: true, category: 'Oilseed' },
    { label: 'PM MUDRA Shishu-Tarun', price: 'Up to ₹10 Lakhs', status: '0 Collateral', category: 'Credit' },
    { label: 'Hybrid Maize', price: '₹2,150 / Qtl', change: '+2.1%', up: true, category: 'APMC' },
    { label: 'Kisan Credit Card (KCC)', price: '4% Effective Rate', status: 'Open', category: 'Banking' },
    { label: 'Chana (Gram Dal)', price: '₹5,820 / Qtl', change: '-0.8%', up: false, category: 'Pulses' },
    { label: 'Solar Ag Cold Storage', price: '50% Subsidy Grant', status: 'NABARD', category: 'Capex' },
  ];

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white border-y border-emerald-800/50 py-2 shadow-xs relative select-none">
      <div className="max-w-[1820px] mx-auto px-2 sm:px-4 flex items-center">
        
        {/* Pulsing Live Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-extrabold text-[10px] uppercase tracking-wider shrink-0 z-10 shadow-xs mr-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Activity className="h-3 w-3 text-emerald-300" />
          <span>Live APMC & Govt Feed</span>
        </div>

        {/* Scrolling Marquee Container */}
        <div className="relative w-full overflow-hidden mask-gradient-x">
          <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap gap-8 text-xs cursor-default">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 hover:bg-emerald-900/40 px-2.5 py-0.5 rounded-lg transition-colors shrink-0"
              >
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-900/80 text-emerald-300 border border-emerald-700/50 uppercase">
                  {item.category}
                </span>
                <span className="font-semibold text-slate-200">{item.label}:</span>
                <span className="font-bold text-amber-300">{item.price}</span>
                
                {item.change && (
                  <span
                    className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      item.up
                        ? 'text-emerald-300 bg-emerald-950/80'
                        : 'text-rose-300 bg-rose-950/80'
                    }`}
                  >
                    {item.up ? (
                      <TrendingUp className="h-3 w-3 mr-0.5" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-0.5" />
                    )}
                    {item.change}
                  </span>
                )}

                {item.status && (
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-900/60 px-1.5 py-0.2 rounded border border-emerald-500/30">
                    {item.status}
                  </span>
                )}
                
                <span className="text-slate-600 select-none">•</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
