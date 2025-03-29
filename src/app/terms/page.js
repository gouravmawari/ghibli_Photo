"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TermsAndConditions() {
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold mb-8 text-center gradient-text">Terms and Conditions</h1>
          
          <div className="space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">Last updated: {formattedDate}</p>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">1. Introduction</h2>
              <p>
                Welcome to Ghibli Image Generator (hereinafter referred to as "the Service"), accessible at https://ghiblii.netlify.app/. 
                By using our Service, you agree to be bound by these Terms and Conditions. Please read them carefully before using our Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">2. Service Description</h2>
              <p>
                Ghibli Image Generator is an AI-powered service that transforms user-uploaded images into Studio Ghibli-inspired artwork. 
                The Service uses advanced machine learning algorithms to generate artistic interpretations of uploaded images.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">3. User Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must be at least 13 years old to use this Service.</li>
                <li>You are responsible for maintaining the confidentiality of your email address.</li>
                <li>You agree not to use the Service for any illegal or unauthorized purpose.</li>
                <li>You must not upload any content that infringes on intellectual property rights.</li>
                <li>You must not attempt to reverse engineer or compromise the Service's security.</li>
                <li>You agree not to use the Service to generate inappropriate or offensive content.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">4. Image Upload Guidelines</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maximum file size: 5MB</li>
                <li>Supported formats: PNG, JPG, JPEG</li>
                <li>Images must be appropriate and not contain harmful or offensive content</li>
                <li>You must own or have permission to use the images you upload</li>
                <li>We reserve the right to reject any image that violates these guidelines</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">5. Processing Time and Delivery</h2>
              <p>
                While we aim to process and deliver generated images within 15 minutes, processing times may vary due to high volume. 
                We are not responsible for delays in email delivery or technical issues beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">6. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by Ghibli Image Generator and are protected 
                by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">7. User Content</h2>
              <p>
                By uploading images to our Service, you grant us a worldwide, non-exclusive, royalty-free license to use, process, 
                and transform your images for the purpose of providing the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">8. Privacy Policy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect 
                your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">9. Service Modifications</h2>
              <p>
                We reserve the right to modify or discontinue the Service at any time, with or without notice. We shall not be 
                liable to you or any third party for any modification, suspension, or discontinuance of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">10. Limitation of Liability</h2>
              <p>
                Ghibli Image Generator shall not be liable for any indirect, incidental, special, consequential, or punitive 
                damages resulting from your use or inability to use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">11. Changes to Terms</h2>
              <p>
                We reserve the right to update or change our Terms and Conditions at any time. We will notify you of any changes 
                by posting the new Terms and Conditions on this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">12. Contact Information</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us through our Contact Us page.
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