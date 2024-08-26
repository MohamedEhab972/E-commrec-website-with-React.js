import { createContext, useState } from "react";

export let ConterContext = createContext();

export default function ConterContextProvider(props) {
  const [counter, setcounter] = useState(0);

  function ChangeCounter() {
    setcounter(Math.round(Math.random() * 100));
  }

  return (
    <ConterContext.Provider value={{ counter, ChangeCounter }}>
      {props.children}
    </ConterContext.Provider>
  );
}
