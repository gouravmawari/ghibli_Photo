"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactUs() {
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
          <h1 className="text-3xl font-bold mb-8 text-center gradient-text">Contact Us</h1>
          
          <div className="space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">Last updated: {formattedDate}</p>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">Get in Touch</h2>
              <p>
                We're here to help! If you have any questions, concerns, or need assistance with 
                your Ghibli-style artwork generation, please don't hesitate to contact us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">Primary Contact Method</h2>
              <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-white/90">Email Us</h3>
                <p className="text-lg">
                  <a 
                    href="mailto:gauravmawari40@gmail.com" 
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    gauravmawari40@gmail.com
                  </a>
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  We typically respond within 24 hours during business days.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">What to Include in Your Email</h2>
              <p>
                To help us assist you more effectively, please include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your name</li>
                <li>Order details (if applicable)</li>
                <li>Description of your issue or question</li>
                <li>Any relevant screenshots or attachments</li>
                <li>Your preferred contact method</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">Response Time</h2>
              <p>
                Our team strives to respond to all inquiries within 24 hours during business days. 
                For urgent issues related to image generation or delivery, we prioritize these 
                requests and aim to respond within 12 hours.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">Common Topics</h2>
              <p>
                Before contacting us, you might find answers to common questions in our:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Digital Delivery Policy</li>
                <li>Terms and Conditions</li>
                <li>Privacy Policy</li>
                <li>FAQ section</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">Business Hours</h2>
              <p>
                Our support team is available:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Monday - Friday: 9:00 AM - 6:00 PM IST</li>
                <li>Saturday: 10:00 AM - 4:00 PM IST</li>
                <li>Sunday: Closed</li>
              </ul>
              <p className="mt-2 text-sm text-gray-400">
                Note: Response times may be longer during weekends and holidays.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">Technical Support</h2>
              <p>
                For technical issues, please include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Browser information</li>
                <li>Device type and operating system</li>
                <li>Steps to reproduce the issue</li>
                <li>Error messages (if any)</li>
                <li>Screenshots of the problem</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white/90">Feedback</h2>
              <p>
                We value your feedback! If you have suggestions for improving our service or 
                would like to share your experience, please feel free to email us. Your input 
                helps us enhance the Ghibli Image Generator for everyone.
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