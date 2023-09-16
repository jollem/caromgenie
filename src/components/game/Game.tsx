import { useContext } from "react";
import { GameContext } from "../../store/GameContext";
import PlayerCard from "../playercard";
import styles from "./Game.module.css";

/*
      Active: {gameState.active}
      <br />
      <button onClick={gameState.pauseToggle}>Pause</button>
      <button onClick={gameState.setNextActive}>Activate next</button>
      <button onClick={gameState.increment}>+</button>
      <button onClick={gameState.decrement}>-</button>
      <br />

*/
const Game = () => {
  const gameState = useContext(GameContext);
  return (
    <div className={styles.game}>
      <div className={styles.scoreBoard}>
        {gameState.players.map((player, index) => (
          <PlayerCard
            player={player}
            active={gameState.active === index}
            number={index}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
export default Game;
