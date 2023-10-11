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

type ShotClock = {
  milliseconds: number;
  timestamp: number;
};

type GameState = {
  config: Config;
  running: boolean;
  started?: number;
  ended?: number;
  shotclock: ShotClock;
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
  shotclock: {
    milliseconds: 0,
    timestamp: 0,
  },
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

const Provider = ({ children }: { children: React.ReactNode }) => {
  const initalizeShotClock = (seconds: number): ShotClock => ({
    milliseconds: seconds * 1000,
    timestamp: Date.now(),
  });

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
      state.shotclock = initalizeShotClock(state.config.shotclock);
      return state;
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

      if (availableExtensions <= 0 || !prev.running) {
        return prev;
      }

      const state = clone(prev);
      state.shotclock.milliseconds += prev.config.extension * 1000;
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
        state.running = false;
        state.ended = Date.now();
        state.players.forEach(
          (player) =>
            (player.innings = player.innings.slice(0, state.config.innings))
        );
      } else {
        state.shotclock = initalizeShotClock(state.config.shotclock);
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
      if (state.running) {
        state.shotclock.timestamp = Date.now();
      } else {
        state.shotclock.milliseconds -= Date.now() - state.shotclock.timestamp;
      }
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
