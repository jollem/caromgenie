import type { GameState } from "../../../../store/GameContext";

const sync = (payload: GameState): void => {
  fetch("/api/sync/foo", { method: "POST", body: JSON.stringify(payload) });
};

export default sync;
