import { useContext } from "react";
import classnames from "classnames";
import { GameContext } from "../../store/GameContext";
import styles from "./ShotClock.module.css";

const ShotClockContainer = () => {
  const gameState = useContext(GameContext);

  const ShotClock = () => (
    <>
      <div
        className={classnames(styles.shotclock, {
          [styles.hurry]: (gameState.shotclock || 0) < 10,
        })}
      >
        {gameState.shotclock}
      </div>
      <div className={styles.shotclockBar}>
        {Array.from(
          { length: gameState.config.shotclock },
          (value, _index) => value
        ).map((_, index) => {
          return (
            <span
              key={index}
              className={classnames({
                [styles.warn]: index < 10,
                [styles.hide]: index >= (gameState.shotclock || 0),
              })}
            />
          );
        })}
      </div>
    </>
  );

  const TimeOver = () => (
    <div className={styles.timeover}>Shotclock exceeded!</div>
  );

  const InfoBlock = () => (
    <div className={styles.info}>
      Click on {gameState.players[0]?.name} to start the game
    </div>
  );

  return (
    <div className={styles.shotclockContainer}>
      {!gameState.timestamp && <InfoBlock />}
      {gameState.timestamp && (gameState.shotclock ?? 0) > 0 && <ShotClock />}
      {gameState.timestamp && (gameState.shotclock ?? 0) <= 0 && <TimeOver />}
    </div>
  );
};

export default ShotClockContainer;
