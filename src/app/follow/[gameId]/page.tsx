"use client";

import { useParams } from "next/navigation";
import ObserverContext from "@/store/ObserverContext";
import ScoreBoard from "./components/ScoreBoard";

const Page = () => {
  const { gameId } = useParams();
  return (
    <ObserverContext gameId={String(gameId)}>
      <ScoreBoard />
    </ObserverContext>
  );
};

export default Page;
