import { useContext } from "react";
import { GameContext } from "../../store/GameContext";
import ResetButton from "./ResetButton";
import PauseToggle from "./PauseToggle";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  const gameState = useContext(GameContext);

  return (
    <nav className={styles.navbar}>
      <ResetButton />
      <PauseToggle />
    </nav>
  );
};

export default NavBar;
