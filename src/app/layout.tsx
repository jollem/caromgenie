import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from "./layout.module.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CaromGenie",
  description: "Free webapp for three cushion carom billiards score keeping",
  keywords: [
    "Carom",
    "Three cushion carom",
    "Points calculator",
    "Score",
    "Management",
    "Scoreboard",
    "Pistelaskuri",
    "Kara",
    "Puhveli",
    "Puh.Veli",
    "Puhveliklubi",
  ],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={`${inter.className}, ${styles.layout}`}>
      <div>{children}</div>
    </body>
  </html>
);

export default RootLayout;
