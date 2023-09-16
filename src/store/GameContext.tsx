import { createContext } from "react";

type GameState = {
  hello: string;
};

export const GameContext = createContext<GameState>({ hello: "" });

const provider = ({ children }: { children: React.ReactNode }) => (
  <GameContext.Provider value={{ hello: "world" }}>
    {children}
  </GameContext.Provider>
);

export default provider;
