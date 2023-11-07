import ResetButton from "./ResetButton";
import PauseButton from "./PauseButton";
import SwapButton from "./SwapButton";
import StatsButton from "./StatsButton";
import styles from "./NavBar.module.scss";
import RevertButton from "./RevertButton";

const NavBar = ({
  stats,
  statsToggle,
}: {
  stats: boolean;
  statsToggle: () => void;
}) => (
  <nav className={styles.navbar}>
    <ResetButton />
    <SwapButton />
    <RevertButton />
    <StatsButton stats={stats} statsToggle={statsToggle} />
    <PauseButton />
  </nav>
);

export default NavBar;
