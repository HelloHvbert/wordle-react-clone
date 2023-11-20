import { useGame } from "../GameContext";
import Letter from "./Letter";

// eslint-disable-next-line
function Row({ rowId }) {
  const { currentRow, currentWord, guesses } = useGame();
  const isActive = currentRow !== rowId;

  // Checking if there is any letter at i-th and j-th position, if not display empty string
  let temp = "";
  if (guesses[rowId] !== "") {
    temp = guesses[rowId];
  }

  // Displaying one row
  return (
    <div className={isActive ? "row" : "row active"}>
      {Array.from({ length: 5 }, (_, i) => (
        <Letter
          key={i}
          letterId={i}
          rowId={rowId}
          value={temp[i] || currentWord[i]}
        />
      ))}
    </div>
  );
}
export default Row;
