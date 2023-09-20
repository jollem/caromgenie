import { useContext } from "react";
import { FaPlay, FaPause, FaArrowLeft } from "react-icons/fa";
import classnames from "classnames";
import { GameContext } from "../../store/GameContext";
import styles from "./NavBar.module.css";

const MenuBurger = ({ reset }: { reset?: () => void }) => (
  <div className={styles.menu} onClick={reset}>
    <FaArrowLeft />
  </div>
);

const StartTime = ({ timestamp }: { timestamp: number }) => (
  <div>
    {"/ Started: "}
    {new Date(timestamp).toLocaleTimeString().slice(0, -3)}
  </div>
);

const TimeElapsed = ({ duration }: { duration: number }) => {
  const hours = Math.floor(duration / 360);
  const minutes = Math.floor((duration % 360) / 60);
  const seconds = Math.floor(duration % 60);
  return (
    <div>
      {"/ Time elapsed: "}
      {[hours, minutes, seconds]
        .map((item) => item.toString().padStart(2, "0"))
        .join(":")}
    </div>
  );
};

const Innings = ({ innings }: { innings: number }) => (
  <span>Innings: {innings}</span>
);

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
    {[
      <Innings key="innings" innings={innings} />,
      !!timestamp && <StartTime key="starttime" timestamp={timestamp} />,
      !!timestamp && <TimeElapsed key="duration" duration={duration} />,
    ].filter(Boolean)}
  </div>
);

const PauseToggle = ({
  toggle,
  timestamp,
  running,
}: {
  toggle?: () => void;
  timestamp: number;
  running: boolean;
}) => (
  <div
    onClick={toggle}
    className={classnames(styles.menu, { [styles.hide]: !timestamp })}
  >
    {running ? <FaPause /> : <FaPlay />}
  </div>
);

const NavBar = () => {
  const gameState = useContext(GameContext);

  return (
    <nav className={styles.navbar}>
      <MenuBurger reset={gameState.reset} />
      <TimeBox
        innings={gameState.config.innings}
        timestamp={gameState.timestamp || 0}
        duration={(Date.now() - (gameState.timestamp || 0)) / 1000}
      />
      <PauseToggle
        toggle={gameState.pauseToggle}
        timestamp={gameState.timestamp || 0}
        running={gameState.running}
      />
    </nav>
  );
};

export default NavBar;
