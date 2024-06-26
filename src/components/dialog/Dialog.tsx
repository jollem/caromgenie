import {
  useState,
  useEffect,
  useContext,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import QRCode from "react-qr-code";
import {
  FaCog,
  FaFlagCheckered,
  FaCircle,
  FaCheck,
  FaCrosshairs,
  FaRegHourglass,
  FaStopwatch,
  FaHourglassStart,
  FaShareAlt,
} from "react-icons/fa";
import { GameContext, MIN, MAX, type Config } from "../../store/GameContext";
import styles from "./Dialog.module.scss";

type ConfMeta = {
  field: keyof Config;
  label: React.ReactNode;
  min: number;
  max: number;
  toggle?: boolean;
};

const meta: ConfMeta[] = [
  {
    field: "innings",
    label: <FaCircle />,
    min: 10,
    max: 100,
    toggle: true,
  },
  {
    field: "caroms",
    label: <FaCrosshairs />,
    min: 10,
    max: 100,
    toggle: true,
  },
  {
    field: "shotclock",
    label: <FaRegHourglass />,
    min: 0,
    max: 90,
    toggle: true,
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
  formState: string[];
  setFormState: Dispatch<SetStateAction<string[]>>;
  children: React.ReactNode;
};

const Dialog: React.FC<ThemeSwitch> = ({
  resetScoreBoard,
  children,
  formState,
  setFormState,
}) => {
  const gameState = useContext(GameContext);
  const [config, setConfig] = useState(false);
  const [configState, setConfigState] = useState<Config>(gameState.config);
  const modal = useRef<HTMLDialogElement>(null);
  const [observerUI, setObserverUI] = useState<string>("");

  useEffect(() => setConfigState(gameState.config), [gameState.config]);
  useEffect(
    () => setObserverUI(`${window.location.href}follow/${gameState.gameId}`),
    [gameState.gameId]
  );

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
              <span>
                {conf.toggle &&
                (configState[conf.field] > MAX || configState[conf.field] < MIN)
                  ? "∞"
                  : configState[conf.field]}
              </span>
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
          <button
            className={styles.settings}
            onClick={() => {
              modal.current?.showModal();
              modal.current?.addEventListener("click", (e) => {
                const dialogDimensions = modal.current?.getBoundingClientRect();
                if (
                  dialogDimensions &&
                  (e.clientX < dialogDimensions.left ||
                    e.clientX > dialogDimensions.right ||
                    e.clientY < dialogDimensions.top ||
                    e.clientY > dialogDimensions.bottom)
                ) {
                  modal.current?.close();
                }
              });
            }}
          >
            <FaShareAlt />
          </button>
          <dialog ref={modal} className={styles.modal}>
            <a href={observerUI} target="_blank">
              <QRCode value={observerUI} />
            </a>
          </dialog>
        </>
      ) : (
        <>
          {children}
          {["⚪️", "🟡", "🔴"].map((placeholder, index) => (
            <input
              type="text"
              value={formState[index]}
              disabled={formState.filter(Boolean).length < index}
              key={placeholder}
              placeholder={placeholder}
              onChange={(e) =>
                setFormState((prev) => {
                  const copy = [...prev];
                  copy[index] = e.target.value;
                  return copy;
                })
              }
            />
          ))}

          <button
            disabled={formState.filter(Boolean).length < 2}
            onClick={() => {
              resetScoreBoard();
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
