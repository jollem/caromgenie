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

const TimeElapsed = ({ duration }: { duration: number }) => {
  const hours = Math.floor(duration / 360);
  const minutes = Math.floor((duration % 360) / 60);
  const seconds = Math.floor(duration % 60);
  return (
    <div>
      Time elapsed:{" "}
      {[hours, minutes, seconds]
        .map((item) => item.toString().padStart(2, "0"))
        .join(":")}
    </div>
  );
};

const TimeBox = ({
  innings,
  timestamp,
  duration,
}: {
  innings: number;
  timestamp: number;
  duration: number;
}) => (
  <div className={styles.timebox}>
    Innings: {innings} /
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
      {gameState.timestamp && (
        <>
          <TimeBox
            innings={gameState.config.innings}
            timestamp={gameState.timestamp || 0}
            duration={(Date.now() - (gameState.timestamp || 0)) / 1000}
          />
          <PauseToggle
            toggle={gameState.pauseToggle}
            running={gameState.running}
          />
        </>
      )}
    </nav>
  );
};

export default NavBar;
