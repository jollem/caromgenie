import { useContext } from "react";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Chart,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { GameContext } from "../../store/GameContext";
import styles from "./Statistics.module.scss";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const Statistics = () => {
  const gameState = useContext(GameContext);

  const colors = ["white", "yellow", "red"];

  const max = Math.max(
    ...gameState.players.map((player) =>
      player.innings.reduce((acc, inning) => acc + inning, 0)
    )
  );

  const data = {
    labels: gameState.players.length
      ? [0, ...gameState.players[0].innings.map((_, i) => i + 1)]
      : undefined,
    datasets: gameState.players.map((player, index) => ({
      data: player.innings.reduce(
        (acc, innings) => [...acc, Number(acc.slice(-1)) + innings],
        [0]
      ),
      borderColor: colors[index],
    })),
  };

  const options = {
    layout: {
      padding: 20,
    },
    datasets: {
      line: {
        borderWidth: 5,
        tension: 0.2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        min: 0,
        max: gameState.config.innings,
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max,
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={styles.statistics}>
      <Line data={data} options={options} />
    </div>
  );
};

export default Statistics;
