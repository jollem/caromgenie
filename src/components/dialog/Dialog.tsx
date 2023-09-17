import { useState, useContext } from "react";
import Image from "next/image";
import { GameContext } from "../../store/GameContext";
import styles from "./Dialog.module.css";

const Dialog = () => {
  const gameState = useContext(GameContext);
  const [formState, setFromState] = useState<string[]>(["", "", ""]);

  if (gameState.players.length) {
    return null;
  }

  return (
    <div className={styles.dialog}>
      <h1>Carom Genie</h1>
      <Image src="carom.svg" alt="logo" width="200" height="200" />
      {["Player 1", "Player 2", "Player 3 (Optional)"].map(
        (placeholder, index) => (
          <input
            value={formState[index]}
            key={placeholder}
            placeholder={placeholder}
            onChange={(e) =>
              setFromState((prev) => {
                const copy = [...prev];
                copy[index] = e.target.value;
                return copy;
              })
            }
          />
        )
      )}
      <button
        disabled={formState.filter(Boolean).length < 2}
        onClick={() => gameState.start?.(formState)}
      >
        Game On!
      </button>
    </div>
  );
};

export default Dialog;
