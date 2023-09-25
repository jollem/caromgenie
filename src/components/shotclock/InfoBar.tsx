import { useContext } from "react";
import { FaHandPointRight, FaUser } from "react-icons/fa";
import { GameContext } from "../../store/GameContext";
import styles from "./ShotClock.module.scss";

const InfoBar = () => {
  const gameState = useContext(GameContext);
  return gameState.started ? null : (
    <div className={styles.centerSelf}>
      <FaHandPointRight />
      <FaUser />
    </div>
  );
};

export default InfoBar;
