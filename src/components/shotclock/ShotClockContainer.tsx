import InfoBar from "./InfoBar";
import ShotClock from "./ShotClock";
import GameOver from "./GameOver";
import styles from "./ShotClock.module.scss";

const ShotClockContainer = () => (
  <div className={styles.shotclockContainer}>
    <InfoBar />
    <ShotClock />
    <GameOver />
  </div>
);

export default ShotClockContainer;
