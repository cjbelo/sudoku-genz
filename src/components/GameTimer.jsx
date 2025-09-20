import { useAppStore } from "@/stores/appStore";
import { useEffect, useState } from "react";

const GameTimer = () => {
  const { startTime, isGameRunning, isPaused, elapsedMs } = useAppStore();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (startTime) {
      const elapsed = isPaused ? Math.floor(elapsedMs / 1000) : Math.floor((Date.now() - startTime) / 1000);
      setSeconds(elapsed);
    }
  }, [startTime, isPaused, elapsedMs]);

  useEffect(() => {
    let timer;

    if (isGameRunning && !isPaused) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isGameRunning, isPaused]);

  const formatTime = () => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    } else {
      return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
  };

  return <>{formatTime()}</>;
};

export default GameTimer;
