import { useGame } from "../GameContext";

// eslint-disable-next-line
function Letter({ rowId, letterId, value }) {
  const { currentLetter, currentRow, correct } = useGame();
  const active = currentRow === rowId && currentLetter === letterId;

  // letter in one row
  if (rowId < currentRow) {
    let color = correct[rowId * 5 + letterId];
    return <div className={`cell finished ${color}`}>{value}</div>;
  }
  if (active)
    return (
      <div className={`cell ${active ? "active-letter" : ""}`}>{value}</div>
    );
  else if (rowId === currentRow) return <div className="cell">{value}</div>;
  return <div className="cell"></div>;
}

export default Letter;
