import { useContext } from "react";
import classnames from "classnames";
import { GameContext } from "../../store/GameContext";
import styles from "./ShotClock.module.css";

const ShotClock = () => {
  const gameState = useContext(GameContext);
  return (
    <div className={styles.shotclockContainer}>
      {gameState.shotclock > 0 ? (
        <>
          <div className={styles.shotclock}>{gameState.shotclock}</div>
          <div className={styles.shotclockBar}>
            {Array.from({ length: 40 }, (value, _index) => value).map(
              (_, index) => {
                return (
                  <span
                    key={index}
                    className={classnames({
                      [styles.warn]: index < 10,
                      [styles.hide]: index >= gameState.shotclock,
                    })}
                  />
                );
              }
            )}
          </div>
        </>
      ) : (
        gameState.running && (
          <div className={styles.timeover}>Timelimit reached!</div>
        )
      )}
    </div>
  );
};

export default ShotClock;
