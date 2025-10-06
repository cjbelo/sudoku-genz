import { useAppStore } from "@/stores";
import GameTimer from "./GameTimer";

const Counters = () => {
  const { mistakes, mistakeLimit, hints } = useAppStore();

  return (
    <div className="mb-4 flex justify-between w-full max-w-md">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg p-3 shadow" style={{ width: 80 }}>
        <p className="text-gray-500 text-sm">Time</p>
        <p className="font-bold">
          <GameTimer />
        </p>
      </div>
      <div className="flex flex-col items-center justify-center bg-white rounded-lg p-3 shadow">
        <p className="text-gray-500 text-sm">Mistakes</p>
        <p className="font-bold">
          {mistakes}/{mistakeLimit}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center bg-white rounded-lg p-3 shadow" style={{ width: 80 }}>
        <p className="text-gray-500 text-sm">Hints</p>
        <p className="font-bold">{hints}</p>
      </div>
    </div>
  );
};

export default Counters;
