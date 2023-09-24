import { useContext } from "react";
import { FaStopwatch, FaChartLine, FaStar, FaUser } from "react-icons/fa";
import classnames from "classnames";
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

  const isActive = gameState.active?.(gameState) === playerIndex;
  const isNext = gameState.next?.(gameState) === playerIndex;

  return (
    <div
      className={classnames(styles.player, {
        [styles.active]: isActive,
        [styles.actionable]: isNext,
      })}
      onClick={() => isNext && gameState.setNextActive?.()}
    >
      <div className={styles.statusRow}>
        <span className={styles.big}>
          <FaUser /> {player.name}
        </span>
        {!!gameState.config.extensions && (
          <span>
            {player.extensions} x <FaStopwatch />
          </span>
        )}
      </div>
      <div className={styles.scoreCard}>
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
