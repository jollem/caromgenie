import { createContext, useState, useEffect } from "react";
import { type Output } from "valibot";
import Schema from "./schema";
import CacheKeys from "./localStorage";
import Pusher, { Channel } from "pusher-js";

export type Player = Output<typeof Schema.Player>;
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
  revert?: () => void;
  pauseToggle?: () => void;
  swapPlayers?: () => void;
  start?: (players: string[]) => void;
  reset?: () => void;
  configure?: (config: Config) => void;
  gameId?: string;
};

export const pusherChannel = (gameId: string) => `private-${gameId}`;
export const PUSHER_EVENT = "client-sync";

export const MIN = 1;
export const MAX = 99;

export const initialValues = {
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
    !!state.players
      .map((player) =>
        player.innings.reduce(
          (acc, caroms) => ({
            ...acc,
            caroms: acc.caroms + caroms,
          }),
          { innings: player.innings.length, caroms: 0 }
        )
      )
      .filter(
        (result) =>
          result.innings >= state.config.innings ||
          result.caroms >= state.config.caroms
      )
      .map((result) => result.caroms)
      .sort((a, b) => b - a)
      .filter(
        (caroms, i, arr) => (!i && caroms > arr[i + 1]) || arr.length === 1
      ).length;

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

  const addToCaroms = (
    players: Player[],
    active: number,
    change: number
  ): Player[] =>
    players.map((player, playerIndex) => ({
      ...player,
      innings: player.innings.map(
        (inning, inningIndex, innings) =>
          inning +
          (playerIndex === active && inningIndex === innings.length - 1
            ? change
            : 0)
      ),
    }));

  const increment = () =>
    ifRunning(gameState, (prev) => ({
      ...prev,
      players: addToCaroms(prev.players, active(prev), 1),
      running: true,
      shotclock: initalizeShotClock(prev.config.shotclock),
    }));

  const decrement = () =>
    ifRunning(gameState, (prev) => ({
      ...prev,
      players: addToCaroms(prev.players, active(prev), -1),
    }));

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

  const revert = () =>
    ifRunning(gameState, (state) => ({
      ...state,
      running: true,
      shotclock: initalizeShotClock(state.config.shotclock),
      players: state.players.map((player, index) => ({
        ...player,
        innings:
          index === active(state)
            ? player.innings.slice(0, -1)
            : [...player.innings],
      })),
    }));

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
      players:
        prev.players.length === 2
          ? [prev.players[1], prev.players[0]]
          : prev.players,
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

  const [channel, setChannel] = useState<Channel | null>(null);
  const [gameId, setGameId] = useState<string>("");

  const restoreConfig = () =>
    setGameState((prev) => ({
      ...prev,
      config: JSON.parse(
        localStorage.getItem(CacheKeys.CONFIG) ||
          JSON.stringify(initialValues.config)
      ),
    }));

  const resolveGameId = () => {
    const stored = localStorage.getItem(CacheKeys.ID);
    if (stored) {
      return stored;
    } else {
      const id = crypto.randomUUID();
      localStorage.setItem(CacheKeys.ID, id);
      return id;
    }
  };

  useEffect(() => {
    restoreConfig();
    const gameId = resolveGameId();
    const pusher = new Pusher(process.env.NEXT_PUBLIC_pusher_key || "", {
      cluster: process.env.NEXT_PUBLIC_pusher_cluster || "",
    });
    setChannel(pusher.subscribe(pusherChannel(gameId)));
    setGameId(gameId);

    return () => {
      pusher.disconnect();
    };
  }, []);

  useEffect(() => {
    channel?.trigger(PUSHER_EVENT, gameState);
  }, [gameState, channel]);

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
        revert,
        pauseToggle,
        swapPlayers,
        start,
        reset,
        configure,
        gameId,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default Provider;
