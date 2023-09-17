import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CaromGenie",
  description: "Webapp for carom billiards game management",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={`${inter.className}, ${styles.layout}`}>{children}</body>
  </html>
);

export default RootLayout;
