import { createContext, useState, useEffect } from "react";
import { type Output } from "valibot";
import Schema from "./schema";
import sync from "../app/api/sync/[game]/client";
import CacheKeys from "./localStorage";

type Player = Output<typeof Schema.Player>;
export type Config = Output<typeof Schema.Config>;
type ShotClock = Output<typeof Schema.ShotClock>;
export type GameState = Output<typeof Schema.GameState>;

type Game = GameState & {
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
    caroms: 30,
    shotclock: 40,
    extension: 40,
    extensions: 1,
  },
  running: false,
  started: 0,
  ended: 0,
  shotclock: {
    milliseconds: 0,
    timestamp: 0,
  },
  players: [],
};

export const GameContext = createContext<Game>({ ...initialValues });

const Provider = ({ children }: { children: React.ReactNode }) => {
  const initalizeShotClock = (seconds: number): ShotClock => ({
    milliseconds: seconds * 1000,
    timestamp: Date.now(),
  });

  const gameOver = (state: GameState): Boolean =>
    !next(state) &&
    state.players
      .map((player) =>
        player.innings.reduce(
          (acc, caroms) => ({
            innings: acc.innings + 1,
            caroms: acc.caroms + caroms,
          }),
          { innings: 0, caroms: 0 }
        )
      )
      .some(
        (result) =>
          result.innings >= state.config.innings ||
          result.caroms >= state.config.caroms
      );

  const active = (state: GameState): number =>
    state.ended
      ? -1
      : state.players.reduce((acc, player) => acc + player.innings.length, -1) %
        state.players.length;

  const next = (state: GameState): number =>
    (active(state) + 1) % state.players.length;

  const ifRunning = (
    state: GameState,
    nextState: (state: GameState) => GameState
  ): void => {
    !state.ended && setGameState(nextState);
  };

  const addToCaroms = (player: Player, change: number): void => {
    const current = player.innings.length - 1;
    const caroms = player.innings[current] + change;
    if (caroms >= 0) {
      player.innings[current] = caroms;
    }
  };

  const increment = () =>
    ifRunning(gameState, (prev) => {
      addToCaroms(prev.players[active(prev)], 1);
      return {
        ...prev,
        running: true,
        shotclock: initalizeShotClock(prev.config.shotclock),
      };
    });

  const decrement = () =>
    ifRunning(gameState, (prev) => {
      addToCaroms(prev.players[active(prev)], -1);
      return { ...prev };
    });

  const extension = () =>
    ifRunning(gameState, (prev) => {
      const activePlayer = active(prev);

      if (prev.players[activePlayer].extensions <= 0 || !prev.running) {
        return { ...prev };
      }

      return {
        ...prev,
        shotclock: {
          timestamp: Date.now(),
          milliseconds:
            prev.shotclock.milliseconds -
            (Date.now() - prev.shotclock.timestamp) +
            prev.config.extension * 1000,
        },
        players: prev.players.map((player, index) => ({
          ...player,
          extensions: player.extensions - (activePlayer === index ? 1 : 0),
        })),
      };
    });

  const setNextActive = () =>
    ifRunning(gameState, (state) =>
      gameOver(state)
        ? { ...state, ended: Date.now() }
        : {
            ...state,
            running: true,
            started: state.started || Date.now(),
            shotclock: initalizeShotClock(state.config.shotclock),
            players: state.players.map((player, index) => ({
              ...player,
              innings:
                index === next(state)
                  ? [...player.innings, 0]
                  : [...player.innings],
            })),
          }
    );

  const pauseToggle = () =>
    ifRunning(gameState, (prev) => ({
      ...prev,
      running: !prev.running,
      shotclock: {
        timestamp: prev.running ? prev.shotclock.timestamp : Date.now(),
        milliseconds: prev.running
          ? prev.shotclock.milliseconds -
            (Date.now() - prev.shotclock.timestamp)
          : prev.shotclock.milliseconds,
      },
    }));

  const swapPlayers = () =>
    setGameState((prev) => ({
      ...prev,
      players: [prev.players[1], prev.players[0]],
    }));

  const start = (players: string[]) =>
    setGameState((prev) => ({
      ...initialValues,
      config: { ...prev.config },
      players: players.filter(Boolean).map((name) => ({
        name,
        innings: [],
        extensions: prev.config.extensions,
      })),
    }));

  const reset = () => setGameState((prev) => ({ ...prev, players: [] }));

  const configure = (config: Config) => {
    localStorage.setItem(CacheKeys.CONFIG, JSON.stringify(config));
    setGameState((prev) => ({ ...prev, config }));
  };

  const [gameState, setGameState] = useState<GameState>({
    ...initialValues,
  });

  const [gameId, setGameId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(
      CacheKeys.ID,
      localStorage.getItem(CacheKeys.ID) || crypto.randomUUID()
    );
    setGameId(localStorage.getItem(CacheKeys.ID));
    setGameState((prev) => ({
      ...prev,
      config: JSON.parse(
        localStorage.getItem(CacheKeys.CONFIG) ||
          JSON.stringify(initialValues.config)
      ),
    }));
  }, []);

  useEffect(() => sync(gameId, gameState), [gameState]);

  return (
    <GameContext.Provider
      value={{
        ...gameState,
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default Provider;
