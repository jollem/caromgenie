"use client";

import GameContextProvider from "../store/GameContext";
import Dialog from "../components/dialog";
import NavBar from "../components/navbar";
import ScoreBoard from "../components/scoreboard";
import ShotClock from "../components/shotclock";

const Page = () => (
  <GameContextProvider>
    <Dialog />
    <NavBar />
    <ScoreBoard />
    <ShotClock />
  </GameContextProvider>
);

export default Page;
