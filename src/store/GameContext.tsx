import { createContext, useState, useEffect } from "react";
import { clearInterval } from "timers";

export type Player = {
  name: string;
  innings: number[];
};

type GameState = {
  running: boolean;
  timestamp: number;
  duration: number;
  shotclock: number;
  active: number;
  innings: number;
  players: Player[];
  increment?: () => void;
  decrement?: () => void;
  setNextActive?: () => void;
  pauseToggle?: () => void;
};

const initialValues = {
  running: false,
  timestamp: 0,
  duration: 0,
  shotclock: 0,
  active: -1,
  innings: 0,
  players: [
    { name: "Heikki", innings: [] },
    { name: "Risto", innings: [] },
    { name: "Pertti", innings: [] },
  ],
};

const clone = (state: GameState): GameState => ({
  ...state,
  players: state.players.map((player) => ({
    ...player,
    innings: [...player.innings],
  })),
});

export const GameContext = createContext<GameState>({ ...initialValues });

const provider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setGameState((prev) => {
        const state = clone(prev);
        if (state.running) {
          state.shotclock += 1;
          state.duration += 1;
        }
        return state;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const increment = () =>
    setGameState((prev) => {
      const state = clone(prev);
      state.players[prev.active].innings[
        state.players[prev.active].innings.length - 1
      ]++;
      state.shotclock = 0;
      return state;
    });

  const decrement = () =>
    setGameState((prev) => {
      const state = clone(prev);
      state.players[prev.active].innings[
        state.players[prev.active].innings.length - 1
      ]--;
      return state;
    });

  const setNextActive = () =>
    setGameState((prev) => {
      const state = clone(prev);

      state.running = true;

      if (!state.timestamp) {
        state.timestamp = Date.now();
      }
      state.shotclock = 0;
      state.innings += 1;
      state.active =
        state.players.reduce((acc, player) => acc + player.innings.length, 0) %
        state.players.length;
      state.players[state.active].innings = [
        ...state.players[state.active].innings,
        0,
      ];
      return state;
    });

  const pauseToggle = () =>
    setGameState((prev) => {
      const state = clone(prev);
      state.running = !state.running;
      return state;
    });

  const [gameState, setGameState] = useState<GameState>({
    ...initialValues,
    increment,
    decrement,
    setNextActive,
    pauseToggle,
  });

  return (
    <GameContext.Provider value={gameState}>{children}</GameContext.Provider>
  );
};

export default provider;
