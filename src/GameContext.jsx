import { createContext, useState, useEffect, useContext } from "react";

const GameContext = createContext();

//https://api.dictionaryapi.dev/api/v2/entries/en/castleeeee
// eslint-disable-next-line
function GameProvider({ children }) {
  // Index of current row and letter, where user is typing
  const [currentRow, setCurrentRow] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(0);
  // Holds user's guesses
  const [guesses, setGuesses] = useState(["", "", "", "", "", ""]);
  // Holds colors for each letter corrention (green, yellow, gray)
  const [correct, setCorrect] = useState([]);
  // Value of active row
  const [currentWord, setCurrentWord] = useState("");
  // 5 letter word to guess
  const [data, setData] = useState("");
  // letters that are not in the word
  const [badLetters, setBadLetters] = useState("");
  // letters that are in the word but not in the right position
  const [goodLetters, setGoodLetters] = useState("");
  // letters that are in the word and in the right position
  const [rightLetters, setRightLetters] = useState("");
  // Game state
  const [isWinner, setIsWinner] = useState(false);
  const [isLoser, setIsLoser] = useState(false);
  // if word is valid(exits in dictionary) help state
  const [wordFound, setWordFound] = useState(true);

  const WORD_LENGTH = 5;

  useEffect(() => {
    async function fetchWord() {
      // const res = await fetch(
      //   "https://random-word-api.herokuapp.com/word?length=5"
      // );
      const res = await fetch(
        "https://random-word-api.vercel.app/api?words=1&length=5"
      );
      const data = await res.json();
      setData(data[0]);
      console.log(data[0]);
    }
    !isWinner && fetchWord();
  }, [isWinner]);

  function resetGame() {
    setCurrentRow(0);
    setCurrentLetter(0);
    setCurrentWord("");
    setGuesses(["", "", "", "", "", ""]);
    setCorrect([]);
    setBadLetters("");
    setIsWinner(false);
    setWordFound(true);
    setIsLoser(false);
    setGoodLetters("");
    setRightLetters("");
  }

  function changeWordFound() {
    setWordFound(!wordFound);
  }

  function addCorrectItem(item) {
    setCorrect((c) => [...c, ...item]);
  }

  function checkLetters() {
    const wordLower = currentWord.toLowerCase();
    const dataLower = data.toLowerCase();
    if (!wordLower) return;

    // if (wordLower === dataLower) {
    //   setIsWinner(true);
    //   return;
    // }

    const letters = [];
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (wordLower[i] === dataLower[i]) {
        letters.push("green");
        setRightLetters((r) => r + wordLower[i]);
      } else if (dataLower.includes(wordLower[i])) {
        setGoodLetters((g) => g + wordLower[i]);
        letters.push("yellow");
      } else {
        setBadLetters((b) => b + wordLower[i]);
        letters.push("red");
      }
    }
    addCorrectItem(letters);
  }

  return (
    <GameContext.Provider
      value={{
        currentRow,
        setCurrentRow,
        currentLetter,
        setCurrentLetter,
        currentWord,
        setCurrentWord,
        guesses,
        setGuesses,
        WORD_LENGTH,
        data,
        checkLetters,
        addCorrectItem,
        correct,
        badLetters,
        isWinner,
        wordFound,
        changeWordFound,
        resetGame,
        isLoser,
        setIsLoser,
        setIsWinner,
        goodLetters,
        setGoodLetters,
        rightLetters,
        setRightLetters,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

function useGame() {
  const context = useContext(GameContext);
  if (context === undefined)
    throw new Error("Game Context was used outside of provider");

  return context;
}

export { GameProvider, useGame };
