import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 text-gray-900">
      <div className="w-full max-w-2xl text-center px-6">
        <div className="rounded-2xl p-8 text-white bg-gradient-to-br from-purple-500 to-indigo-500 shadow-md">
          <h1 className="text-5xl font-extrabold tracking-tight">404</h1>
          <p className="mt-2 text-lg opacity-90">Page not found</p>
        </div>

        <div className="mt-6 rounded-xl bg-white p-6 shadow-md">
          <p className="text-gray-600">The page you're looking for doesn't exist or may have moved.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex justify-center rounded-lg px-5 py-2.5 bg-purple-600 text-white
                        pointer-fine:hover:bg-purple-700 transition"
            >
              Go Home
            </Link>
            <Link
              to="/game"
              className="inline-flex justify-center rounded-lg px-5 py-2.5 bg-white text-purple-600
                         border border-purple-200 pointer-fine:hover:bg-purple-50 transition"
            >
              Play Sudoku
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
