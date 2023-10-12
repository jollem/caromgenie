import { useContext } from "react";
import { FaCircle } from "react-icons/fa";
import { GameContext } from "../../store/GameContext";
import InfoLine from "./InfoLine";

const Target = () => {
  const gameState = useContext(GameContext);

  return <InfoLine icon={<FaCircle />} data={gameState.config.innings} />;
};

export default Target;
