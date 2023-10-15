import { useContext, useEffect, useState } from "react";
import classnames from "classnames";
import { GameContext } from "../../store/GameContext";
import Overtime from "./Overtime";
import styles from "./ShotClock.module.scss";

const TIMER_RESOLUTION = 200;

const ShotClock = () => {
  const gameState = useContext(GameContext);

  const player = gameState.active?.(gameState);

  const [millisecondsLeft, setMillisecondsLeft] = useState<number>(0);

  useEffect(() => {
    setMillisecondsLeft(gameState.shotclock.milliseconds);
    const timer = setInterval(() => {
      gameState.running &&
        setMillisecondsLeft((prev) => prev - TIMER_RESOLUTION);
    }, TIMER_RESOLUTION);
    return () => clearInterval(timer);
  }, [gameState.running, gameState.shotclock, player]);

  if (!gameState.started || gameState.ended) {
    return null;
  }

  if (millisecondsLeft <= 0) {
    return <Overtime />;
  }

  const width =
    Math.max(0, 1 - millisecondsLeft / (gameState.config.shotclock * 1000)) *
      100 +
    "%";

  return (
    <div
      className={classnames(styles.centerSelf, styles.gradient, {
        [styles.actionable]:
          gameState.players[gameState.active?.(gameState) || 0]?.extensions > 0,
      })}
      onClick={() => gameState.extension?.()}
    >
      <div className={styles.slider} style={{ width }} />
      <div className={styles.counter}>{Math.ceil(millisecondsLeft / 1000)}</div>
    </div>
  );
};

export default ShotClock;
