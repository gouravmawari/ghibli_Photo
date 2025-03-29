"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CancellationAndRefund() {
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
          <h1 className="text-3xl font-bold mb-8 text-center gradient-text">Cancellation & Refund Policy</h1>
          
          <div className="space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">Last updated: {formattedDate}</p>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">1. Introduction</h2>
              <p>
                At Ghibli Image Generator (https://ghiblii.netlify.app/), we want to be clear about our 
                cancellation and refund policies. Please read this policy carefully before using our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">2. Processing Time Policy</h2>
              <div className="bg-white/5 p-6 rounded-lg">
                <p className="text-lg font-semibold text-white/90 mb-2">Important Notice:</p>
                <p>
                  Once an image is uploaded and processing begins, we cannot cancel the request or provide 
                  a refund after 15 minutes from the upload time. The generated image will be sent to your 
                  email within this timeframe.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">3. Cancellation Policy</h2>
              <p>
                Our cancellation policy is as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cancellation is only possible within 15 minutes of image upload</li>
                <li>After 15 minutes, the image processing cannot be cancelled</li>
                <li>To cancel, you must contact us immediately after upload</li>
                <li>We will confirm your cancellation via email</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">4. Refund Policy</h2>
              <p>
                Our refund policy is as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Refunds are only available for cancellations within 15 minutes of upload</li>
                <li>No refunds will be provided after the 15-minute processing period</li>
                <li>Refund requests must be submitted in writing to our support email</li>
                <li>Refunds will be processed within 5-7 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">5. Processing Timeline</h2>
              <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-white/90">Important Timeline:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>0-15 minutes: Cancellation and refund possible</li>
                  <li>15+ minutes: Processing completed, no cancellation or refund available</li>
                  <li>Image will be delivered to your email within 15 minutes</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">6. How to Request Cancellation</h2>
              <p>
                To request a cancellation:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact us immediately at gauravmawari40@gmail.com</li>
                <li>Include your order details and upload time</li>
                <li>Provide the email address used for the upload</li>
                <li>Request must be made within 15 minutes of upload</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">7. Exceptions</h2>
              <p>
                Exceptions to our cancellation and refund policy may be considered in the following cases:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Technical issues preventing image generation</li>
                <li>Service downtime or system errors</li>
                <li>Incorrect email address provided by the user</li>
                <li>Force majeure events beyond our control</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">8. Contact Information</h2>
              <p>
                For any questions about our cancellation and refund policy, please contact us at:
              </p>
              <p className="mt-2">
                <a 
                  href="mailto:gauravmawari40@gmail.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  gauravmawari40@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">9. Policy Updates</h2>
              <p>
                We reserve the right to update this Cancellation & Refund Policy at any time. 
                Any changes will be posted on this page with an updated revision date.
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