import { useContext } from "react";
import { FaCalculator, FaChartBar } from "react-icons/fa";
import { GameContext } from "../../store/GameContext";

const StatsButton = ({
  stats,
  statsToggle,
}: {
  stats: boolean;
  statsToggle: () => void;
}) => {
  const gameState = useContext(GameContext);

  return !gameState.ended ? null : (
    <button onClick={statsToggle}>
      {stats ? <FaCalculator /> : <FaChartBar />}
    </button>
  );
};

export default StatsButton;
