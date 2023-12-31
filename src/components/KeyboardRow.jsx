import Button from "./Button";
import { useGame } from "../GameContext";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

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

  const [enableFunctions, setEnableFunctions] = useState(true);

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
    if (!enableFunctions) return;
    setEnableFunctions(false);
    if (currentWord.length < WORD_LENGTH) {
      toast.warning("Word must be 5 letters long");
      toast.clearWaitingQueue();
      setEnableFunctions(true);
      return;
    }

    try {
      const isValid = await validWord(currentWord);

      if (!isValid) {
        setTimeout(() => {
          toast.warning("Word not found");
          toast.clearWaitingQueue();
        }, 150);
        changeWordFound();
        setEnableFunctions(true);
        return;
      }
    } catch (err) {
      throw new Error(err.message);
    } finally {
      setEnableFunctions(true);
    }

    // Moving to the next row/attempt
    setCurrentRow((r) => r + 1);

    checkLetters();
    setCurrentWord("");
    setCurrentLetter(0);

    setGuesses(setAtIndex(currentRow, currentWord));
    setEnableFunctions(true);

    if (currentWord === data) {
      setTimeout(() => setIsWinner(true), 500);
      return;
    }
  }

  return (
    <div className="keyboard-row">
      {enterOrBackspace && (
        <Button
          value="Enter"
          className="enter"
          onClick={handleEnter}
          enable={enableFunctions}
        />
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
        <Button
          value="&lArr;"
          className="delete"
          onClick={handleReverse}
          enable={enableFunctions}
        />
      )}
    </div>
  );
}

export default KeyboardRow;
