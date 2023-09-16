import { useContext } from "react";
import { GameContext } from "../../store/GameContext";
import styles from "./Game.module.css";

const Game = () => {
  const gameState = useContext(GameContext);
  return <div className={styles.game}>{gameState.hello}</div>;
};
export default Game;
