import { useContext } from "react";
import { ObserverContext } from "@/store/ObserverContext";

const Foo = () => {
  const state = useContext(ObserverContext);
  return <pre>{JSON.stringify(state, undefined, 4)}</pre>;
};

export default Foo;
