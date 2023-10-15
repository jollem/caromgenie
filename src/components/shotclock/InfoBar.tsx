import { useContext } from "react";
import { FaHandPointLeft } from "react-icons/fa";
import clsx from "clsx";
import { GameContext } from "../../store/GameContext";
import styles from "./ShotClock.module.scss";

const InfoBar = () => {
  const gameState = useContext(GameContext);
  return gameState.started ? null : (
    <div className={clsx(styles.centerSelf, styles.gameOver)}>
      <span>
        <FaHandPointLeft />
      </span>
    </div>
  );
};

export default InfoBar;
