import { useEffect, useState } from "react";
import { registerSW } from "virtual:pwa-register";

export default function PWAUpdatePrompt() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [updateSW, setUpdateSW] = useState(() => () => {});

  useEffect(() => {
    const _updateSW = registerSW({
      onNeedRefresh() {
        setNeedRefresh(true);
      },
      onOfflineReady() {
        setOfflineReady(true);
        setTimeout(() => setOfflineReady(false), 2500);
      },
    });
    setUpdateSW(() => _updateSW);
  }, []);

  const reload = () => updateSW(true);
  const close = () => setNeedRefresh(false);

  return (
    <>
      {offlineReady && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-0 bottom-5 mx-auto w-[95%] max-w-md rounded-xl bg-gray-900/90 text-white
                     shadow-lg backdrop-blur p-4 z-50"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">✅</span>
            <div className="text-sm">
              <div className="font-semibold">Offline ready</div>
              <div className="opacity-80">You can use the app without internet.</div>
            </div>
          </div>
        </div>
      )}

      {needRefresh && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="New version available"
          className="fixed inset-x-0 bottom-5 mx-auto w-[95%] max-w-md rounded-xl bg-gray-900/90 text-white shadow-xl backdrop-blur p-4 z-50"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-yellow-400/20">
              ⚡
            </span>
            <div className="flex-1">
              <div className="text-sm font-semibold">Update available</div>
              <div className="text-sm opacity-90">A new version is ready. Reload to update now.</div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={reload}
                  className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 cursor-pointer
                             text-sm font-semibold text-gray-900 pointer-fine:hover:-translate-y-1 transition"
                >
                  Reload
                </button>
                <button
                  onClick={close}
                  className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 cursor-pointer
                             text-sm font-semibold text-white/90 pointer-fine:hover:-translate-y-1 transition"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
