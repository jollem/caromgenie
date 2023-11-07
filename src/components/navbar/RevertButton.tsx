import { useContext } from "react";
import { FaEraser } from "react-icons/fa";
import { GameContext } from "../../store/GameContext";

const RevertButton = () => {
  const gameState = useContext(GameContext);

  return gameState.started && !gameState.ended ? (
    <button onClick={gameState.revert}>
      <FaEraser />
    </button>
  ) : null;
};

export default RevertButton;
