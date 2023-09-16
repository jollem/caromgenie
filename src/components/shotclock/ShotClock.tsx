import { useContext } from "react";
import { GameContext } from "../../store/GameContext";
import styles from "./ShotClock.module.css";

const ShotClock = () => {
  const gameState = useContext(GameContext);
  return (
    <div className={styles.shotclock}>ShotClock: {gameState.shotclock}</div>
  );
};

export default ShotClock;
