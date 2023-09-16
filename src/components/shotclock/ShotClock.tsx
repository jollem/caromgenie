import { useContext } from "react";
import classnames from "classnames";
import { GameContext } from "../../store/GameContext";
import styles from "./ShotClock.module.css";

const ShotClock = () => {
  const gameState = useContext(GameContext);
  return (
    <div className={styles.shotclock}>
      {gameState.active >= 0 &&
        Array.from({ length: 40 }, (value, _index) => value).map((_, index) => {
          return (
            <span
              key={index}
              className={classnames({
                [styles.warn]: index < 10,
                [styles.hide]: index + gameState.shotclock >= 40,
              })}
            />
          );
        })}
    </div>
  );
};

export default ShotClock;
