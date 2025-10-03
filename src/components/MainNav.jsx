import { useState } from "react";
import { Link } from "react-router-dom";
import { ListIcon, XIcon } from "@phosphor-icons/react"; // burger + close icons
import HowToPlayLink from "./HowToPlayLink";

const MainNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">
              Sudoku <span className="text-purple-600">Gen Z</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-600 pointer-fine:hover:text-purple-600">
              Home
            </Link>
            <HowToPlayLink className="text-gray-600 pointer-fine:hover:text-purple-600" />
            <Link
              to="/game"
              className="rounded-lg bg-purple-600 px-4 py-2 text-white transition pointer-fine:hover:bg-purple-700"
            >
              Play Now
            </Link>
          </div>

          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <XIcon size={28} /> : <ListIcon size={28} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-inner border-t border-gray-200">
          <div className="flex flex-col items-end space-y-3 p-4">
            <Link
              to="/"
              className="text-gray-600 pointer-fine:hover:text-purple-600"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <HowToPlayLink
              className="text-gray-600 pointer-fine:hover:text-purple-600"
              onClick={() => setMenuOpen(false)}
            />
            <Link
              to="/game"
              className="rounded-lg bg-purple-600 px-6 py-2 text-white transition pointer-fine:hover:bg-purple-700 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Play Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNav;
