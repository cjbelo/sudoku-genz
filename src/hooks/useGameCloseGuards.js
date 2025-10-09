import { useEffect } from "react";
import { useAppStore } from "@/stores/appStore";

export function useGameCloseGuards(enableConfirmOnClose = true) {
  const { isGameRunning, isPaused, pauseGame } = useAppStore();

  useEffect(() => {
    const quickSave = () => {
      if (isGameRunning) {
        pauseGame();
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") quickSave();
    };

    window.addEventListener("pagehide", quickSave, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pagehide", quickSave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [isGameRunning, pauseGame]);

  useEffect(() => {
    if (!enableConfirmOnClose) return;
    const shouldBlock = isGameRunning && !isPaused;

    const onBeforeUnload = (e) => {
      if (!shouldBlock) return;

      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", onBeforeUnload, { capture: true });
    return () => window.removeEventListener("beforeunload", onBeforeUnload, { capture: true });
  }, [isGameRunning, isPaused, enableConfirmOnClose]);
}
