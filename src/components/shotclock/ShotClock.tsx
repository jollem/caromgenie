import { useContext } from "react";
import classnames from "classnames";
import { GameContext } from "../../store/GameContext";
import styles from "./ShotClock.module.scss";

const ShotClock = () => {
  const gameState = useContext(GameContext);

  if (!gameState.started || !gameState.shotclock) {
    return null;
  }

  const timeLeft = Math.floor(
    Math.min(
      100,
      ((gameState.shotclock - 1) * 100) / (gameState.config.shotclock - 1)
    )
  );

  const backgroundImage =
    timeLeft > 40
      ? `linear-gradient(90deg, ${styles.sliderStart} 0%, ${styles.sliderStart} 100%)`
      : `linear-gradient(90deg, ${styles.sliderStart} 0%, ${styles.sliderEnd} ${
          2 * timeLeft
        }%, ${styles.sliderEnd} 100%)`;

  const backgroundSize = timeLeft + "%";

  return (
    <div
      className={classnames(styles.centerSelf, styles.slider)}
      style={{
        backgroundImage,
        backgroundSize,
      }}
    >
      <div className={styles.counter}>{gameState.shotclock}</div>
    </div>
  );
};

export default ShotClock;
