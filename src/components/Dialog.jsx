import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./style.css";
import { useGame } from "../GameContext";

function Dialog() {
  const { isLoser, isWinner, data, resetGame } = useGame();
  // Dialog with game win
  if (isWinner)
    return (
      <AlertDialog.Root open={isWinner}>
        <AlertDialog.Trigger />
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="AlertDialogOverlay" />
          <AlertDialog.Content className="AlertDialogContent">
            <AlertDialog.Title className="AlertDialogTitle">
              YOU WON 👏
            </AlertDialog.Title>
            <AlertDialog.Description className="AlertDialogDescription">
              You win todays game and guessed word, which is &quot;
              {data.toUpperCase()}&quot;.{"\n"} Read more about it{" "}
              <a
                href={`https://www.merriam-webster.com/dictionary/${data}`}
                target="_blank"
                rel="noreferrer"
              >
                HERE📚
              </a>
              .
            </AlertDialog.Description>
            <div
              style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}
            >
              <AlertDialog.Action asChild>
                <button className="Button violet" onClick={resetGame}>
                  Try one more time
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    );

  // Dialog with game lose
  return (
    <AlertDialog.Root open={isLoser}>
      <AlertDialog.Trigger />
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">
            GAME OVER 😥
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            Try again by clicking Reset button.
          </AlertDialog.Description>
          <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
            <AlertDialog.Action asChild>
              <button className="Button violet" onClick={resetGame}>
                Reset game
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default Dialog;
