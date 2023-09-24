import { useContext } from "react";
import { GameContext } from "../../store/GameContext";
import StatusDisplay from "../statusdisplay";
import PlayerCard from "../playercard";
import styles from "./ScoreBoard.module.scss";

const ScoreBoard = () => {
  const gameState = useContext(GameContext);
  return (
    <div className={styles.scoreBoard}>
      <StatusDisplay />
      {gameState.players.map((player, index) => (
        <PlayerCard player={player} playerIndex={index} key={index} />
      ))}
    </div>
  );
};
export default ScoreBoard;
