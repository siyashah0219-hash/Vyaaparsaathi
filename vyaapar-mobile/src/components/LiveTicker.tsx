import React from 'react';
import { TrendingUp, TrendingDown, Store, Sparkles } from 'lucide-react';

export const LiveTicker: React.FC = () => {
  const tickerItems = [
    { name: 'Wheat (Sharbati)', market: 'APMC Solapur', price: '₹2,680/Q', change: '+2.4%', up: true },
    { name: 'Soyabean (Yellow)', market: 'APMC Latur', price: '₹4,750/Q', change: '+1.8%', up: true },
    { name: 'Cotton (Medium)', market: 'APMC Rajkot', price: '₹7,200/Q', change: '-0.9%', up: false },
    { name: 'Mustard (Black)', market: 'APMC Kota', price: '₹5,400/Q', change: '+1.2%', up: true },
    { name: 'PM MUDRA Shishu', market: 'MoFPI', price: 'Up to ₹50,000', change: 'Zero Collateral', up: true },
    { name: 'PMFME 35% Subsidy', market: 'Govt Scheme', price: 'Up to ₹10 Lakhs', change: 'Active', up: true },
  ];

  return (
    <div className="bg-emerald-950 text-white py-1.5 px-2 overflow-hidden flex items-center gap-2 border-b border-emerald-800/80 text-[11px] shadow-inner select-none">
      <div className="flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-full bg-emerald-800/90 text-amber-300 font-bold text-[10px] tracking-wider uppercase border border-emerald-600/60">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
        </span>
        <span>Live</span>
      </div>

      <div className="overflow-hidden relative w-full flex">
        <div className="animate-marquee flex items-center gap-5">
          {tickerItems.concat(tickerItems).map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 shrink-0">
              <span className="font-semibold text-emerald-100">{item.name}</span>
              <span className="font-bold text-amber-300 font-serif">{item.price}</span>
              <span
                className={`flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded ${
                  item.up
                    ? 'bg-emerald-800/70 text-emerald-300'
                    : 'bg-rose-950/70 text-rose-300'
                }`}
              >
                {item.up ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                {item.change}
              </span>
              <span className="text-emerald-500/80 text-[10px] ml-1">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
