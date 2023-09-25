import { useContext } from "react";
import { FaHandPointRight } from "react-icons/fa";
import classnames from "classnames";
import { GameContext } from "../../store/GameContext";
import styles from "./ShotClock.module.scss";

const InfoBar = () => {
  const gameState = useContext(GameContext);
  return gameState.started ? null : (
    <div className={classnames(styles.centerSelf, styles.gameOver)}>
      <FaHandPointRight />
      {"⚪️"}
    </div>
  );
};

export default InfoBar;
