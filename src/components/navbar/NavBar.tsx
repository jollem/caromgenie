import { useContext } from "react";
import { GameContext } from "../../store/GameContext";
import styles from "./NavBar.module.scss";
import type { IconType } from "react-icons";
import {
  FaArrowAltCircleLeft,
  FaPeopleArrows,
  FaEraser,
  FaCalculator,
  FaChartBar,
  FaRecycle,
  FaPause,
  FaPlay,
} from "react-icons/fa";

const Button: React.FC<{
  action?: () => void;
  Icon: IconType;
}> = ({ action, Icon }) => (
  <button onClick={action}>
    <Icon />
  </button>
);

const NavBar = ({
  stats,
  setShowStats,
}: {
  stats: boolean;
  setShowStats: (state: boolean) => void;
}) => {
  const gameState = useContext(GameContext);

  const buttons = [
    <Button action={gameState.reset} Icon={FaArrowAltCircleLeft} key="reset" />,
    !gameState.started && gameState.players.length === 2 && (
      <Button action={gameState.swapPlayers} Icon={FaPeopleArrows} key="swap" />
    ),
    gameState.started && !gameState.ended && (
      <Button action={gameState.revert} Icon={FaEraser} key="revert" />
    ),
    gameState.ended && (
      <Button
        action={() => setShowStats(!stats)}
        Icon={stats ? FaCalculator : FaChartBar}
        key="statsToggle"
      />
    ),
    gameState.ended && (
      <Button
        action={() => {
          setShowStats(false);
          gameState.start?.(gameState.players.map((player) => player.name));
        }}
        Icon={FaRecycle}
        key="restart"
      />
    ),
    gameState.started && !gameState.ended && gameState.config.shotclock && (
      <Button
        action={gameState.pauseToggle}
        Icon={gameState.running ? FaPause : FaPlay}
        key="pauseToggle"
      />
    ),
  ].filter(Boolean);

  return (
    <nav className={styles.navbar}>
      {[...buttons, <span key="placeholder" />].slice(0, 3)}
    </nav>
  );
};

export default NavBar;
