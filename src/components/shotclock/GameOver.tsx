import { useContext, useEffect, useState } from "react";
import { FaHandshake, FaTrophy } from "react-icons/fa";
import clsx from "clsx";
import { useReward } from "react-rewards";
import { GameContext } from "../../store/GameContext";
import styles from "./ShotClock.module.scss";

const GameOver = () => {
  const gameState = useContext(GameContext);
  const [winner, setWinner] = useState<number>(-1);
  const { reward } = useReward("confetti", "confetti", {
    lifetime: 1500,
    elementCount: 100,
    spread: 90,
    startVelocity: 40,
    zIndex: 100,
  });

  useEffect(() => {
    if (gameState.ended) {
      const scores = gameState.players.map((player) =>
        player.innings.reduce((acc, inning) => acc + inning, 0)
      );
      const [second, first] = [...scores].sort((a, b) => a - b).slice(-2);
      if (first !== second) {
        setWinner((prev) => {
          if (prev < 0) {
            reward();
          }
          return scores.indexOf(first);
        });
      }
    } else {
      setWinner(-1);
    }
  }, [gameState.ended, gameState.players, reward]);

  if (!gameState.ended) {
    return null;
  }

  return (
    <div className={clsx(styles.centerSelf, styles.gameOver)} id="confetti">
      {winner >= 0 ? (
        <div>
          <FaTrophy /> {["⚪️", "🟡", "🔴"][winner]} <FaTrophy />
        </div>
      ) : (
        <FaHandshake />
      )}
    </div>
  );
};

export default GameOver;
