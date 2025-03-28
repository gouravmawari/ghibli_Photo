"use client";

import { cn } from "@/lib/utils";

/**
 * Button component for selecting style presets
 */
export default function StylePresetButton({ active, label, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-all duration-300 overflow-hidden backdrop-blur-xl",
        active 
          ? "bg-indigo-900/30 border border-white/10 text-indigo-300 shadow-sm"
          : "bg-zinc-900/30 border border-white/5 hover:border-white/10 hover:bg-zinc-800/40 text-gray-300 hover:text-white"
      )}
    >
      <span className={cn(
        "flex items-center justify-center p-1.5 rounded-lg", 
        active ? "bg-indigo-500/20 text-indigo-300" : "bg-black/20 text-gray-300 group-hover:text-white"
      )}>
        {icon}
      </span>
      <span>{label}</span>
      {active && (
        <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5"></span>
      )}
    </button>
  );
} 