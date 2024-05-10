import "./globals.scss";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import clsx from "clsx";
import styles from "./layout.module.scss";

const font = Urbanist({ weight: "800", subsets: ["latin"] });

export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
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
    <body className={clsx(font.className, styles.layout)}>
      {children}
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
