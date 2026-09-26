import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'h-7 w-7 p-1 rounded-xl',
    md: 'h-8.5 w-8.5 p-1.5 rounded-xl',
    lg: 'h-10 w-10 p-2 rounded-2xl',
  }[size];

  const titleSizes = {
    sm: 'text-sm sm:text-[15px] font-bold',
    md: 'text-base sm:text-lg font-bold',
    lg: 'text-xl sm:text-2xl font-extrabold',
  }[size];

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Custom Agri-Business Emblem SVG */}
      <div
        className={`relative ${iconSizes} bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 text-white flex items-center justify-center shadow-md shadow-emerald-900/20 ring-1.5 ring-emerald-500/20 group-hover:scale-105 group-hover:shadow-emerald-600/30 transition-all duration-300 shrink-0 overflow-hidden`}
      >
        {/* Ambient background glow inside emblem */}
        <div className="absolute inset-0 bg-radial from-amber-400/20 to-transparent pointer-events-none" />

        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white relative z-10 drop-shadow-xs"
        >
          {/* Golden Sun / Growth Arc */}
          <path
            d="M8 26C11 17 25 17 28 26"
            stroke="#FBBF24"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Plant Stem / Growth Curve */}
          <path
            d="M18 31V14"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Left Leaf (Farming / Kisan) */}
          <path
            d="M18 22C14 22 10 19 11 15C13 15 16 17 18 19"
            fill="#34D399"
            stroke="#ECFDF5"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Right Leaf / Upward Wing (Business Growth) */}
          <path
            d="M18 18C22 17 26 14 25 10C23 10 20 12 18 15"
            fill="#FBBF24"
            stroke="#FEF3C7"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Golden Seed / Rupee Coin at Apex */}
          <circle cx="18" cy="8.5" r="3.2" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="1.2" />
          <path
            d="M16.8 7.5H19.2M16.8 9.5H18.8M18 7.2V10"
            stroke="#78350F"
            strokeWidth="0.8"
            strokeLinecap="round"
          />

          {/* Ground furrow line */}
          <path
            d="M6 31H30"
            stroke="#A7F3D0"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-serif tracking-tight text-slate-900 dark:text-white ${titleSizes} leading-tight`}
          >
            VYPAAR <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">SAATHI</span>
          </span>
          <span className="hidden 2xl:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300/80 dark:border-amber-700/80 shadow-2xs">
            Rural AI
          </span>
        </div>

        {showTagline && (
          <p className="text-[10px] sm:text-[11px] font-semibold text-emerald-800 dark:text-emerald-400 tracking-wide uppercase truncate max-w-[210px] sm:max-w-none hidden xl:block">
            Hyper-Local Business & Finance
          </p>
        )}
      </div>
    </div>
  );
};
