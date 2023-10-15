import type { GameState } from "../../../../store/GameContext";

const gameId = localStorage.getItem("id");

const sync = (state: GameState): void => {
  fetch(`/api/sync/${gameId}`, {
    method: "POST",
    body: JSON.stringify(state),
  });
};

export default sync;
