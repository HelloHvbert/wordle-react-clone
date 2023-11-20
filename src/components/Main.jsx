import Keyboard from "./Keyboard";
import GameBoard from "./GameBoard";
import Alert from "./Alert";
import Dialog from "./Dialog";

import { useGame } from "../GameContext";

function Main() {
  const { wordFound, changeWordFound } = useGame();

  // Delaying wrong word dialog appearance
  if (!wordFound) {
    setTimeout(() => changeWordFound(), 1500);
  }

  return (
    <>
      <Alert />
      <div className="game-container">
        <GameBoard />
        <Keyboard />
      </div>
      <Dialog />
    </>
  );
}

export default Main;
