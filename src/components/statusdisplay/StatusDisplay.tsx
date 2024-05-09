import { useContext } from "react";
import clsx from "clsx";
import { GameContext } from "../../store/GameContext";
import GameInfo from "./GameInfo";
import Innings from "./Innings";
import ExtensionButton from "./ExtensionButton";
import styles from "./StatusDisplay.module.scss";

const StatusDisplay = () => {
  const gameState = useContext(GameContext);
  return (
    <div
      className={clsx(styles.status, {
        [styles.middle]: gameState.players.length === 2,
      })}
    >
      <GameInfo />
      <Innings />
      <ExtensionButton />
    </div>
  );
};

export default StatusDisplay;
