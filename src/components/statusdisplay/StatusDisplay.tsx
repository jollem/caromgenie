import { useContext } from "react";
import { GameContext } from "../../store/GameContext";
import classnames from "classnames";
import styles from "./StatusDisplay.module.css";

const StartTime = ({ timestamp }: { timestamp: number }) => (
  <div>Started: {new Date(timestamp).toLocaleTimeString()}</div>
);

const TimeElapsed = ({ duration }: { duration: number }) => (
  <div>
    Duration:{" "}
    {Math.floor(duration / 360)
      .toString()
      .padStart(2, "0")}
    :
    {Math.floor((duration % 360) / 60)
      .toString()
      .padStart(2, "0")}
    :{(duration % 60).toString().padStart(2, "0")}
  </div>
);

const StatusDisplay = () => {
  const gameState = useContext(GameContext);
  return (
    <div
      className={classnames(styles.status, {
        [styles.middle]: gameState.players.length === 2,
      })}
    >
      {/*!!gameState.timestamp && <StartTime timestamp={gameState.timestamp} />}
      {!!gameState.timestamp && <TimeElapsed duration={gameState.duration} />*/}

      <div>
        {Math.max(...gameState.players.map((player) => player.innings.length))}
      </div>
    </div>
  );
};

export default StatusDisplay;
