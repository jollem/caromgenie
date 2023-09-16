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
    </div>
  );
};

export default StatusDisplay;
