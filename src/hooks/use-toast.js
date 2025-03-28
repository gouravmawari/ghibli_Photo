"use client";

import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Context to manage toast notifications
const ToastContext = createContext({
  toasts: [],
  toast: () => {},
  removeToast: () => {},
});

/**
 * Toast provider component to wrap application
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Add a new toast notification
  const toast = ({ title, message, type = "default", duration = 5000 }) => {
    const id = uuidv4();
    const newToast = { id, title, message, type, duration };
    
    setToasts((current) => [...current, newToast]);
    
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
    
    return id;
  };

  // Remove a toast notification by ID
  const removeToast = (id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

/**
 * Hook to use toast functionality
 * @returns {Object} Toast methods and state
 */
export function useToast() {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  
  return context;
} 