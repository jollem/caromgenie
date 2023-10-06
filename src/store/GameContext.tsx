import { createContext, useState } from "react";

export type Player = {
  name: string;
  innings: number[];
  extensions: number;
};

export type Config = {
  innings: number;
  shotclock: number;
  extension: number;
  extensions: number;
};

type GameState = {
  config: Config;
  running: boolean;
  started?: number;
  ended?: number;
  shotclock: number;
  players: Player[];
  active?: (state: GameState) => number;
  next?: (state: GameState) => number;
  increment?: () => void;
  decrement?: () => void;
  extension?: () => void;
  setNextActive?: () => void;
  pauseToggle?: () => void;
  swapPlayers?: () => void;
  start?: (players: string[]) => void;
  reset?: () => void;
  configure?: (config: Config) => void;
};

const initialValues = {
  config: {
    innings: 40,
    shotclock: 40,
    extension: 40,
    extensions: 1,
  },
  running: false,
  started: undefined,
  ended: undefined,
  shotclock: 0,
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
  const startShotClock = (state: GameState): GameState => {
    clearInterval(shotclock);
    shotclock = setInterval(
      () =>
        setGameState((prev) => {
          if (!prev.running) {
            return prev;
          }
          if (prev.shotclock <= 0) {
            clearInterval(shotclock);
            return prev;
          }
          const state = clone(prev);
          state.shotclock--;
          return state;
        }),
      1000
    );
    state.shotclock = state.config.shotclock;
    return state;
  };

  const gameOver = (state: GameState): Boolean =>
    !!state.ended ||
    state.players.some(
      (player) => player.innings.length > state.config.innings
    );

  const active = (state: GameState): number => {
    if (!state?.started && !gameOver(state)) {
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
      if (gameOver(prev)) {
        return prev;
      }
      const state = clone(prev);
      state.players[active(prev)].innings[
        state.players[active(prev)].innings.length - 1
      ]++;
      state.running = true;
      return startShotClock(state);
    });

  const decrement = () =>
    setGameState((prev) => {
      if (gameOver(prev)) {
        return prev;
      }
      const state = clone(prev);
      state.players[active(prev)].innings[
        state.players[active(prev)].innings.length - 1
      ]--;
      return state;
    });

  const extension = () =>
    setGameState((prev) => {
      if (gameOver(prev)) {
        return prev;
      }
      const activePlayer = active(prev);
      const availableExtensions = prev.players[active(prev)].extensions;

      if (availableExtensions <= 0 || prev.shotclock <= 0 || !prev.running) {
        return prev;
      }

      const state = clone(prev);
      state.shotclock += prev.config.extension;
      state.players[activePlayer].extensions--;

      return state;
    });

  const setNextActive = () =>
    setGameState((prev) => {
      if (gameOver(prev)) {
        return prev;
      }
      const state = clone(prev);

      state.running = true;

      if (!state.started) {
        state.started = Date.now();
      }

      const nextPlayer = next(state);
      state.players[nextPlayer].innings = [
        ...state.players[nextPlayer].innings,
        0,
      ];

      if (gameOver(state)) {
        clearInterval(shotclock);
        state.shotclock = 0;
        state.running = false;
        state.ended = Date.now();
        state.players.forEach(
          (player) =>
            (player.innings = player.innings.slice(0, state.config.innings))
        );
      } else {
        startShotClock(state);
      }

      return state;
    });

  const pauseToggle = () => {
    setGameState((prev) => {
      if (gameOver(prev)) {
        return prev;
      }
      const state = clone(prev);
      state.running = !state.running;
      return state;
    });
  };

  const swapPlayers = () => {
    setGameState((prev) => {
      const state = clone(prev);
      if (state.players.length === 2 && !state.started) {
        [state.players[0], state.players[1]] = [
          state.players[1],
          state.players[0],
        ];
      }
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
      return { ...prev, ...initialValues, config: prev.config, players };
    });

  const reset = () => setGameState((prev) => ({ ...prev, players: [] }));

  const configure = (config: Config) =>
    setGameState((prev) => ({ ...prev, config }));

  const [gameState, setGameState] = useState<GameState>({
    ...initialValues,
    active,
    next,
    increment,
    decrement,
    extension,
    setNextActive,
    pauseToggle,
    swapPlayers,
    start,
    reset,
    configure,
  });

  return (
    <GameContext.Provider value={gameState}>{children}</GameContext.Provider>
  );
};

export default Provider;
