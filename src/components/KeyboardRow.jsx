import Button from "./Button";
import { useGame } from "../GameContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

// eslint-disable-next-line
function KeyboardRow({ letters, enterOrBackspace = false }) {
  const {
    currentLetter,
    setCurrentLetter,
    currentWord,
    setCurrentWord,
    currentRow,
    setCurrentRow,
    WORD_LENGTH,
    setGuesses,
    guesses,
    checkLetters,
    // word validation
    changeWordFound,
    setIsLoser,
    data,
    setIsWinner,
  } = useGame();

  useEffect(() => {
    if (currentRow === 6) {
      setTimeout(() => setIsLoser(true), 500);
    }
  }, [currentRow, setIsLoser]);

  // handle click letter
  function handleClick(char) {
    if (currentLetter >= WORD_LENGTH) return;
    setCurrentWord((w) => w + char.toLowerCase());
    setCurrentLetter((l) => l + 1);
  }

  // Backspace logic
  function handleReverse() {
    if (currentWord.length > 0) {
      setCurrentWord(currentWord.slice(0, -1));
      setCurrentLetter((l) => l - 1);
    }
  }

  // Adding a new guess
  function setAtIndex(index, value) {
    const temp = [...guesses];

    temp[index] = value;
    return temp;
  }

  // Validate word existence
  async function validWord(word) {
    const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";
    const res = await fetch(`${BASE_URL}/${word.toLowerCase()}`);
    return res.ok;
  }

  async function handleEnter() {
    if (currentWord.length < WORD_LENGTH) {
      toast.warning("Word must be 5 letters long");
      toast.clearWaitingQueue();
      return;
    }

    const isValid = await validWord(currentWord);

    if (!isValid) {
      setTimeout(() => {
        toast.warning("Word not found");
        toast.clearWaitingQueue();
      }, 500);
      changeWordFound();
      return;
    }

    // Moving to the next row/attempt
    setCurrentRow((r) => r + 1);

    checkLetters();
    setCurrentWord("");
    setCurrentLetter(0);

    setGuesses(setAtIndex(currentRow, currentWord));

    if (currentWord === data) {
      setTimeout(() => setIsWinner(true), 500);
      return;
    }
  }

  return (
    <div className="keyboard-row">
      {enterOrBackspace && (
        <Button value="Enter" className="enter" onClick={handleEnter} />
      )}
      {/* eslint-disable-next-line */}
      {letters.split("").map((l) => (
        <Button
          value={l}
          onClick={() => {
            handleClick(l);
          }}
          key={l}
        />
      ))}
      {enterOrBackspace && (
        <Button value="&lArr;" className="delete" onClick={handleReverse} />
      )}
    </div>
  );
}

export default KeyboardRow;
