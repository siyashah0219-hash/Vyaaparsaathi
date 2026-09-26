import React, { useState } from 'react';
import { Minus, Plus, Edit3, Check } from 'lucide-react';

export interface SliderFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  prefix?: string;
  suffix?: string;
  helperText?: string;
  presets?: { label: string; value: number }[];
  icon?: React.ElementType;
  colorScheme?: 'emerald' | 'amber' | 'blue' | 'red';
  formatValue?: (val: number) => string;
  className?: string;
}

export const SliderField: React.FC<SliderFieldProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix = '',
  suffix = '',
  helperText,
  presets,
  icon: Icon,
  colorScheme = 'emerald',
  formatValue,
  className = '',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value.toString());

  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const handleIncrement = () => {
    const next = Math.min(max, value + step);
    onChange(next);
  };

  const handleDecrement = () => {
    const prev = Math.max(min, value - step);
    onChange(prev);
  };

  const handleEditSubmit = () => {
    const num = Number(tempValue);
    if (!isNaN(num)) {
      const clamped = Math.min(max, Math.max(min, num));
      onChange(clamped);
    }
    setIsEditing(false);
  };

  const colorStyles = {
    emerald: {
      accent: 'accent-emerald-600',
      gradient: 'from-emerald-500 to-green-600',
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700',
      borderActive: 'border-emerald-500 ring-2 ring-emerald-500/10',
      track: '#059669',
      button: 'hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300',
    },
    amber: {
      accent: 'accent-amber-600',
      gradient: 'from-amber-500 to-orange-500',
      badge: 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700',
      borderActive: 'border-amber-500 ring-2 ring-amber-500/10',
      track: '#d97706',
      button: 'hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300',
    },
    blue: {
      accent: 'accent-blue-600',
      gradient: 'from-blue-500 to-cyan-600',
      badge: 'bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-700',
      borderActive: 'border-blue-500 ring-2 ring-blue-500/10',
      track: '#2563eb',
      button: 'hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-800 dark:text-blue-300',
    },
    red: {
      accent: 'accent-red-600',
      gradient: 'from-red-500 to-rose-600',
      badge: 'bg-red-50 text-red-800 border-red-300 dark:bg-red-950/60 dark:text-red-300 dark:border-red-700',
      borderActive: 'border-red-500 ring-2 ring-red-500/10',
      track: '#dc2626',
      button: 'hover:bg-red-100 dark:hover:bg-red-900/60 text-red-800 dark:text-red-300',
    },
  }[colorScheme];

  const displayString = formatValue
    ? formatValue(value)
    : `${prefix}${value.toLocaleString('en-IN')}${suffix}`;

  return (
    <div className={`p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all ${className}`}>
      {/* Top Header: Label & Value Pill */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
          <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            {label}
          </label>
        </div>

        {/* Live Value with Direct Edit Option */}
        <div className="flex items-center gap-1.5">
          {isEditing ? (
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit()}
                autoFocus
                className="w-24 px-2 py-0.5 text-xs font-bold border rounded-md border-emerald-500 outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
              <button
                type="button"
                onClick={handleEditSubmit}
                className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                title="Save value"
              >
                <Check className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => {
                setTempValue(value.toString());
                setIsEditing(true);
              }}
              title="Click to type exact value"
              className={`group flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border cursor-pointer transition-all hover:scale-102 ${colorStyles.badge}`}
            >
              <span>{displayString}</span>
              <Edit3 className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </div>
      </div>

      {/* Slider Track with Increment / Decrement Steppers */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className={`h-7 w-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${colorStyles.button}`}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>

        <div className="relative flex-1 flex items-center">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleSliderChange}
            aria-label={label}
            className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-100 dark:bg-slate-800 ${colorStyles.accent}`}
            style={{
              background: `linear-gradient(to right, ${colorStyles.track} 0%, ${colorStyles.track} ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`,
            }}
          />
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className={`h-7 w-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${colorStyles.button}`}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Min & Max Range Subtitles */}
      <div className="flex justify-between items-center text-[10px] text-slate-600 dark:text-slate-400 mt-1 font-medium">
        <span>Min: {formatValue ? formatValue(min) : `${prefix}${min.toLocaleString('en-IN')}${suffix}`}</span>
        <span>Max: {formatValue ? formatValue(max) : `${prefix}${max.toLocaleString('en-IN')}${suffix}`}</span>
      </div>

      {/* Quick Presets Pills (if provided) */}
      {presets && presets.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <span className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400 mr-1">
            Quick:
          </span>
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onChange(preset.value)}
              className={`px-2 py-0.5 text-[11px] font-semibold rounded-lg border transition-all ${
                value === preset.value
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}

      {/* Optional helper hint */}
      {helperText && (
        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 font-medium">
          {helperText}
        </p>
      )}
    </div>
  );
};
