const Cell = ({ children, className = "" }) => {
  return (
    <div className={["relative flex items-center justify-center cursor-default text-gray-800", className].join(" ")}>
      {children}
    </div>
  );
};

const SudokuCell = ({ puzzleSudoku, selected, cellData, invalidCells, possibleNumbers, showHints, handleClick }) => {
  const { cell, boxRow, boxCol, globalRow, globalCol } = cellData;
  const isSelected = selected.globalRow === globalRow && selected.globalCol === globalCol;
  const isHighlighted = selected.cell === cell && cell !== 0;

  return (
    <Cell
      key={`${globalRow}-${globalCol}`}
      className={
        isSelected
          ? "bg-blue-200"
          : isHighlighted
          ? "bg-blue-100"
          : (selected.boxRow === boxRow && selected.boxCol === boxCol) || // Highlight 3x3 region
            selected.globalRow === globalRow || // Highlight same row
            selected.globalCol === globalCol // Highlight same column
          ? "bg-gray-200"
          : "bg-white"
      }
      onClick={handleClick}
    >
      {cell !== 0 ? (
        <span
          className={[
            "text-xs",
            invalidCells[`${globalRow}-${globalCol}`]
              ? "text-red-600"
              : puzzleSudoku[globalRow][globalCol] === 0
              ? "text-gray-800"
              : "inherit",
          ].join(" ")}
        >
          {cell}
        </span>
      ) : (
        <></>
      )}
    </Cell>
  );
};

export default SudokuCell;
