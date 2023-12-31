import { useContext } from "react";
import { GameContext } from "../../store/GameContext";

const Innings = () => {
  const gameState = useContext(GameContext);

  return (
    <div>
      {Math.max(...gameState.players.map((player) => player.innings.length))}
    </div>
  );
};

export default Innings;
