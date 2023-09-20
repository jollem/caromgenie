import { useContext } from "react";
import { GameContext } from "../../store/GameContext";
import classnames from "classnames";
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

      <button
        onClick={() => gameState.extension?.()}
        disabled={
          !gameState.running ||
          !gameState.timestamp ||
          !!!gameState.shotclock ||
          gameState.players[gameState.active?.(gameState) || 0]?.extensions <= 0
        }
      >
        Extension
      </button>
    </div>
  );
};

export default StatusDisplay;
