import React, { useEffect } from "react";
import AOS from "aos";
import Footer from "@/components/Footer";
import MainNav from "@/components/MainNav";

export default function Terms() {
  useEffect(() => {
    AOS.init({ once: true, duration: 600, easing: "ease-out-quart" });
  }, []);

  return (
    <div className="bg-gray-50 text-gray-900">
      <MainNav />

      <section className="py-16 text-white bg-gradient-to-br from-purple-500 to-indigo-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-aos="fade-down">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="mt-3 opacity-90">Please read these terms carefully.</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-6 shadow-md space-y-6" data-aos="fade-up">
            <p>
              These Terms of Service ("Terms") govern your use of our website and game (the "Service"). By accessing or
              using the Service, you agree to be bound by these Terms.
            </p>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Use of the Service</h2>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>You agree to use the Service only for lawful purposes.</li>
                <li>You will not attempt to disrupt or interfere with the Service's operation.</li>
                <li>We may update, modify, or discontinue parts of the Service at any time.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Accounts & Content</h2>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>You are responsible for maintaining the confidentiality of any account credentials.</li>
                <li>
                  Game progress and statistics stored locally or with your account may be cleared by you at any time.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Intellectual Property</h2>
              <p className="text-gray-700">
                The Service, including its design and content, is owned by the project owner. You may not copy, modify,
                distribute, or create derivative works without permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Disclaimer & Limitation of Liability</h2>
              <p className="text-gray-700">
                The Service is provided “as is” without warranties of any kind. To the maximum extent permitted by law,
                we are not liable for any indirect, incidental, or consequential damages arising from your use of the
                Service.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Changes to Terms</h2>
              <p className="text-gray-700">
                We may update these Terms from time to time. Continued use of the Service after changes means you accept
                the revised Terms.
              </p>
            </div>

            <p className="text-sm text-gray-500">Last updated: {new Date().getFullYear()}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
