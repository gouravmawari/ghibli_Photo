"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ShippingPolicy() {
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
          <h1 className="text-3xl font-bold mb-8 text-center gradient-text">Digital Delivery Policy</h1>
          
          <div className="space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">Last updated: {formattedDate}</p>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">1. Digital Delivery Process</h2>
              <p>
                At Ghibli Image Generator (https://ghiblii.netlify.app/), we provide digital delivery 
                of your generated artwork directly to your email address. This policy outlines our 
                delivery process and timing expectations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">2. Delivery Method</h2>
              <p>
                Your generated artwork will be delivered via email to the address you provide during 
                the image generation process. We do not provide physical shipping as all our products 
                are digital in nature.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">3. Processing Time</h2>
              <p>
                While we aim to process and deliver your generated artwork within 15 minutes, 
                please note that processing times may vary due to high volume of requests. 
                In such cases, delivery may be delayed by 12-24 hours.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">4. Delivery Delays</h2>
              <p>
                We want to be transparent about potential delays:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>High volume periods may result in delays of 12-24 hours</li>
                <li>Technical issues beyond our control may affect delivery times</li>
                <li>Email delivery delays from your email provider</li>
                <li>Server maintenance or updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">5. What to Do If Delayed</h2>
              <p>
                If you haven't received your generated artwork within the expected timeframe:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Check your spam/junk folder</li>
                <li>Verify the email address you provided</li>
                <li>Wait for the full 24-hour period</li>
                <li>Contact us through our support channels if still not received</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">6. Quality Assurance</h2>
              <p>
                We ensure the quality of your generated artwork before delivery:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All images are processed through quality checks</li>
                <li>We verify the image format and resolution</li>
                <li>We ensure the file size is optimized for email delivery</li>
                <li>We maintain the highest quality possible within email size limits</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">7. Technical Requirements</h2>
              <p>
                To ensure successful delivery:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide a valid email address</li>
                <li>Ensure your email inbox has sufficient storage space</li>
                <li>Check your email provider's spam settings</li>
                <li>Use an email address that accepts attachments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">8. Support and Assistance</h2>
              <p>
                If you experience any issues with delivery:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Our support team is available to assist you</li>
                <li>We can resend your generated artwork if needed</li>
                <li>We provide troubleshooting guidance for common issues</li>
                <li>We maintain records of all delivery attempts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">9. Updates to Policy</h2>
              <p>
                We may update this Digital Delivery Policy from time to time to reflect changes 
                in our delivery process or timing expectations. Any changes will be posted on this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">10. Contact Us</h2>
              <p>
                If you have any questions about our delivery process or experience any issues, 
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