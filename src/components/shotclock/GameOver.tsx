import { useContext } from "react";
import { FaHandshake, FaCrown } from "react-icons/fa";
import classnames from "classnames";
import { GameContext } from "../../store/GameContext";
import styles from "./ShotClock.module.scss";

const GameOver = () => {
  const gameState = useContext(GameContext);

  if (!gameState.started || !gameState.ended) {
    return null;
  }

  const balls = ["⚪️", "🟡", "🔴"];
  const scores = gameState.players.map((player) =>
    player.innings.reduce((acc, inning) => acc + inning, 0)
  );
  const max = Math.max(...scores);

  return (
    <div className={classnames(styles.centerSelf, styles.gameOver)}>
      {scores.indexOf(max) === scores.lastIndexOf(max) ? (
        <>
          <FaCrown /> {balls[scores.indexOf(max)]} <FaCrown />
        </>
      ) : (
        <FaHandshake />
      )}
    </div>
  );
};

export default GameOver;
