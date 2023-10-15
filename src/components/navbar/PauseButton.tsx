import { useContext } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import clsx from "clsx";
import { GameContext } from "../../store/GameContext";

const PauseButton = () => {
  const gameState = useContext(GameContext);

  return (
    <button
      onClick={gameState.pauseToggle}
      className={clsx({ hide: !gameState.started || gameState.ended })}
    >
      {gameState.running ? <FaPause /> : <FaPlay />}
    </button>
  );
};

export default PauseButton;
