import { useContext, useEffect } from "react";
import { FaHandshake, FaTrophy } from "react-icons/fa";
import clsx from "clsx";
import { useReward } from "react-rewards";
import { GameContext } from "../../store/GameContext";
import styles from "./ShotClock.module.scss";

const GameOver = () => {
  const gameState = useContext(GameContext);
  const { reward } = useReward("innings", "confetti", {
    lifetime: 1000,
    elementCount: 100,
    spread: 90,
    startVelocity: 30,
    zIndex: 100,
  });

  useEffect(() => {
    const [second, first] = gameState.players
      .map((player) => player.innings.reduce((acc, inning) => acc + inning, 0))
      .sort()
      .slice(-2);
    gameState.ended && first !== second && reward();
  }, [gameState.ended]);

  if (!gameState.started || !gameState.ended) {
    return null;
  }

  const scores = gameState.players.map((player) =>
    player.innings.reduce((acc, inning) => acc + inning, 0)
  );
  const [second, first] = [...scores].sort().slice(-2);

  return (
    <div className={clsx(styles.centerSelf, styles.gameOver)}>
      {first !== second ? (
        <>
          <FaTrophy /> {["⚪️", "🟡", "🔴"][scores.indexOf(first)]} <FaTrophy />
        </>
      ) : (
        <FaHandshake />
      )}
    </div>
  );
};

export default GameOver;
