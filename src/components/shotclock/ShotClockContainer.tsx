import { useContext } from "react";
import classnames from "classnames";
import { GameContext } from "../../store/GameContext";
import InfoBar from "./InfoBar";
import ShotClock from "./ShotClock";
import Overtime from "./Overtime";
import styles from "./ShotClock.module.scss";

const ShotClockContainer = () => {
  const gameState = useContext(GameContext);

  return (
    <div
      className={classnames(styles.shotclockContainer, {
        [styles.warn]: gameState.timestamp && !!!gameState.shotclock,
      })}
    >
      <InfoBar />
      <ShotClock />
      <Overtime />
    </div>
  );
};

export default ShotClockContainer;
