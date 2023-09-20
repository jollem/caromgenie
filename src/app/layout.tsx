import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CaromGenie",
  description:
    "Free webapp for managing point calculations for three cushion carom billiards",
  keywords: [
    "Carom",
    "Three cushion carom",
    "Points calculator",
    "Pistelaskuri",
    "Kara",
    "Puhveli",
    "Puh.Veli",
    "Puhveliklubi",
  ],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={`${inter.className}, ${styles.layout}`}>{children}</body>
  </html>
);

export default RootLayout;
