import { Inter } from "next/font/google";
<<<<<<< HEAD
import { Toaster } from "@/components/ui/toast";
import { ToastProvider } from "@/hooks/use-toast";
import { ThemeProvider } from "@/components/theme-provider";
=======
>>>>>>> ceb7e6c (added pay message)
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/providers";

<<<<<<< HEAD
// Font configuration
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata = {
  title: "Ghibli Image Recreator",
  description: "Transform your photos into magical Studio Ghibli-inspired artwork using AI",
=======
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ghibli Image Generator",
  description: "Transform your photos into magical Studio Ghibli-inspired artwork using ChatGPT 4.5 for free",
>>>>>>> ceb7e6c (added pay message)
};

/**
 * Root layout component that wraps the entire application
 */
export default function RootLayout({ children }) {
  return (
<<<<<<< HEAD
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ToastProvider>
            {children}
            <Toaster />
=======
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CNFS2PEFG9"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CNFS2PEFG9');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            {children}
>>>>>>> ceb7e6c (added pay message)
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 