"use client";

import { ToastProvider } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toast";

export function Providers({ children }) {
  return (
    <ToastProvider>
      {children}
      <Toaster />
    </ToastProvider>
  );
} 