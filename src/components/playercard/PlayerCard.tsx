import { useContext } from "react";
import { FaStopwatch, FaChartLine, FaStar } from "react-icons/fa";
import clsx from "clsx";
import { GameContext } from "../../store/GameContext";
import type { Player } from "../../store/GameContext";
import styles from "./PlayerCard.module.scss";

const PlayerCard = ({
  player,
  playerIndex,
}: {
  player: Player;
  playerIndex: number;
}) => {
  const gameState = useContext(GameContext);

  const innings = player.innings.reduce((acc, curr) => acc + curr, 0);
  const isActive =
    !gameState.ended && gameState.active?.(gameState) === playerIndex;
  const isNext =
    !gameState.ended && gameState.next?.(gameState) === playerIndex;

  return (
    <div
      className={clsx(styles.player, {
        [styles.active]: isActive,
      })}
    >
      {isNext && (
        <div
          className={styles.activationOverlay}
          onClick={gameState.setNextActive}
        />
      )}
      <div className={styles.statusRow}>
        <span className={styles.big}>{player.name}</span>
        {!!gameState.config.extensions && (
          <span>
            {player.extensions} <FaStopwatch />
          </span>
        )}
      </div>
      <div className={styles.scoreCard}>
        <button
          disabled={!isActive}
          onClick={() => {
            if (isActive) {
              gameState.increment?.();
            }
          }}
        />
        <button
          disabled={!isActive}
          onClick={() => {
            if (isActive) {
              gameState.decrement?.();
            }
          }}
        />
        <div className={styles.inningsOverlay}>{innings}</div>
      </div>
      <div className={styles.statusRow}>
        <span>
          <FaStar /> {Math.max(...player.innings, 0)}
        </span>
        <span>{player.innings[player.innings.length - 1] || 0}</span>
        <span>
          {(
            player.innings.reduce((acc, curr) => acc + curr, 0) /
              player.innings.length || 0
          ).toFixed(3)}{" "}
          <FaChartLine />
        </span>
      </div>
    </div>
  );
};

export default PlayerCard;
