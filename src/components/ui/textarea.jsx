"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Textarea component with custom styling
 */
const Textarea = forwardRef(({ className, readOnly, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "glass-input px-4 py-3 min-h-[120px] w-full resize-y text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-500/30 transition-all duration-200 shadow-inner",
        readOnly && "focus:ring-0 focus:border-white/5 select-none",
        className
      )}
      readOnly={readOnly}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea }; 