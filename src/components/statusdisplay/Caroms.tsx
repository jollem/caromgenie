import { useContext } from "react";
import { FaCrosshairs } from "react-icons/fa";
import { GameContext, MAX } from "../../store/GameContext";
import InfoLine from "./InfoLine";

const Caroms = () => {
  const gameState = useContext(GameContext);

  return (
    <InfoLine
      icon={<FaCrosshairs />}
      data={gameState.config.caroms <= MAX ? gameState.config.caroms : "∞"}
    />
  );
};

export default Caroms;
