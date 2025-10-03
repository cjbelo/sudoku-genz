import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold">
              Sudoku <span className="text-purple-400">Gen Z</span>
            </span>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-purple-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-purple-400">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-purple-400">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Sudoku-GenZ.netlify.app. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
