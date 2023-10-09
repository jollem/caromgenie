import { useContext, useEffect, useState } from "react";
import { FaHourglass } from "react-icons/fa";
import { GameContext } from "../../store/GameContext";
import InfoLine from "./InfoLine";

const MILLIS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * SECONDS_IN_MINUTE;

const Innings = () => {
  const gameState = useContext(GameContext);

  const diff = () =>
    (gameState.ended || Date.now()) - (gameState.started || Date.now());

  const [timeElapsed, setTimeElapsed] = useState<number>(diff());

  useEffect(() => {
    const timer = setInterval(() => setTimeElapsed(diff()), 1000);
    return () => clearInterval(timer);
  }, [gameState.started, gameState.ended]);

  if (!gameState.started) {
    return null;
  }

  const duration = timeElapsed / MILLIS_IN_SECOND;
  const hours = Math.floor(duration / SECONDS_IN_HOUR);
  const minutes = Math.floor((duration % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  const seconds = Math.floor(duration % SECONDS_IN_MINUTE);

  const data = [hours, minutes, seconds]
    .map((item) => item.toString().padStart(2, "0"))
    .join(":")
    .replace(/^00:/, "");

  return <InfoLine icon={<FaHourglass />} data={data} />;
};

export default Innings;
