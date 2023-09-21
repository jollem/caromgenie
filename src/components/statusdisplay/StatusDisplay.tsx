import { useContext } from "react";
import { FaStopwatch } from "react-icons/fa";
import classnames from "classnames";
import { GameContext } from "../../store/GameContext";
import styles from "./StatusDisplay.module.css";

const StatusDisplay = () => {
  const gameState = useContext(GameContext);
  return (
    <div
      className={classnames(styles.status, {
        [styles.middle]: gameState.players.length === 2,
      })}
    >
      <div>
        {Math.max(...gameState.players.map((player) => player.innings.length))}
      </div>

      {!!gameState.config.extensions && (
        <button
          onClick={() => gameState.extension?.()}
          disabled={
            !gameState.running ||
            !gameState.timestamp ||
            !!!gameState.shotclock ||
            gameState.players[gameState.active?.(gameState) || 0]?.extensions <=
              0
          }
        >
          <FaStopwatch />
        </button>
      )}
    </div>
  );
};

export default StatusDisplay;
