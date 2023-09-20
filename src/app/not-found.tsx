import Image from "next/image";
import styles from "../components/dialog/Dialog.module.css";

const NotFound = () => (
  <div className={styles.dialog}>
    <h1>CaromGenie</h1>
    <Image src="carom.svg" alt="logo" width="200" height="200" />
    <h2>404 - You missed!</h2>
  </div>
);

export default NotFound;
