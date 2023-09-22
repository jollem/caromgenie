import { useContext } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import classnames from "classnames";
import { GameContext } from "../../store/GameContext";

const PauseToggle = () => {
  const gameState = useContext(GameContext);

  return (
    <button
      onClick={gameState.pauseToggle}
      className={classnames({ hide: !gameState.timestamp })}
    >
      {gameState.running ? <FaPause /> : <FaPlay />}
    </button>
  );
};

export default PauseToggle;
