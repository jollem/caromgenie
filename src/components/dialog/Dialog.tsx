import { useState, useEffect, useContext } from "react";
import { parse, string, array } from "valibot";
import {
  FaCog,
  FaFlagCheckered,
  FaCircle,
  FaCheck,
  FaCrosshairs,
  FaRegHourglass,
  FaStopwatch,
  FaHourglassStart,
} from "react-icons/fa";
import { GameContext, type Config } from "../../store/GameContext";
import styles from "./Dialog.module.scss";
import CacheKeys from "@/store/localStorage";

type ConfMeta = {
  field: keyof Config;
  label: React.ReactNode;
  min: number;
  max: number;
};

const meta: ConfMeta[] = [
  {
    field: "innings",
    label: <FaCircle />,
    min: 10,
    max: 99,
  },
  {
    field: "caroms",
    label: <FaCrosshairs />,
    min: 10,
    max: 99,
  },
  {
    field: "shotclock",
    label: <FaRegHourglass />,
    min: 20,
    max: 90,
  },
  {
    field: "extensions",
    label: <FaStopwatch />,
    min: 0,
    max: 10,
  },
  {
    field: "extension",
    label: <FaHourglassStart />,
    min: 20,
    max: 90,
  },
];

type ThemeSwitch = {
  resetScoreBoard: () => void;
  children: React.ReactNode;
};

const Dialog: React.FC<ThemeSwitch> = ({ resetScoreBoard, children }) => {
  const gameState = useContext(GameContext);
  const [config, setConfig] = useState(false);
  const [formState, setFromState] = useState<string[]>(["", "", ""]);
  const [configState, setConfigState] = useState<Config>(gameState.config);
  const [prefill, setPrefill] = useState<string[]>([]);

  useEffect(() => setConfigState(gameState.config), [gameState.config]);

  useEffect(
    () =>
      setPrefill(
        parse(
          array(string()),
          JSON.parse(localStorage.getItem(CacheKeys.PREFILL) || "[]")
        )
      ),
    []
  );

  const storePlayerNames = () =>
    setPrefill((prev) => {
      const uniq = Array.from(new Set([...prev, ...formState]))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b));
      localStorage.setItem(CacheKeys.PREFILL, JSON.stringify(uniq));
      return uniq;
    });

  if (gameState.players.length) {
    return null;
  }

  return (
    <div className={styles.dialog}>
      <details>
        <summary>
          <h1>CaromGenie</h1>
        </summary>
        <p>
          CaromGenie is completely free simple webapplication for carom
          billiards game management. Full source code available @{" "}
          <a href="https://github.com/jollem/caromgenie" target="_new">
            GitHub
          </a>
          .
        </p>
      </details>
      {config ? (
        <>
          {children}
          {meta.map((conf) => (
            <div key={conf.field} className={styles.slider}>
              <label htmlFor={conf.field}>{conf.label}</label>
              <input
                id={conf.field}
                type="range"
                value={configState[conf.field]}
                min={conf.min}
                max={conf.max}
                onChange={(e) =>
                  setConfigState((prev) => ({
                    ...prev,
                    [conf.field]: parseInt(e.target.value),
                  }))
                }
              />
              <span>{configState[conf.field]}</span>
            </div>
          ))}

          <button
            onClick={() => {
              gameState.configure?.(configState);
              setConfig(false);
            }}
          >
            <FaCheck />
          </button>
        </>
      ) : (
        <>
          {["⚪️", "🟡", "🔴"].map((placeholder, index) => (
            <input
              list="prefill"
              type="text"
              value={formState[index]}
              disabled={formState.filter(Boolean).length < index}
              key={placeholder}
              placeholder={placeholder}
              onChange={(e) =>
                setFromState((prev) => {
                  const copy = [...prev];
                  copy[index] = e.target.value;
                  return copy;
                })
              }
            />
          ))}
          <datalist id="prefill">
            {prefill.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>

          <button
            disabled={formState.filter(Boolean).length < 2}
            onClick={() => {
              resetScoreBoard();
              storePlayerNames();
              gameState.start?.(formState);
            }}
          >
            <FaFlagCheckered />
          </button>
          <button onClick={() => setConfig(true)} className={styles.settings}>
            <FaCog />
          </button>
        </>
      )}
    </div>
  );
};

export default Dialog;
