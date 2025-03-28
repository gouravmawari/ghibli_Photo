"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Button component with various styles and states
 */
const Button = forwardRef(
  ({ className, variant = "default", size = "default", disabled, isLoading, icon, children, ...props }, ref) => {
    // Size variants
    const sizeClasses = {
      sm: "text-xs h-9 px-3.5",
      default: "text-sm h-11 px-5",
      lg: "text-base h-12 px-6",
      icon: "h-11 w-11 p-2.5"
    };

    // Style variants
    const variantClasses = {
      default: "bg-indigo-500/90 hover:bg-indigo-600/90 text-white shadow-sm shadow-indigo-500/10 backdrop-blur-md",
      secondary: "bg-zinc-900/30 backdrop-blur-xl hover:bg-zinc-800/40 text-white border border-white/5 hover:border-white/10 shadow-sm",
      outline: "bg-zinc-900/20 backdrop-blur-xl hover:bg-zinc-800/30 text-white border border-white/10 hover:border-white/20",
      ghost: "bg-transparent hover:bg-zinc-800/20 backdrop-blur-xl text-white",
      gradient: "relative bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-blue-500/90 hover:from-indigo-600/90 hover:via-purple-600/90 hover:to-blue-600/90 text-white shadow-sm shadow-indigo-500/10 backdrop-blur-md",
      destructive: "bg-red-600/90 hover:bg-red-700/90 text-white shadow-sm shadow-red-500/10 backdrop-blur-md"
    };

    // Loading indicator
    const LoadingSpinner = () => (
      <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    );
    
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "btn rounded-xl font-medium relative transition-all duration-300",
          sizeClasses[size],
          variantClasses[variant],
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="opacity-0">{children}</span>
            <span className="absolute inset-0 flex items-center justify-center">
              <LoadingSpinner />
            </span>
          </>
        ) : (
          <>
            {icon && <span className="mr-2.5">{icon}</span>}
            {children}
            {variant === "gradient" && (
              <span className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-20 transition-opacity rounded-xl"></span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button }; 