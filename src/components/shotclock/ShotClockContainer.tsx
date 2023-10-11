import { useContext } from "react";
import { GameContext } from "../../store/GameContext";
import InfoBar from "./InfoBar";
import ShotClock from "./ShotClock";
import Overtime from "./Overtime";
import GameOver from "./GameOver";
import styles from "./ShotClock.module.scss";

const ShotClockContainer = () => {
  const gameState = useContext(GameContext);

  return (
    <div className={styles.shotclockContainer}>
      <InfoBar />
      <ShotClock />
      <GameOver />
    </div>
  );
};

export default ShotClockContainer;
