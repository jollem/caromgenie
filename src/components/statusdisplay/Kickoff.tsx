import { useContext } from "react";
import { FaClock } from "react-icons/fa";
import { GameContext } from "../../store/GameContext";
import InfoLine from "./InfoLine";

const KickOff = () => {
  const gameState = useContext(GameContext);

  if (!gameState.timestamp) {
    return null;
  }

  const data = new Date(gameState.timestamp).toLocaleTimeString().slice(0, -3);

  return <InfoLine icon={<FaClock />} data={data} />;
};

export default KickOff;
