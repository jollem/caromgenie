"use client";

import { useState, useEffect, useContext, KeyboardEvent, useRef } from "react";
import clsx from "clsx";
import { FaSun, FaMoon, FaWater, FaLeaf } from "react-icons/fa";
import GameContextProvider, { GameContext } from "../store/GameContext";
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

  const Game: React.FC = () => {
    const state = useContext(GameContext);
    const ref = useRef<HTMLDivElement>(null);
    const [formState, setFromState] = useState<string[]>(["", "", ""]);

    useEffect(() => {
      state.players.length && ref.current && ref.current.focus();
    }, [state.players]);

    const keyBindings: Record<string, (() => void) | undefined> = {
      " ": state.started ? state.increment : state.swapPlayers,
      "+": state.started ? state.increment : undefined,
      "-": state.started ? state.decrement : undefined,
      p: state.started ? state.pauseToggle : undefined,
      Enter: state.setNextActive,
      Escape: state.reset,
      Shift: state.extension,
      Backspace: state.revert,
    };

    return (
      <div
        className={clsx(getThemeClasses())}
        tabIndex={-1}
        onKeyDown={(e: KeyboardEvent) => {
          state.players.length && keyBindings[e.key]?.();
        }}
        ref={ref}
      >
        {[
          !state.players.length && (
            <Dialog
              resetScoreBoard={() => setShowStats(false)}
              formState={formState}
              setFormState={setFromState}
              key="dialog"
            >
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
          ),
          state.players.length && (
            <NavBar
              stats={showStats}
              setShowStats={setShowStats}
              key="navbar"
            />
          ),
          state.players.length && showStats && <Statistics key="stats" />,
          state.players.length && !showStats && <ScoreBoard key="score" />,
          state.players.length && state.config.shotclock && (
            <ShotClock key="shotclock" />
          ),
        ].filter(Boolean)}
      </div>
    );
  };

  return (
    <GameContextProvider>
      <Game />
    </GameContextProvider>
  );
};

export default Page;
