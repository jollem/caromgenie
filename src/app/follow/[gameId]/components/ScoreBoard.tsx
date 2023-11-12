import { useContext } from "react";
import clsx from "clsx";
import { FaHourglass } from "react-icons/fa";
import { ObserverContext } from "@/store/ObserverContext";
import styles from "./ScoreBoard.module.scss";
import ShotClock from "./ShotClock";

const ScoreBoard = () => {
  const state = useContext(ObserverContext);

  const innings = Math.max(
    0,
    ...state.players.map((player) => player.innings.length)
  );
  const active =
    state.players.reduce((acc, player) => acc + player.innings.length, -1) %
    state.players.length;

  return (
    <div className={styles.container}>
      <div key="innings" className={styles.innings}>
        {innings}
      </div>
      {state.players.length ? (
        <div key="players" className={styles.players}>
          {state.players.map((player, index) => [
            <div key={`${player.name}-name`} className={styles.name}>
              {player.name}
            </div>,
            <div
              key={`${player.name}-caroms`}
              className={clsx(styles[`player${index}`], styles.caroms)}
            >
              {player.innings.reduce((acc, curr) => acc + curr, 0)}
            </div>,
            <div
              key={`${player.name}-inning`}
              className={clsx(styles[`player${index}`], styles.inning)}
            >
              {active === index && !state.ended ? player.innings.slice(-1) : ""}
            </div>,
            <div key={`${player.name}-avg`} className={styles.name}>
              {(
                player.innings.reduce((acc, curr) => acc + curr, 0) /
                Math.max(1, player.innings.length)
              ).toFixed(3)}
            </div>,
          ])}
        </div>
      ) : (
        <div className={styles.wait}>
          <FaHourglass />
        </div>
      )}
      <ShotClock />
    </div>
  );
};

export default ScoreBoard;
