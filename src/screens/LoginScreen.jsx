import { useState } from "react";
import { useAppStore } from "@/stores/appStore";
import { SignInIcon, UserIcon, XIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const LoginScreen = () => {
  const { login } = useAppStore();
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name.trim()) return;
    login(name.trim());
  };

  const handleLoginGuest = () => {
    login("guest");
  };

  return (
    <>
      <header className="flex justify-end w-full">
        <Link className="p-2 rounded-full bg-white shadow cursor-pointer" to="/">
          <XIcon />
        </Link>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center w-full">
        <div className="text-center mb-8 w-full max-w-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Sudoku <span className="text-purple-600">Gen Z</span>
          </h1>
          <p className="text-gray-600">Play the classic puzzle game with a modern twist</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white text-center">
            <h2 className="text-2xl font-bold">Let's Play!</h2>
            <p className="opacity-90">Choose how to continue</p>
          </div>

          <div className="p-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full mb-3 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleLogin}
              className="flex items-center justify-center gap-2 bg-indigo-500 text-white rounded-lg py-3 px-4
                      w-full transition-transform shadow-md cursor-pointer mb-4
                      pointer-fine:hover:-translate-y-1 active:scale-98"
            >
              <SignInIcon size={22} />
              {name ? `Play as ${name}` : "Login"}
            </button>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button
              onClick={handleLoginGuest}
              className="flex items-center justify-center gap-2 bg-gray-800 text-white rounded-lg py-3 px-4 w-full
                      transition-transform shadow-md cursor-pointer
                      pointer-fine:hover:-translate-y-1 active:scale-98"
            >
              <UserIcon size={22} />
              Play as Guest
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
