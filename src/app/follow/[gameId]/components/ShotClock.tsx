import { useContext, useState, useEffect } from "react";
import { ObserverContext } from "@/store/ObserverContext";
import styles from "./ScoreBoard.module.scss";

const TIMER_RESOLUTION = 1000;

const ShotClock: React.FC = () => {
  const state = useContext(ObserverContext);

  const [millisecondsLeft, setMillisecondsLeft] = useState<number>(0);

  useEffect(() => {
    setMillisecondsLeft(state.shotclock.milliseconds);
    const timer = setInterval(() => {
      !state.ended &&
        state.running &&
        setMillisecondsLeft((prev) => {
          if (prev > TIMER_RESOLUTION) {
            return prev - TIMER_RESOLUTION;
          }
          clearInterval(timer);
          return 0;
        });
    }, TIMER_RESOLUTION);
    return () => clearInterval(timer);
  }, [state.ended, state.running, state.shotclock]);

  const percentage = state.ended
    ? 100
    : Math.max(0, 1 - millisecondsLeft / (state.config.shotclock * 1000)) * 100;

  return (
    <div
      className={styles.shotclock}
      style={{ "--percentage": `${percentage}%` } as React.CSSProperties}
    />
  );
};

export default ShotClock;
