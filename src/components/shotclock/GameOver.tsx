import { useContext, useEffect, useState } from "react";
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
  const [winner, setWinner] = useState<number>(-1);
  useEffect(() => {
    if (gameState.ended) {
      const scores = gameState.players.map((player) =>
        player.innings.reduce((acc, inning) => acc + inning, 0)
      );
      const [second, first] = [...scores].sort((a, b) => a - b).slice(-2);
      if (first !== second) {
        setWinner(scores.indexOf(first));
        reward();
      }
    } else {
      setWinner(-1);
    }
  }, [gameState.ended]);

  if (!gameState.ended) {
    return null;
  }

  return (
    <div className={clsx(styles.centerSelf, styles.gameOver)}>
      {winner >= 0 ? (
        <>
          <FaTrophy /> {["⚪️", "🟡", "🔴"][winner]} <FaTrophy />
        </>
      ) : (
        <FaHandshake />
      )}
    </div>
  );
};

export default GameOver;
