import ResetButton from "./ResetButton";
import PauseButton from "./PauseButton";
import SwapButton from "./SwapButton";
import StatsButton from "./StatsButton";
import styles from "./NavBar.module.scss";

const NavBar = ({ statsToggle }: { statsToggle: () => void }) => (
  <nav className={styles.navbar}>
    <ResetButton />
    <SwapButton />
    <StatsButton statsToggle={statsToggle} />
    <PauseButton />
  </nav>
);

export default NavBar;
