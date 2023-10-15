import type { GameState } from "../../../../store/GameContext";

const sync = (gameId: string | null, state: GameState): void => {
  gameId &&
    fetch(`/api/sync/${gameId}`, {
      method: "POST",
      body: JSON.stringify(state),
    });
};

export default sync;
