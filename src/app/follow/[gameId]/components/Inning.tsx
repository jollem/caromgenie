import { useContext, useState, useEffect } from "react";
import clsx from "clsx";
import { ObserverContext } from "@/store/ObserverContext";
import styles from "./ScoreBoard.module.scss";

const TIMER_RESOLUTION = 200;

const Inning: React.FC<{ index: number; active: number }> = ({
  index,
  active,
}) => {
  const state = useContext(ObserverContext);

  const [millisecondsLeft, setMillisecondsLeft] = useState<number>(0);

  useEffect(() => {
    setMillisecondsLeft(state.shotclock.milliseconds);
    const timer = setInterval(() => {
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
  }, [state.running, state.shotclock]);

  const percentage =
    Math.max(0, 1 - millisecondsLeft / (state.config.shotclock * 1000)) * 100;

  return (
    <div
      className={clsx(styles[`player${index}`], styles.inning, {
        [styles.shotclock]: active === index && !state.ended,
      })}
      style={{ "--percentage": `${percentage}%` } as React.CSSProperties}
    >
      {active === index && !state.ended
        ? state.players[index].innings.slice(-1)
        : ""}
    </div>
  );
};

export default Inning;
