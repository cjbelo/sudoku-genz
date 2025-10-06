import React, { useEffect } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import { BrainIcon, ChartLineUpIcon, ClockIcon } from "@phosphor-icons/react";
import Footer from "@/components/Footer";
import MainNav from "@/components/MainNav";
import grid9x9 from "@/assets/9x9.svg";
import legoPlay from "@/assets/lego-playing-sudoku.webp";

export default function Landing() {
  useEffect(() => {
    AOS.init({ once: true, duration: 600, easing: "ease-out-quart" });
  }, []);

  return (
    <div className="bg-gray-50 text-gray-900 max-w-full overflow-x-hidden">
      <MainNav />

      <section className="py-20 text-white bg-gradient-to-br from-purple-600 to-indigo-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center md:flex-row">
            <div className="mb-10 md:mb-0 md:w-1/2" data-aos="fade-right">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl">Challenge Your Mind with Sudoku</h1>
              <p className="mb-8 text-xl opacity-90">
                The classic number puzzle that's fun, addictive, and great for your brain!
              </p>
              <Link
                to="/game"
                className="inline-block rounded-lg px-8 py-3 text-white transition-all
                           bg-gradient-to-br from-indigo-600 to-purple-600 shadow-md
                           pointer-fine:hover:-translate-y-0.5 pointer-fine:hover:shadow-lg"
              >
                Start Playing
              </Link>
            </div>

            <div className="flex justify-center md:w-1/2" data-aos="fade-left">
              <img src={grid9x9} alt="Sudoku grid" className="h-64 w-64 rounded-xl shadow-md" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">
            Why Play <span className="text-purple-600">Sudoku</span>?
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="feature-card rounded-xl bg-white p-6 shadow-md" data-aos="fade-up" data-aos-delay="100">
              <BrainIcon size={32} className="mb-2 text-purple-600" />
              <h3 className="mb-3 text-xl font-bold text-gray-800">Improves Memory</h3>
              <p className="text-gray-600">
                Sudoku helps strengthen your memory as you work to remember which numbers are needed in each square.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md" data-aos="fade-up" data-aos-delay="200">
              <ClockIcon size={32} className="mb-2 text-purple-600" />
              <h3 className="mb-3 text-xl font-bold text-gray-800">Reduces Stress</h3>
              <p className="text-gray-600">
                Focusing on solving puzzles can help calm your mind and reduce stress levels.
              </p>
            </div>

            <div className="feature-card rounded-xl bg-white p-6 shadow-md" data-aos="fade-up" data-aos-delay="300">
              <ChartLineUpIcon size={32} className="mb-2 text-purple-600" />
              <h3 className="mb-3 text-xl font-bold text-gray-800">Boosts Concentration</h3>
              <p className="text-gray-600">
                Playing Sudoku requires focus and concentration, helping to improve these skills over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-to-play" className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">How to Play Sudoku</h2>

          <div className="grid grid-cols-1 items-strech gap-6 md:grid-cols-2">
            <div data-aos="fade-right" className="flex flex-col justify-between">
              <div className="mb-6 rounded-xl bg-white p-6 shadow-md">
                <h3 className="mb-3 flex items-center text-xl font-bold text-gray-800">
                  <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white">
                    1
                  </span>
                  The Grid
                </h3>
                <p className="text-gray-600">
                  Sudoku is played on a 9x9 grid, divided into nine 3x3 subgrids called "regions". Some cells contain
                  numbers (given), while others are empty.
                </p>
              </div>

              <div className="mb-6 rounded-xl bg-white p-6 shadow-md">
                <h3 className="mb-3 flex items-center text-xl font-bold text-gray-800">
                  <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white">
                    2
                  </span>
                  The Rules
                </h3>
                <p className="text-gray-600">
                  Fill the empty cells with numbers from 1 to 9 so that each row, each column, and each 3x3 region
                  contains all digits from 1 to 9 exactly once.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-md">
                <h3 className="mb-3 flex items-center text-xl font-bold text-gray-800">
                  <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white">
                    3
                  </span>
                  The Strategy
                </h3>
                <p className="text-gray-600">
                  Start with the obvious numbers, then use elimination to determine possible numbers for each cell. Look
                  for numbers that can only go in one place.
                </p>
              </div>
            </div>

            <div data-aos="fade-left" className="flex">
              <img
                src={legoPlay}
                alt="Lego Playing Sudoku"
                className="w-full h-full rounded-xl shadow-md object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 text-white bg-gradient-to-br from-purple-500 to-indigo-500">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold">Ready to Challenge Yourself?</h2>
          <p className="mb-8 text-xl opacity-90">Join thousands of players enjoying Sudoku every day!</p>
          <Link
            to="/game"
            className="inline-block rounded-lg bg-white px-8 py-3 font-bold text-purple-600 transition
                       pointer-fine:hover:bg-gray-100"
          >
            Play Sudoku Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
