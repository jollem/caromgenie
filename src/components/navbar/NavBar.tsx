import { useContext } from "react";
import { GameContext } from "../../store/GameContext";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const gameState = useContext(GameContext);
  return (
    <div className={styles.navbar}>
      <p>
        Innings:{" "}
        {Math.max(...gameState.players.map((player) => player.innings.length))}
      </p>
      <p>Started: {gameState.timestamp}</p>
      <p>Duration: {gameState.duration}</p>
    </div>
  );
};

export default NavBar;
