import { useContext } from "react";
import classnames from "classnames";
import { GameContext } from "../../store/GameContext";
import styles from "./NavBar.module.css";

const MenuBurger = ({ reset }: { reset?: () => void }) => (
  <div className={`${styles.menu} ${styles.burger}`} onClick={reset}>
    <span />
    <span />
    <span />
  </div>
);

const StartTime = ({ timestamp }: { timestamp: number }) => (
  <div>Started: {new Date(timestamp).toLocaleTimeString().slice(0, -3)}</div>
);

const TimeElapsed = ({ duration }: { duration: number }) => (
  <div>
    Time elapsed:{" "}
    {Math.floor(duration / 360)
      .toString()
      .padStart(2, "0")}
    :
    {Math.floor((duration % 360) / 60)
      .toString()
      .padStart(2, "0")}
    :{(duration % 60).toString().padStart(2, "0")}
  </div>
);

const TimeBox = ({
  timestamp,
  duration,
}: {
  timestamp: number;
  duration: number;
}) => (
  <div className={styles.timebox}>
    <StartTime timestamp={timestamp} />
    {"/"}
    <TimeElapsed duration={duration} />
  </div>
);

const PauseToggle = ({
  toggle,
  running,
}: {
  toggle?: () => void;
  running: boolean;
}) => (
  <div onClick={toggle} className={`${styles.menu} ${styles.toggle}`}>
    <span className={classnames(running ? styles.pause : styles.play)} />
  </div>
);

const NavBar = () => {
  const gameState = useContext(GameContext);
  return (
    <nav className={styles.navbar}>
      <MenuBurger reset={gameState.reset} />
      {gameState.active >= 0 && (
        <TimeBox
          timestamp={gameState.timestamp}
          duration={gameState.duration}
        />
      )}
      {gameState.active >= 0 && (
        <PauseToggle
          toggle={gameState.pauseToggle}
          running={gameState.running}
        />
      )}
    </nav>
  );
};

export default NavBar;
