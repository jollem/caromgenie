"use client";

import { useState } from "react";
import classnames from "classnames";
import { FaSun, FaMoon } from "react-icons/fa";
import GameContextProvider from "../store/GameContext";
import Dialog from "../components/dialog";
import NavBar from "../components/navbar";
import ScoreBoard from "../components/scoreboard";
import ShotClock from "../components/shotclock";
import styles from "./page.module.scss";

const Page = () => {
  const [dark, toggleTheme] = useState<boolean>(false);

  const themeSwitch = () => toggleTheme((prev) => !prev);

  return (
    <div
      className={classnames([styles.themeContainer, { [styles.dark]: dark }])}
    >
      <GameContextProvider>
        <Dialog themeSwitch={themeSwitch}>
          {dark ? <FaMoon /> : <FaSun />}
        </Dialog>
        <NavBar />
        <ScoreBoard />
        <ShotClock />
      </GameContextProvider>
    </div>
  );
};

export default Page;
