import React, { useEffect } from "react";
import Footer from "@/components/Footer";
import AOS from "aos";
import MainNav from "@/components/MainNav";
import { GitBranchIcon, GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";

const LINKEDIN_URL = "https://www.linkedin.com/in/cjbelo";
const GITHUB_URL = "https://github.com/cjbelo";
const REPO_URL = "https://github.com/cjbelo/sudoku-genz";

export default function Contact() {
  useEffect(() => {
    AOS.init({ once: true, duration: 600, easing: "ease-out-quart" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <MainNav />

      <main className="flex-grow">
        <section className="py-16 text-white bg-gradient-to-br from-purple-500 to-indigo-500">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-aos="fade-down">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="mt-3 opacity-90">We'd love to hear from you.</p>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl bg-white p-6 shadow-md space-y-6" data-aos="fade-up">
              <p>
                Have feedback, found a bug, or want to collaborate? Reach out through any of the links below or open an
                issue in the repository.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-gray-200 p-5 text-center transition
                           pointer-fine:hover:-translate-y-1 pointer-fine:hover:shadow-md"
                >
                  <LinkedinLogoIcon size={32} className="mb-2 text-blue-600 inline" />
                  <div className="font-semibold">LinkedIn</div>
                  <div className="text-sm text-gray-500 mt-1 break-all">{LINKEDIN_URL}</div>
                </a>

                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-gray-200 p-5 text-center transition
                           pointer-fine:hover:-translate-y-1 pointer-fine:hover:shadow-md"
                >
                  <GithubLogoIcon size={32} className="mb-2 text-gray-800 inline" />
                  <div className="font-semibold">GitHub</div>
                  <div className="text-sm text-gray-500 mt-1 break-all">{GITHUB_URL}</div>
                </a>

                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-gray-200 p-5 text-center transition
                           pointer-fine:hover:-translate-y-1 pointer-fine:hover:shadow-md"
                >
                  <GitBranchIcon size={32} className="mb-2 text-gray-800 inline" />
                  <div className="font-semibold">Project Repo</div>
                  <div className="text-sm text-gray-500 mt-1 break-all">{REPO_URL}</div>
                </a>
              </div>

              <div className="rounded-xl bg-gray-50 p-5">
                <h2 className="text-lg font-semibold mb-2">Quick message</h2>
                <p className="text-gray-600">
                  Prefer email or a quick note? You can send it to{" "}
                  <a href="mailto:belo.cj@gmail.com" className="text-purple-600 pointer-fine:hover:underline">
                    belo.cj@gmail.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
