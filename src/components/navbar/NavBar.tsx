import { useContext } from "react";
import {
  FaPlay,
  FaPause,
  FaArrowLeft,
  FaClock,
  FaStopwatch,
  FaCrosshairs,
} from "react-icons/fa";
import classnames from "classnames";
import { GameContext } from "../../store/GameContext";
import styles from "./NavBar.module.scss";

const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * SECONDS_IN_MINUTE;

const MenuBurger = ({ reset }: { reset?: () => void }) => (
  <div className={styles.menu} onClick={reset}>
    <FaArrowLeft />
  </div>
);

const StartTime = ({ timestamp }: { timestamp: number }) => (
  <div>
    <FaClock />
    {new Date(timestamp).toLocaleTimeString().slice(0, -3)}
  </div>
);

const Separator = () => <span>/</span>;

const TimeElapsed = ({ duration }: { duration: number }) => {
  const hours = Math.floor(duration / SECONDS_IN_HOUR);
  const minutes = Math.floor((duration % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  const seconds = Math.floor(duration % SECONDS_IN_MINUTE);
  return (
    <div>
      <FaStopwatch />
      {[hours, minutes, seconds]
        .map((item) => item.toString().padStart(2, "0"))
        .join(":")}
    </div>
  );
};

const Innings = ({ innings }: { innings: number }) => (
  <span>
    <FaCrosshairs />
    {innings}
  </span>
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
      !!timestamp && <Separator key="separator1" />,
      !!timestamp && <StartTime key="starttime" timestamp={timestamp} />,
      !!timestamp && <Separator key="separator2" />,
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
    className={classnames(styles.menu, { hide: !timestamp })}
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
