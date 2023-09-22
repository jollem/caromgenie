import { useContext } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { GameContext } from "../../store/GameContext";

const ResetButton = () => {
  const gameState = useContext(GameContext);

  return (
    <button onClick={gameState.reset}>
      <FaArrowAltCircleLeft />
    </button>
  );
};

export default ResetButton;
