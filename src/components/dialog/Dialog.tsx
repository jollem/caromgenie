import { useState, useContext } from "react";
import {
  FaCog,
  FaFlagCheckered,
  FaCheck,
  FaCrosshairs,
  FaRegHourglass,
  FaStopwatch,
  FaHourglassStart,
} from "react-icons/fa";
import { GameContext, type Config } from "../../store/GameContext";
import styles from "./Dialog.module.scss";

type ConfMeta = {
  field: keyof Config;
  label: React.ReactNode;
  min: number;
  max: number;
};

const meta: ConfMeta[] = [
  {
    field: "innings",
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

type DialogProps = {
  themeSwitch: () => void;
  children: React.ReactNode;
};

const Dialog: React.FC<DialogProps> = ({ themeSwitch, children }) => {
  const gameState = useContext(GameContext);
  const [config, setConfig] = useState(false);
  const [formState, setFromState] = useState<string[]>(["", "", ""]);
  const [configState, setConfigState] = useState<Config>(gameState.config);

  if (gameState.players.length) {
    return null;
  }

  return (
    <div className={styles.dialog}>
      <h1>CaromGenie</h1>
      {config ? (
        <>
          <button onClick={themeSwitch}>{children}</button>
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
          <button
            disabled={formState.filter(Boolean).length < 2}
            onClick={() => gameState.start?.(formState)}
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
