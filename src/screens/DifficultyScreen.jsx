import FeatherIcon from "feather-icons-react";
import { useAppStore } from "@/stores/appStore";

const DifficultyScreen = () => {
  const { currentUser, logout, setDifficulty } = useAppStore();

  const handleSetDifficulty = (difficulty) => {
    setDifficulty(difficulty);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="flex justify-end items-center gap-3 w-full mb-4">
        <span className="text-purple-800">Hello, {currentUser}</span>
        <button className="p-2 rounded-full bg-white shadow cursor-pointer" onClick={handleLogout}>
          <FeatherIcon icon="log-out" />
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Choose Difficulty</h1>
          <p className="text-gray-600">Select your challenge level</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSetDifficulty("easy")}
            className="difficulty-card bg-white rounded-xl shadow-md p-6 text-center transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="text-4xl mb-4">😊</div>
            <h3 className="font-bold text-lg text-green-600">Easy</h3>
            <p className="text-gray-500 text-sm">Perfect for beginners</p>
          </button>

          <button
            onClick={() => handleSetDifficulty("medium")}
            className="difficulty-card bg-white rounded-xl shadow-md p-6 text-center transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="text-4xl mb-4">😎</div>
            <h3 className="font-bold text-lg text-blue-600">Medium</h3>
            <p className="text-gray-500 text-sm">Balanced challenge</p>
          </button>

          <button
            onClick={() => handleSetDifficulty("hard")}
            className="difficulty-card bg-white rounded-xl shadow-md p-6 text-center transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="text-4xl mb-4">🧐</div>
            <h3 className="font-bold text-lg text-yellow-600">Hard</h3>
            <p className="text-gray-500 text-sm">For puzzle lovers</p>
          </button>

          <button
            onClick={() => handleSetDifficulty("expert")}
            className="difficulty-card bg-white rounded-xl shadow-md p-6 text-center transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="text-4xl mb-4">🤯</div>
            <h3 className="font-bold text-lg text-red-600">Expert</h3>
            <p className="text-gray-500 text-sm">Only for masters</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default DifficultyScreen;
