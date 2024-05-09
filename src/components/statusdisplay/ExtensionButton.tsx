import { useContext } from "react";
import { GameContext } from "../../store/GameContext";
import { FaStopwatch } from "react-icons/fa";
import clsx from "clsx";
import styles from "./StatusDisplay.module.scss";

const ExtensionButton = () => {
  const gameState = useContext(GameContext);

  const hasExtensions =
    gameState.players[gameState.active?.(gameState) ?? 0]?.extensions > 0;

  return (
    <div>
      <button
        onClick={() => gameState.extension?.()}
        disabled={!hasExtensions}
        className={clsx({ [styles.hide]: !hasExtensions })}
      >
        <FaStopwatch />
      </button>
    </div>
  );
};

export default ExtensionButton;
