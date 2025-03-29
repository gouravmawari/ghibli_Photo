"use client";

<<<<<<< HEAD
import { ToastProvider } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toast";

export function Providers({ children }) {
  return (
    <ToastProvider>
      {children}
      <Toaster />
    </ToastProvider>
  );
=======
import { createContext, useContext, useState } from "react";
import { Toast } from "@/components/ui/toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, message, type = "info" }) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
>>>>>>> ceb7e6c (added pay message)
} 