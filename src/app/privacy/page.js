"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPolicy() {
  // Format date consistently
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold mb-8 text-center gradient-text">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">Last updated: {formattedDate}</p>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">1. Introduction</h2>
              <p>
                At Ghibli Image Generator (https://ghiblii.netlify.app/), we take your privacy seriously. 
                This Privacy Policy explains how we collect, use, and protect your personal information when you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">2. Information We Collect</h2>
              <p>
                We collect minimal personal information to provide our service:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email address (for sending generated images)</li>
                <li>Images you upload (temporarily during processing)</li>
                <li>Usage data and analytics (through Google Analytics)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">3. Image Processing and Storage</h2>
              <p>
                We want to be clear about our image handling practices:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We do not permanently store any uploaded images on our servers</li>
                <li>Images are processed in real-time and immediately deleted after processing</li>
                <li>Generated images are sent directly to your email and not stored on our servers</li>
                <li>We use secure, encrypted connections for all image transfers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">4. How We Use Your Information</h2>
              <p>
                Your information is used solely for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processing your image generation requests</li>
                <li>Sending your generated images to your email</li>
                <li>Improving our service quality</li>
                <li>Analyzing website usage patterns (through Google Analytics)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">5. Data Protection</h2>
              <p>
                We implement several security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Secure HTTPS connections for all data transfers</li>
                <li>No permanent storage of user images</li>
                <li>Email addresses are used only for sending generated images</li>
                <li>Regular security audits of our systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">6. Third-Party Services</h2>
              <p>
                We use the following third-party services:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google Analytics for website analytics</li>
                <li>Email service providers for sending generated images</li>
                <li>AI processing services for image generation</li>
              </ul>
              <p className="mt-2">
                Each of these services has their own privacy policies and data handling practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">7. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of analytics tracking</li>
                <li>Contact us with privacy concerns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">8. Cookies</h2>
              <p>
                We use minimal cookies for essential website functionality and analytics. 
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">9. Children's Privacy</h2>
              <p>
                Our service is not intended for children under 13. We do not knowingly collect 
                personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">10. Changes to Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">11. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us through our Contact Us page.
              </p>
            </section>
          </div>

          <div className="mt-8 text-center">
            <Link href="/">
              <Button variant="gradient">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 