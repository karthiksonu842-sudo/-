import React from 'react';
import {
  Flame,
  Leaf,
  Drumstick,
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  Check,
} from 'lucide-react';
import { DietaryFilterState, SPICE_LEVEL_DETAILS } from '../data/dietaryUtils';
import { SpiceLevel } from '../types';

interface DietaryPreferencesBarProps {
  filters: DietaryFilterState;
  onChange: (newFilters: DietaryFilterState) => void;
  totalMatching: number;
  totalItems: number;
}

export const DietaryPreferencesBar: React.FC<DietaryPreferencesBarProps> = ({
  filters,
  onChange,
  totalMatching,
  totalItems,
}) => {
  const isFiltered =
    filters.dietaryType !== 'all' ||
    filters.spiceLevel !== 'all' ||
    filters.onlySpecials ||
    (filters.preferenceToggle && filters.preferenceToggle !== 'all');

  const handleDietaryTypeChange = (type: 'all' | 'veg' | 'non-veg') => {
    onChange({
      ...filters,
      dietaryType: type,
      preferenceToggle: type === 'all' ? 'all' : type,
    });
  };

  const handleSpiceLevelChange = (level: 'all' | SpiceLevel) => {
    onChange({
      ...filters,
      spiceLevel: level,
      preferenceToggle: level === 'spicy' || level === 'extra-spicy' ? 'spicy' : filters.preferenceToggle === 'spicy' ? 'all' : filters.preferenceToggle,
    });
  };

  const handleToggleSpecials = () => {
    onChange({
      ...filters,
      onlySpecials: !filters.onlySpecials,
    });
  };

  const handleReset = () => {
    onChange({
      dietaryType: 'all',
      spiceLevel: 'all',
      onlySpecials: false,
      preferenceToggle: 'all',
    });
  };

  return (
    <div
      id="dietary-preferences-control"
      className="bg-[#33080b]/90 border border-[#F4C928]/30 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm transition-all duration-300"
    >
      {/* Top Header Bar with Live Match Counter & Reset */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3.5 mb-3.5 border-b border-[#F4C928]/15">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#4A0F12] border border-[#F4C928]/40 flex items-center justify-center text-[#F4C928]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-wider text-[#FFF4D6] uppercase font-cinzel">
              Dietary Preferences
            </span>
            <span className="hidden sm:inline-block text-[11px] text-neutral-400 ml-2">
              Refine by vegetarian diet & spice heat
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Active Status Badge */}
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#240507] border border-[#F4C928]/25 text-[#F4C928]">
            {totalMatching} of {totalItems} dishes
          </span>

          {/* Reset Button */}
          {isFiltered && (
            <button
              type="button"
              onClick={handleReset}
              id="reset-dietary-preferences-btn"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-white bg-[#4A0F12]/80 hover:bg-[#5e1418] px-2.5 py-1 rounded-full border border-amber-400/30 transition-all active:scale-95 shadow-sm"
              title="Reset all dietary preferences to show all dishes"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3.5">
        {/* Row 1: Global Dietary Choice (All / Veg / Non-Veg) & Specials */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Dietary Type Toggles */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mr-1 shrink-0">
              Diet:
            </span>

            {/* All Dishes */}
            <button
              type="button"
              id="pref-diet-all"
              onClick={() => handleDietaryTypeChange('all')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                filters.dietaryType === 'all'
                  ? 'bg-gradient-to-r from-[#F4C928] to-[#E5B81B] text-[#2B0709] shadow-md font-extrabold'
                  : 'bg-[#240507] text-neutral-300 hover:text-white hover:bg-[#3d0b0f] border border-[#F4C928]/20'
              }`}
            >
              <span>All Dishes</span>
            </button>

            {/* Only Vegetarian */}
            <button
              type="button"
              id="pref-diet-veg"
              onClick={() => handleDietaryTypeChange('veg')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                filters.dietaryType === 'veg'
                  ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/50'
                  : 'bg-[#240507] text-emerald-400 hover:bg-emerald-950/40 border border-emerald-500/30'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>Only Vegetarian</span>
              {filters.dietaryType === 'veg' && <Check className="w-3 h-3 ml-0.5" />}
            </button>

            {/* Non-Vegetarian Only */}
            <button
              type="button"
              id="pref-diet-non-veg"
              onClick={() => handleDietaryTypeChange('non-veg')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                filters.dietaryType === 'non-veg'
                  ? 'bg-red-600 text-white shadow-md ring-2 ring-red-400/50'
                  : 'bg-[#240507] text-red-400 hover:bg-red-950/40 border border-red-500/30'
              }`}
            >
              <Drumstick className="w-3.5 h-3.5" />
              <span>Non-Veg Only</span>
              {filters.dietaryType === 'non-veg' && <Check className="w-3 h-3 ml-0.5" />}
            </button>
          </div>

          {/* Quick Chef's Specials Toggle */}
          <button
            type="button"
            id="pref-toggle-specials"
            onClick={handleToggleSpecials}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all self-start sm:self-auto ${
              filters.onlySpecials
                ? 'bg-[#F4C928] text-[#2B0709] shadow-md ring-2 ring-[#F4C928]/50'
                : 'bg-[#240507] text-[#F4C928] hover:bg-[#3d0b0f] border border-[#F4C928]/25'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chef&apos;s Specials Only</span>
          </button>
        </div>

        {/* Row 2: Spicy Levels Filter */}
        <div className="pt-2 border-t border-[#F4C928]/10 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 shrink-0">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Spice Heat:
            </span>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 flex-1">
            {/* Any Heat */}
            <button
              type="button"
              id="pref-spice-all"
              onClick={() => handleSpiceLevelChange('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all text-center ${
                filters.spiceLevel === 'all'
                  ? 'bg-[#F4C928] text-[#2B0709] font-bold shadow'
                  : 'bg-[#240507] text-neutral-300 hover:text-white hover:bg-[#3d0b0f] border border-[#F4C928]/20'
              }`}
            >
              All Spice Levels
            </button>

            {/* Mild (Level 1) */}
            <button
              type="button"
              id="pref-spice-mild"
              onClick={() => handleSpiceLevelChange('mild')}
              title={SPICE_LEVEL_DETAILS.mild.description}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                filters.spiceLevel === 'mild'
                  ? 'bg-emerald-600 text-white font-bold shadow ring-2 ring-emerald-300/60'
                  : 'bg-[#240507] text-emerald-300 hover:bg-emerald-950/40 border border-emerald-500/30'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 fill-emerald-400/30 shrink-0" />
              <span>Mild</span>
              <span className="text-[10px] opacity-75 hidden md:inline">(Kid-friendly)</span>
            </button>

            {/* Medium (Level 2) */}
            <button
              type="button"
              id="pref-spice-medium"
              onClick={() => handleSpiceLevelChange('medium')}
              title={SPICE_LEVEL_DETAILS.medium.description}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                filters.spiceLevel === 'medium'
                  ? 'bg-amber-500 text-black font-bold shadow ring-2 ring-amber-300/60'
                  : 'bg-[#240507] text-amber-300 hover:bg-amber-950/40 border border-amber-500/30'
              }`}
            >
              <Flame className="w-3.5 h-3.5 fill-amber-400/40 shrink-0" />
              <span>Medium</span>
              <span className="text-[10px] opacity-75 hidden md:inline">(Balanced)</span>
            </button>

            {/* Spicy (Level 3) */}
            <button
              type="button"
              id="pref-spice-spicy"
              onClick={() => handleSpiceLevelChange('spicy')}
              title={SPICE_LEVEL_DETAILS.spicy.description}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                filters.spiceLevel === 'spicy'
                  ? 'bg-red-600 text-white font-bold shadow ring-2 ring-red-400/60'
                  : 'bg-[#240507] text-red-400 hover:bg-red-950/40 border border-red-500/30'
              }`}
            >
              <div className="flex items-center -space-x-1 shrink-0">
                <Flame className="w-3 h-3 fill-orange-400/40" />
                <Flame className="w-3.5 h-3.5 text-red-400 fill-red-500/50" />
              </div>
              <span>Spicy</span>
              <span className="text-[10px] opacity-75 hidden md:inline">(Hyderabadi)</span>
            </button>

            {/* Extra Spicy (Level 4) */}
            <button
              type="button"
              id="pref-spice-extra-spicy"
              onClick={() => handleSpiceLevelChange('extra-spicy')}
              title={SPICE_LEVEL_DETAILS['extra-spicy'].description}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                filters.spiceLevel === 'extra-spicy'
                  ? 'bg-rose-600 text-white font-bold shadow ring-2 ring-rose-400/60'
                  : 'bg-[#240507] text-rose-400 hover:bg-rose-950/40 border border-rose-500/30'
              }`}
            >
              <div className="flex items-center -space-x-1.5 shrink-0">
                <Flame className="w-2.5 h-2.5 text-orange-400" />
                <Flame className="w-3.5 h-3.5 text-red-400 fill-red-500 animate-pulse" />
                <Flame className="w-2.5 h-2.5 text-rose-400" />
              </div>
              <span>Extra Spicy</span>
              <span className="text-[10px] opacity-75 hidden md:inline">(Fiery)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Dietary Summary Chips (if any filter is selected) */}
      {isFiltered && (
        <div className="mt-3 pt-2.5 border-t border-[#F4C928]/10 flex items-center gap-2 flex-wrap text-[11px] text-neutral-300">
          <span className="text-neutral-400 font-medium">Applied:</span>
          {filters.dietaryType === 'veg' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
              <Leaf className="w-3 h-3" /> Only Vegetarian
            </span>
          )}
          {filters.dietaryType === 'non-veg' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-950/80 text-red-300 border border-red-500/30">
              <Drumstick className="w-3 h-3" /> Non-Vegetarian Only
            </span>
          )}
          {filters.spiceLevel !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-950/80 text-orange-300 border border-orange-500/30">
              <Flame className="w-3 h-3" /> {SPICE_LEVEL_DETAILS[filters.spiceLevel].label} Heat
            </span>
          )}
          {filters.onlySpecials && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-3 h-3" /> Chef&apos;s Specials
            </span>
          )}
        </div>
      )}
    </div>
  );
};
