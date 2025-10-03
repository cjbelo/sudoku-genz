import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import Footer from "@/components/Footer";
import MainNav from "@/components/MainNav";

export default function Privacy() {
  useEffect(() => {
    AOS.init({ once: true, duration: 600, easing: "ease-out-quart" });
  }, []);

  return (
    <div className="bg-gray-50 text-gray-900">
      <MainNav />

      {/* Header */}
      <section className="py-16 text-white bg-gradient-to-br from-purple-500 to-indigo-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-aos="fade-down">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-3 opacity-90">Your privacy matters to us.</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-6 shadow-md space-y-6" data-aos="fade-up">
            <p>
              This Privacy Policy explains how we collect, use, and safeguard information when you use our website and
              game (collectively, the “Service”). By using the Service, you agree to the collection and use of
              information in accordance with this policy.
            </p>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>
                  <span className="font-medium">Usage data:</span> non-identifying information about how you interact
                  with the Service (e.g., pages viewed, actions taken).
                </li>
                <li>
                  <span className="font-medium">Device data:</span> information from your device or browser needed to
                  operate and improve the Service.
                </li>
                <li>
                  <span className="font-medium">Optional data:</span> if you create an account or save progress, we may
                  store a username and game stats.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">How We Use Information</h2>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>To operate, maintain, and improve the Service.</li>
                <li>To personalize gameplay (e.g., difficulty, stats, preferences).</li>
                <li>To monitor performance, prevent abuse, and ensure reliability.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Cookies & Local Storage</h2>
              <p className="text-gray-700">
                We may use cookies and local storage to keep preferences, sessions, or progress. You can disable cookies
                in your browser, but some features might not work properly.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Data Sharing</h2>
              <p className="text-gray-700">
                We do not sell personal information. We may share non-identifying data with service providers strictly
                to help us run the Service (e.g., analytics, hosting), under confidentiality obligations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Security</h2>
              <p className="text-gray-700">
                We use reasonable safeguards to protect information. However, no method of transmission or storage is
                100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Children's Privacy</h2>
              <p className="text-gray-700">
                The Service is intended for general audiences. If you believe a child has provided us information,
                please contact us, and we’ll take appropriate steps to remove it.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Changes</h2>
              <p className="text-gray-700">
                We may update this policy from time to time. Changes will be posted on this page with an updated
                effective date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Contact</h2>
              <p className="text-gray-700">
                If you have questions about this policy, please{" "}
                <Link to="/contact" className="text-purple-600 pointer-fine:hover:underline">
                  contact us
                </Link>
                .
              </p>
            </div>

            <p className="text-sm text-gray-500">Effective date: {new Date().getFullYear()}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
