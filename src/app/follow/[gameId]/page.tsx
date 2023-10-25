"use client";

import { useParams } from "next/navigation";
import ObserverContext from "@/store/ObserverContext";
import Foo from "./components/Foo";

const Page = () => {
  const { gameId } = useParams();
  return (
    <ObserverContext gameId={String(gameId)}>
      <Foo />
    </ObserverContext>
  );
};

export default Page;
