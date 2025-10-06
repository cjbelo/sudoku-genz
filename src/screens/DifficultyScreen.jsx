import { useAppStore } from "@/stores";
import LevelButtons from "@/components/LevelButtons";
import { SignOutIcon } from "@phosphor-icons/react";

const DifficultyScreen = () => {
  const { currentUserDisplay, toggleLogoutModal } = useAppStore();
  return (
    <>
      <header className="flex justify-end items-center gap-3 w-full mb-4">
        <span className="text-purple-800">Hello, {currentUserDisplay}</span>
        <button className="p-2 rounded-full bg-white shadow cursor-pointer" onClick={toggleLogoutModal}>
          <SignOutIcon size={22} />
        </button>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Choose Difficulty</h1>
          <p className="text-gray-600">Select your challenge level</p>
        </div>
        <LevelButtons />
      </div>
    </>
  );
};

export default DifficultyScreen;
