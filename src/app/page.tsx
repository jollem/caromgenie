"use client";

import { useState } from "react";
import classnames from "classnames";
import { FaSun, FaMoon, FaWater, FaLeaf } from "react-icons/fa";
import GameContextProvider from "../store/GameContext";
import Dialog from "../components/dialog";
import NavBar from "../components/navbar";
import ScoreBoard from "../components/scoreboard";
import ShotClock from "../components/shotclock";
import styles from "./page.module.scss";

type ThemeSpec = {
  name: string;
  icon: React.ReactNode;
};

const themes: ThemeSpec[] = [
  {
    name: "default",
    icon: <FaSun />,
  },
  {
    name: "nightshift",
    icon: <FaMoon />,
  },
  {
    name: "water",
    icon: <FaWater />,
  },
  {
    name: "green",
    icon: <FaLeaf />,
  },
];

const Page = () => {
  const [theme, toggleTheme] = useState<number>(0);

  const getThemeClasses = () =>
    themes.reduce(
      (acc, themeSpec, index) => ({
        ...acc,
        [styles[themeSpec.name]]: index === theme,
      }),
      { [styles.themeContainer]: true }
    );

  return (
    <div className={classnames(getThemeClasses())}>
      <GameContextProvider>
        <Dialog>
          <button
            onClick={() => toggleTheme((prev) => (prev + 1) % themes.length)}
          >
            {themes[theme].icon}
          </button>
        </Dialog>
        <NavBar />
        <ScoreBoard />
        <ShotClock />
      </GameContextProvider>
    </div>
  );
};

export default Page;
