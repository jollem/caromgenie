"use client";

import { FaThumbsDown } from "react-icons/fa";
import styles from "../components/dialog/Dialog.module.scss";

const NotFound = () => (
  <div className={styles.dialog} onClick={() => (location.href = "/")}>
    <h1>CaromGenie</h1>
    <FaThumbsDown />
  </div>
);

export default NotFound;
