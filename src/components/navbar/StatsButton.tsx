import { useContext } from "react";
import { FaChartBar } from "react-icons/fa";
import { GameContext } from "../../store/GameContext";

const StatsButton = ({ statsToggle }: { statsToggle: () => void }) => {
  const gameState = useContext(GameContext);

  return !gameState.ended ? null : (
    <button onClick={statsToggle}>
      <FaChartBar />
    </button>
  );
};

export default StatsButton;
