import {
  type Output,
  object,
  array,
  string,
  number,
  integer,
  boolean,
} from "valibot";

const Player = object({
  name: string(),
  innings: array(number([integer()])),
  extensions: number([integer()]),
});

const Config = object({
  innings: number([integer()]),
  caroms: number([integer()]),
  shotclock: number([integer()]),
  extension: number([integer()]),
  extensions: number([integer()]),
});

const ShotClock = object({
  milliseconds: number([integer()]),
  timestamp: number([integer()]),
});

const GameState = object({
  config: Config,
  running: boolean(),
  started: number([integer()]),
  ended: number([integer()]),
  shotclock: ShotClock,
  players: array(Player),
});

export default {
  Player,
  Config,
  ShotClock,
  GameState,
};
