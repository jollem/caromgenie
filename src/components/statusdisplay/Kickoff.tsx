import { useContext } from "react";
import { FaClock } from "react-icons/fa";
import { GameContext } from "../../store/GameContext";
import InfoLine from "./InfoLine";

const KickOff = () => {
  const gameState = useContext(GameContext);

  if (!gameState.started) {
    return null;
  }

  const data = new Date(gameState.started).toLocaleTimeString().slice(0, -3);

  return <InfoLine icon={<FaClock />} data={data} />;
};

export default KickOff;
