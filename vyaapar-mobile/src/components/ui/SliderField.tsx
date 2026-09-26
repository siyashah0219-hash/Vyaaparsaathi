import React from 'react';

interface SliderFieldProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  helperText?: string;
  presets?: { label: string; value: number }[];
  colorScheme?: 'emerald' | 'amber' | 'blue' | 'purple' | 'red';
}

export const SliderField: React.FC<SliderFieldProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1000,
  prefix = '',
  suffix = '',
  helperText,
  presets = [],
  colorScheme = 'emerald',
}) => {
  const percent = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const colorStyles = {
    emerald: {
      fill: 'bg-emerald-600',
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
    },
    amber: {
      fill: 'bg-amber-500',
      badge: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
    },
    blue: {
      fill: 'bg-blue-600',
      badge: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
    },
    purple: {
      fill: 'bg-purple-600',
      badge: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800',
    },
    red: {
      fill: 'bg-red-500',
      badge: 'bg-red-100 text-red-900 border-red-300 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
    },
  }[colorScheme];

  return (
    <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
          {label}
        </label>
        <span className={`text-xs font-bold font-serif px-2.5 py-1 rounded-lg border shadow-xs ${colorStyles.badge}`}>
          {prefix}{value.toLocaleString('en-IN')}{suffix}
        </span>
      </div>

      {/* Touch-Friendly Range Slider */}
      <div className="relative flex items-center h-6">
        <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${colorStyles.fill} transition-all duration-75`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className={`absolute h-5 w-5 bg-white border-2 border-emerald-600 dark:border-emerald-400 rounded-full shadow-md pointer-events-none -ml-2.5 transition-all duration-75`}
          style={{ left: `${percent}%` }}
        />
      </div>

      {/* Helper text or Min/Max labels */}
      <div className="flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-400">
        <span>{prefix}{min.toLocaleString('en-IN')}{suffix}</span>
        {helperText && <span className="text-center font-medium truncate max-w-[200px]">{helperText}</span>}
        <span>{prefix}{max.toLocaleString('en-IN')}{suffix}</span>
      </div>

      {/* Preset Pills */}
      {presets.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(p.value)}
              className={`shrink-0 text-[10px] font-bold px-2 py-1 rounded-lg border transition-all touch-bounce ${
                value === p.value
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
