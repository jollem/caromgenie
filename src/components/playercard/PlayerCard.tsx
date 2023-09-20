import { useContext } from "react";
import { GameContext } from "../../store/GameContext";
import classnames from "classnames";
import type { Player } from "../../store/GameContext";
import styles from "./PlayerCard.module.css";

const PlayerCard = ({
  player,

  playerIndex,
}: {
  player: Player;

  playerIndex: number;
}) => {
  const gameState = useContext(GameContext);

  const isActive = gameState.active?.(gameState) === playerIndex;
  const isNext = gameState.next?.(gameState) === playerIndex;

  return (
    <div
      className={classnames(styles.player, {
        [styles.active]: isActive,
        [styles.first]: playerIndex === 0,
        [styles.second]: playerIndex === 1,
        [styles.third]: playerIndex === 2,
        [styles.actionable]: isNext,
      })}
      onClick={() => isNext && gameState.setNextActive?.()}
    >
      <div className={styles.nameContainer}>
        <span>{player.name}</span>
        {gameState.config.extensions && (
          <button
            disabled={
              !gameState.running ||
              !player.extensions ||
              gameState.shotclock === 0 ||
              !isActive
            }
            onClick={() => gameState.extension?.()}
          >
            {player.extensions}
          </button>
        )}
      </div>
      <div
        className={classnames(styles.scoreCard, {
          [styles.white]: playerIndex === 0,
          [styles.yellow]: playerIndex === 1,
          [styles.red]: playerIndex === 2,
        })}
      >
        <div
          className={classnames(styles.overlayTop, {
            [styles.actionable]: isActive,
          })}
          onClick={() => {
            if (isActive) {
              gameState.increment?.();
            }
          }}
        />
        <div
          className={classnames(styles.overlayBottom, {
            [styles.actionable]: isActive,
          })}
          onClick={() => {
            if (isActive) {
              gameState.decrement?.();
            }
          }}
        />
        {player.innings.reduce((acc, curr) => acc + curr, 0)}
      </div>
      <div className={styles.statusContainer}>
        <div>HR: {Math.max(...player.innings, 0)}</div>
        <div>{player.innings[player.innings.length - 1] || 0}</div>
        <div>
          AVG:{" "}
          {(
            player.innings.reduce((acc, curr) => acc + curr, 0) /
              player.innings.length || 0
          ).toFixed(3)}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
