import { useContext } from "react";
import { GameContext } from "../../store/GameContext";
import StatusDisplay from "../statusdisplay";
import PlayerCard from "../playercard";
import styles from "./Game.module.css";

const Game = () => {
  const gameState = useContext(GameContext);
  return (
    <div className={styles.game}>
      <div className={styles.scoreBoard}>
        <StatusDisplay />
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
