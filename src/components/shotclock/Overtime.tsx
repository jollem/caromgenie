import { useContext } from "react";
import classnames from "classnames";
import { FaHourglassEnd } from "react-icons/fa";
import { GameContext } from "../../store/GameContext";
import styles from "./ShotClock.module.scss";

const Overtime = () => {
  const gameState = useContext(GameContext);

  const overtime =
    Date.now() - gameState.shotclock.timestamp >
    gameState.shotclock.milliseconds;

  return gameState.started && !gameState.ended && overtime ? (
    <div className={classnames(styles.centerSelf, styles.overtime)}>
      <div>
        <FaHourglassEnd />
      </div>
    </div>
  ) : null;
};

export default Overtime;
