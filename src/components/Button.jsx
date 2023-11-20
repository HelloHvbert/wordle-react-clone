import { useGame } from "../GameContext";

//eslint-disable-next-line
function Button({ value, onClick, color = null, enable = true }) {
  const { badLetters, goodLetters, rightLetters } = useGame();

  // Choosing correct color for button
  /*eslint-disable*/
  const valueLower = value.toLowerCase();
  // Letter is not in searched word
  const isInvalidLetter = badLetters.includes(value.toLowerCase());
  // Letter is in searched word, but in not right place
  const isGoodLetter = goodLetters.includes(value.toLowerCase());
  // Letter is in searched word and in right place
  const isRightLetter = rightLetters.includes(value.toLowerCase());
  /*eslint-enable*/

  return (
    <div
      onClick={onClick}
      className={`key ${!enable && "disabled"} ${
        isRightLetter
          ? "key-right"
          : isGoodLetter
          ? "key-good"
          : isInvalidLetter
          ? "key-invalid"
          : ""
      }`}
    >
      {value}
    </div>
  );
}

export default Button;
