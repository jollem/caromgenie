import { useContext } from "react";
import classnames from "classnames";
import { FaHourglassEnd } from "react-icons/fa";
import { GameContext } from "../../store/GameContext";
import styles from "./ShotClock.module.scss";

const Overtime = () => {
  const gameState = useContext(GameContext);

  return gameState.timestamp && !!!gameState.shotclock ? (
    <div className={classnames(styles.centerSelf, styles.overtime)}>
      <FaHourglassEnd />
    </div>
  ) : null;
};

export default Overtime;
