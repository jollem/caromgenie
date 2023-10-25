import { createContext, useState, useEffect } from "react";
import Pusher from "pusher-js";
import {
  pusherChannel,
  type GameState,
  PUSHER_EVENT,
  initialValues,
} from "./GameContext";

export const ObserverContext = createContext<GameState>({ ...initialValues });

type ProviderProps = {
  gameId: string;
  children?: React.ReactNode;
};

const Provider: React.FC<ProviderProps> = ({ gameId, children }) => {
  const [state, setState] = useState<GameState>({ ...initialValues });

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_pusher_key || "", {
      cluster: process.env.NEXT_PUBLIC_pusher_cluster || "",
    });
    pusher
      .subscribe(pusherChannel(gameId))
      .bind(PUSHER_EVENT, (sync: GameState) => {
        setState(sync);
      });

    return () => pusher.disconnect();
  }, [gameId, setState]);

  return (
    <ObserverContext.Provider value={state}>
      {children}
    </ObserverContext.Provider>
  );
};

export default Provider;
