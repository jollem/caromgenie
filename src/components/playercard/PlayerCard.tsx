import { useContext } from "react";
import { GameContext } from "../../store/GameContext";
import classnames from "classnames";
import type { Player } from "../../store/GameContext";
import styles from "./PlayerCard.module.css";

const PlayerCard = ({
  player,
  active,
  number,
}: {
  player: Player;
  active: boolean;
  number: number;
}) => {
  const gameState = useContext(GameContext);
  return (
    <div
      className={classnames(styles.player, {
        [styles.active]: active,
        [styles.first]: number === 0,
        [styles.second]: number === 1,
        [styles.third]: number === 2,
        [styles.actionable]:
          gameState.innings % gameState.players.length === number,
      })}
      onClick={() => {
        if (gameState.innings % gameState.players.length === number) {
          gameState.setNextActive?.();
        }
      }}
    >
      <div className={styles.nameContainer}>{player.name}</div>
      <div
        className={classnames(styles.scoreCard, {
          [styles.white]: number === 0,
          [styles.yellow]: number === 1,
          [styles.red]: number === 2,
        })}
      >
        <div
          className={classnames(styles.overlayTop, {
            [styles.actionable]: active,
          })}
          onClick={() => {
            if (active) {
              gameState.increment?.();
            }
          }}
        />
        <div
          className={classnames(styles.overlayBottom, {
            [styles.actionable]: active,
          })}
          onClick={() => {
            if (active) {
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
