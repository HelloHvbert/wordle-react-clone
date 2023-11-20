import Row from "./Row";

function GameBoard() {
  // Creating 6 tries for the user to guess the code
  return (
    <>
      <div className="board">
        {Array.from({ length: 6 }, (_, i) => (
          <Row key={i} rowId={i} />
        ))}
      </div>
    </>
  );
}

export default GameBoard;
