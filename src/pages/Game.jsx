import { useAppStore } from "@/stores";
import DifficultyScreen from "@/screens/DifficultyScreen";
import GameScreen from "@/screens/GameScreen";
import LoginScreen from "@/screens/LoginScreen";
import ResultScreen from "@/screens/ResultScreen";
import LogoutModal from "@/components/LogoutModal";
import { useEffect, useState } from "react";

const Game = () => {
  const { screen } = useAppStore();
  const [healthStatus, setHealthStatus] = useState("checking...");

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch("/api/health");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        setHealthStatus(data);
      } catch (e) {
        setHealthStatus("unhealthy");
        console.error("Failed to check health:", e);
      }
    };
    checkHealth();
  }, []);

  console.log("health", healthStatus);

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

export default Game;
