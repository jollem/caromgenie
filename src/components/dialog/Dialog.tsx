import { useState, useContext, Fragment } from "react";
import Image from "next/image";
import { FaCog } from "react-icons/fa";
import { GameContext, type Config } from "../../store/GameContext";
import styles from "./Dialog.module.css";

type ConfMeta = {
  field: keyof Config;
  label: string;
  min: number;
  max: number;
};

const meta: ConfMeta[] = [
  {
    field: "innings",
    label: "Innings",
    min: 1,
    max: 99,
  },
  {
    field: "shotclock",
    label: "Shotclock duration",
    min: 1,
    max: 99,
  },
  {
    field: "extensions",
    label: "Extensions",
    min: 0,
    max: 10,
  },
  {
    field: "extension",
    label: "Extension length",
    min: 1,
    max: 99,
  },
];

const Dialog = () => {
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
      <Image src="carom.svg" alt="logo" width="200" height="200" />
      {config ? (
        <>
          {meta.map((conf) => (
            <Fragment key={conf.field}>
              <label htmlFor={conf.field}>
                {conf.label} ({configState[conf.field]}):
              </label>
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
            </Fragment>
          ))}
          <button
            onClick={() => {
              gameState.configure?.(configState);
              setConfig(false);
            }}
          >
            Apply
          </button>
        </>
      ) : (
        <>
          {["Player 1", "Player 2", "Player 3 (Optional)"].map(
            (placeholder, index) => (
              <input
                value={formState[index]}
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
            )
          )}
          <button
            disabled={formState.filter(Boolean).length < 2}
            onClick={() => gameState.start?.(formState)}
          >
            Game On!
          </button>
          <button onClick={() => setConfig(true)}>
            <FaCog />
          </button>
        </>
      )}
    </div>
  );
};

export default Dialog;
