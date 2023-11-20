import KeyboardRow from "./KeyboardRow";

const firstRow = "QWERTYUIOP";
const secondRow = "ASDFGHJKL";
const thirdRow = "ZXCVBNM";

function Keyboard() {
  // enterOrBackspace is a boolean prop that will display the enter and backspace keys if true
  return (
    <div className="keyboard">
      <KeyboardRow letters={firstRow} />
      <KeyboardRow letters={secondRow} />
      <KeyboardRow letters={thirdRow} enterOrBackspace={true} />
    </div>
  );
}

export default Keyboard;
