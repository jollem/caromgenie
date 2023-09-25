import { useContext } from "react";
import { FaStopwatch } from "react-icons/fa";
import classnames from "classnames";
import { GameContext } from "../../store/GameContext";

const ExtensionButton = () => {
  const gameState = useContext(GameContext);

  return (
    <button
      onClick={() => gameState.extension?.()}
      disabled={
        !gameState.running ||
        !gameState.started ||
        !!!gameState.shotclock ||
        gameState.players[gameState.active?.(gameState) || 0]?.extensions <= 0
      }
      className={classnames({ hide: !gameState.config.extensions })}
    >
      <FaStopwatch />
    </button>
  );
};

export default ExtensionButton;
