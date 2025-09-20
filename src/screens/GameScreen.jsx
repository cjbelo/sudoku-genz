import FeatherIcon from "feather-icons-react";
import ActionButton from "@/components/ActionButton";
import { useAppStore } from "@/stores/appStore";

const GameScreen = () => {
  const { logout, setScreen } = useAppStore();

  const handleGoBack = () => {
    setScreen("difficulty");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="flex justify-between items-center w-full mb-4">
        <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-white shadow cursor-pointer" onClick={handleGoBack}>
            <FeatherIcon icon="arrow-left" />
          </button>
          <button className="p-2 rounded-full bg-white shadow opacity-0 pointer-events-none">
            <FeatherIcon icon="arrow-right" />
          </button>
        </div>
        <h1 className="text-xl font-bold text-gray-800">
          Sudoku <span className="text-purple-600">Gen Z</span>
        </h1>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-white shadow" onClick={() => setScreen("result")}>
            <FeatherIcon icon="refresh-cw" />
          </button>
          <button className="p-2 rounded-full bg-white shadow" onClick={handleLogout}>
            <FeatherIcon icon="log-out" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-4 flex justify-between w-full max-w-md">
          <div
            className="flex flex-col items-center justify-center bg-white rounded-lg p-3 shadow"
            style={{ width: 80 }}
          >
            <p className="text-gray-500 text-sm">Time</p>
            <p className="font-bold">9:05:23</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white rounded-lg p-3 shadow">
            <p className="text-gray-500 text-sm">Mistakes</p>
            <p className="font-bold">0/3</p>
          </div>
          <div
            className="flex flex-col items-center justify-center bg-white rounded-lg p-3 shadow"
            style={{ width: 80 }}
          >
            <p className="text-gray-500 text-sm">Hints</p>
            <p className="font-bold">3</p>
          </div>
        </div>

        <div className="sudoku-board w-full max-w-md">
          {Array.from({ length: 3 }).map((_, boxRow) =>
            Array.from({ length: 3 }).map((_, boxCol) => (
              <div className="sudoku-box" key={`${boxRow}-${boxCol}`}>
                {Array.from({ length: 3 }).map((_, row) =>
                  Array.from({ length: 3 }).map((_, col) => {
                    const globalRow = boxRow * 3 + row;
                    const globalCol = boxCol * 3 + col;
                    const cell = `${globalRow}${globalCol}`;
                    console.log(cell);
                    return <div className="sudoku-cell" key={`${globalRow}-${globalCol}`}></div>;
                  })
                )}
              </div>
            ))
          )}
        </div>

        <div className="w-full max-w-md my-4 grid grid-cols-9 gap-1">
          {Array.from({ length: 9 }).map((_, num) => {
            const digit = num + 1;
            return (
              <button class="aspect-[3/4] rounded-lg bg-purple-100 hover:bg-purple-200 transition flex flex-col items-center justify-center cursor-pointer">
                <span className="font-bold text-lg text-purple-800">{digit}</span>
                <span className="text-xs leading-none text-purple-500">9</span>
              </button>
            );
          })}
        </div>

        <div className="flex space-x-4 w-full max-w-md mb-4">
          <ActionButton icon="edit" label="Notes" className="bg-gray-200 hover:bg-gray-300" />
          <ActionButton icon="delete" label="Erase" className="bg-gray-200 hover:bg-gray-300" />
        </div>

        <div className="flex space-x-4 w-full max-w-md">
          <ActionButton icon="info" label="Hint" className="bg-purple-600 hover:bg-purple-700 font-bold text-white" />
          <ActionButton icon="pause-circle" label="Pause" className="bg-white hover:bg-gray-100 font-bold" />
        </div>
      </div>
    </>
  );
};

export default GameScreen;
