import { useContext } from "react";
import classnames from "classnames";
import { GameContext } from "../../store/GameContext";
import styles from "./NavBar.module.css";

const MenuBurger = () => (
  <div
    className={`${styles.menu} ${styles.burger}`}
    onClick={() => console.log("rai")}
  >
    <span />
    <span />
    <span />
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
/*<p>
Innings:{" "}
{Math.max(...gameState.players.map((player) => player.innings.length))}
</p>
<p>Started: {gameState.timestamp}</p>
<p>Duration: {gameState.duration}</p> */
const NavBar = () => {
  const gameState = useContext(GameContext);
  return (
    <nav className={styles.navbar}>
      <MenuBurger />
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
