import { useContext } from "react";
import { GameContext } from "../../store/GameContext";
import ResetButton from "./ResetButton";
import PauseButton from "./PauseButton";
import styles from "./NavBar.module.scss";
import SwapButton from "./SwapButton";

const NavBar = () => {
  const gameState = useContext(GameContext);

  return (
    <nav className={styles.navbar}>
      <ResetButton />
      <SwapButton />
      <PauseButton />
    </nav>
  );
};

export default NavBar;
