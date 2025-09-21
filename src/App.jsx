import { useAppStore } from "@/stores/appStore";
import DifficultyScreen from "@/screens/DifficultyScreen";
import GameScreen from "@/screens/GameScreen";
import LoginScreen from "@/screens/LoginScreen";
import ResultScreen from "@/screens/ResultScreen";
import LogoutModal from "@/components/LogoutModal";

const App = () => {
  const { screen } = useAppStore();

  let content;
  switch (screen) {
    case "difficulty":
      content = <DifficultyScreen />;
      break;
    case "game":
      content = <GameScreen />;
      break;
    case "result":
      content = <ResultScreen />;
      break;
    case "login":
    default:
      content = <LoginScreen />;
      break;
  }

  return (
    <>
      <div className="text-gray-800 antialiased">
        <div className="app-container bg-gray-50 flex flex-col items-center justify-center p-4">{content}</div>
      </div>
      <LogoutModal />
    </>
  );
};

export default App;
