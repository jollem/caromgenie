import { createContext, useState, useEffect } from "react";

export type Player = {
  name: string;
  innings: number[];
};

type GameState = {
  config: {
    innings: number;
    shotclock: number;
    extension: number;
    extensions: number;
  };
  running: boolean;
  timestamp?: number;
  shotclock?: number;
  players: Player[];
  active?: (state: GameState) => number;
  next?: (state: GameState) => number;
  increment?: () => void;
  decrement?: () => void;
  setNextActive?: () => void;
  pauseToggle?: () => void;
  start?: (players: string[]) => void;
  reset?: () => void;
};

const initialValues = {
  config: {
    innings: 40,
    shotclock: 40,
    extension: 40,
    extensions: 1,
  },
  running: false,
  timestamp: undefined,
  shotclock: undefined,
  innings: 0,
  players: [],
};

const clone = (state: GameState): GameState => ({
  ...state,
  config: { ...state.config },
  players: state.players.map((player) => ({
    ...player,
    innings: [...player.innings],
  })),
});

export const GameContext = createContext<GameState>({ ...initialValues });

let shotclock: ReturnType<typeof setInterval> | undefined = undefined;

const Provider = ({ children }: { children: React.ReactNode }) => {
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
          state.shotclock = (state.shotclock ?? state.config.shotclock) - 1;
          return state;
        }),
      1000
    );
  };

  const active = (state: GameState): number => {
    if (!state?.timestamp) {
      return -1;
    }
    return (
      state.players.reduce((acc, player) => acc + player.innings.length, -1) %
      state.players.length
    );
  };

  const next = (state: GameState): number =>
    (active(state) + 1) % state.players.length;

  const increment = () =>
    setGameState((prev) => {
      const state = clone(prev);
      state.players[active(prev)].innings[
        state.players[active(prev)].innings.length - 1
      ]++;
      startShotClock(prev.config.shotclock);
      state.running = true;
      return state;
    });

  const decrement = () =>
    setGameState((prev) => {
      const state = clone(prev);
      state.players[active(prev)].innings[
        state.players[active(prev)].innings.length - 1
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

      startShotClock(state.config.shotclock);
      const nextPlayer = next(state);
      state.players[nextPlayer].innings = [
        ...state.players[nextPlayer].innings,
        0,
      ];
      return state;
    });

  const pauseToggle = () => {
    setGameState((prev) => {
      const state = clone(prev);
      state.running
        ? clearInterval(shotclock)
        : startShotClock(prev.shotclock ?? prev.config.shotclock);
      state.running = !state.running;
      return state;
    });
  };

  const start = (formData: string[]) =>
    setGameState((prev) => {
      const players = formData.filter(Boolean).map((name) => ({
        name,
        innings: [],
        extensions: prev.config.extensions,
      }));
      return { ...prev, ...initialValues, players };
    });

  const reset = () => setGameState((prev) => ({ ...prev, players: [] }));

  const [gameState, setGameState] = useState<GameState>({
    ...initialValues,
    active,
    next,
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

export default Provider;
