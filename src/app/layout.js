import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toast";
import { ToastProvider } from "@/hooks/use-toast";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// Font configuration
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata = {
  title: "Ghibli Image Recreator",
  description: "Transform your photos into magical Studio Ghibli-inspired artwork using AI",
};

/**
 * Root layout component that wraps the entire application
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ToastProvider>
            {children}
            <Toaster />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 