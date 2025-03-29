"use client";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

/**
 * Toast container that displays all active toast notifications
 */
export function Toaster() {
  const { toasts, removeToast } = useToast();
  
  return (
    <div className="fixed top-0 right-0 z-50 flex flex-col items-end gap-2 p-4 max-h-screen overflow-hidden sm:p-6">
      {toasts.map((toast) => (
        <Toast 
          key={toast.id}
          id={toast.id} 
          title={toast.title} 
          message={toast.message} 
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

/**
 * Individual toast notification
 */
export function Toast({ message, type = "info", onClose, duration = 5000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const baseStyles = "px-4 py-3 rounded-lg shadow-lg backdrop-blur-md border flex items-center gap-2 min-w-[300px] max-w-md";
  
  const typeStyles = {
    success: "bg-green-500/10 border-green-500/20 text-green-400",
    error: "bg-red-500/10 border-red-500/20 text-red-400",
    info: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
  };

  return (
    <div className={cn(baseStyles, typeStyles[type])}>
      {type === "success" && (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
      {type === "error" && (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {type === "info" && (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
      {type === "warning" && (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
} 