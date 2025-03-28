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
function Toast({ id, title, message, type = "default", onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  
  // Animation handling when closing
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  
  // Icons based on toast type
  const icons = {
    default: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    success: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  };
  
  return (
    <div
      className={cn(
        "flex w-80 items-start rounded-md border shadow-lg transition-all duration-300 transform",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
        type === "default" && "border-dark-border bg-dark-surface",
        type === "success" && "border-green-800 bg-dark-surface",
        type === "error" && "border-red-800 bg-dark-surface",
        type === "warning" && "border-amber-800 bg-dark-surface"
      )}
    >
      <div
        className={cn(
          "flex h-full items-center px-3 py-4",
          type === "default" && "text-primary",
          type === "success" && "text-green-500",
          type === "error" && "text-red-500",
          type === "warning" && "text-amber-500"
        )}
      >
        {icons[type]}
      </div>
      
      <div className="flex-1 px-1 py-4 mr-2">
        {title && <div className="font-medium text-sm">{title}</div>}
        {message && <div className="text-sm text-gray-300 mt-1">{message}</div>}
      </div>
      
      <button
        onClick={handleClose}
        className="p-2 rounded-md opacity-70 hover:opacity-100 transition-opacity"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
} 