import { createContext, useState, useEffect } from "react";

export type Player = {
  name: string;
  innings: number[];
};

type GameState = {
  running: boolean;
  timestamp: number;
  shotclock: number;
  active: number;
  innings: number;
  players: Player[];
  increment?: () => void;
  decrement?: () => void;
  setNextActive?: () => void;
  pauseToggle?: () => void;
  start?: (players: string[]) => void;
  reset?: () => void;
};

const initialValues = {
  running: false,
  timestamp: 0,
  shotclock: 0,
  active: -1,
  innings: 0,
  players: [],
};

const clone = (state: GameState): GameState => ({
  ...state,
  players: state.players.map((player) => ({
    ...player,
    innings: [...player.innings],
  })),
});

export const GameContext = createContext<GameState>({ ...initialValues });

let shotclock: ReturnType<typeof setInterval> | undefined = undefined;

const provider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const timer = setInterval(() => setGameState((prev) => clone(prev)), 1000);
    return () => clearInterval(timer);
  }, []);

  const setShotClock = (seconds: number) =>
    setGameState((prev) => {
      const state = clone(prev);
      state.shotclock = seconds;
      return state;
    });

  const startShotClock = (seconds: number) => {
    clearInterval(shotclock);
    setShotClock(seconds);
    shotclock = setInterval(
      () =>
        setGameState((prev) => {
          if (prev.shotclock === 0) {
            clearInterval(shotclock);
            return prev;
          }
          const state = clone(prev);
          state.shotclock -= 1;
          return state;
        }),
      1000
    );
  };

  const increment = () =>
    setGameState((prev) => {
      const state = clone(prev);
      state.players[prev.active].innings[
        state.players[prev.active].innings.length - 1
      ]++;
      startShotClock(40);
      state.running = true;
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
      startShotClock(40);
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

  const pauseToggle = () => {
    setGameState((prev) => {
      const state = clone(prev);
      state.running ? clearInterval(shotclock) : startShotClock(prev.shotclock);
      state.running = !state.running;
      return state;
    });
  };

  const start = (formData: string[]) => {
    const players = formData
      .filter(Boolean)
      .map((name) => ({ name, innings: [] }));
    setGameState((prev) => ({ ...prev, ...initialValues, players }));
  };

  const reset = () => setGameState((prev) => ({ ...prev, players: [] }));

  const [gameState, setGameState] = useState<GameState>({
    ...initialValues,
    increment,
    decrement,
    setNextActive,
    pauseToggle,
    start,
    reset,
  });

  return (
    <GameContext.Provider value={gameState}>{children}</GameContext.Provider>
  );
};

export default provider;
