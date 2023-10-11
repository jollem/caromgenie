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

  return (
    <div
      className={classnames(styles.centerSelf, styles.gradient, {
        [styles.actionable]:
          gameState.players[gameState.active?.(gameState) || 0]?.extensions > 0,
      })}
      onClick={() => gameState.extension?.()}
    >
      <div className={styles.slider} style={{ width: 100 - timeLeft + "%" }} />
      <div className={styles.counter}>{gameState.shotclock}</div>
    </div>
  );
};

export default ShotClock;
