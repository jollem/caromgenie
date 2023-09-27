import { useContext } from "react";
import { FaPeopleArrows } from "react-icons/fa";
import { GameContext } from "../../store/GameContext";

const SwapButton = () => {
  const gameState = useContext(GameContext);

  return gameState.started || gameState.players.length != 2 ? null : (
    <button onClick={gameState.swapPlayers}>
      <FaPeopleArrows />
    </button>
  );
};

export default SwapButton;
