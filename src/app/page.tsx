"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { FaSun, FaMoon, FaWater, FaLeaf } from "react-icons/fa";
import GameContextProvider from "../store/GameContext";
import CacheKeys from "../store/localStorage";
import Dialog from "../components/dialog";
import NavBar from "../components/navbar";
import ScoreBoard from "../components/scoreboard";
import ShotClock from "../components/shotclock";
import Statistics from "../components/statistics";
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
  const [theme, setTheme] = useState<ThemeSpec>(themes[0]);
  const [showStats, setShowStats] = useState<boolean>(false);

  useEffect(() => {
    applyTheme(
      themes.find(
        (theme) => theme.name === localStorage.getItem(CacheKeys.THEME)
      ) || themes[0]
    );
  }, []);

  const applyTheme = (theme: ThemeSpec) => {
    localStorage.setItem(CacheKeys.THEME, theme.name);
    setTheme(theme);
  };

  const getThemeClasses = () =>
    themes.reduce(
      (acc, themeSpec) => ({
        ...acc,
        [styles[themeSpec.name]]: themeSpec === theme,
      }),
      { [styles.themeContainer]: true }
    );

  return (
    <div className={clsx(getThemeClasses())}>
      <GameContextProvider>
        <Dialog resetScoreBoard={() => setShowStats(false)}>
          <div className={styles.buttonContainer}>
            {themes.map((themeSpec) => (
              <button
                key={themeSpec.name}
                onClick={() => applyTheme(themeSpec)}
                disabled={themeSpec === theme}
              >
                {themeSpec.icon}
              </button>
            ))}
          </div>
        </Dialog>
        <NavBar
          stats={showStats}
          statsToggle={() => setShowStats((prev) => !prev)}
        />
        {showStats ? <Statistics /> : <ScoreBoard />}
        <ShotClock />
      </GameContextProvider>
    </div>
  );
};

export default Page;
