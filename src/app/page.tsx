"use client";

import GameContextProvider from "../store/GameContext";
import Dialog from "../components/dialog";
import NavBar from "../components/navbar";
import Game from "../components/game";
import ShotClock from "../components/shotclock";

const Page = () => (
  <GameContextProvider>
    <Dialog />
    <NavBar />
    <Game />
    <ShotClock />
  </GameContextProvider>
);

export default Page;
