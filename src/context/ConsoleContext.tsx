import React, { createContext, useContext, useState } from "react";

export type GameConsole = {
  id: number;
  name: string;
  year: number;
};

type ConsoleTools = {
  selectedID: number;
  setSelectedID: (id: number) => void;
  allConsoles: GameConsole[];
  setAllConsoles: (consoles: GameConsole[]) => void;
};

const ConsoleContext = createContext<ConsoleTools | undefined>(undefined);

type Props = {children: React.ReactNode}

export function ConsoleProvider({ children }: Props) {
  const [selectedID, setSelectedID] = useState(-1);
  const [allConsoles, setAllConsoles] = useState<GameConsole[]>([]);

  return (
    <ConsoleContext.Provider
      value={{
        selectedID,
        setSelectedID,
        allConsoles,
        setAllConsoles,
      }}
    >
      {children}
    </ConsoleContext.Provider>
  );
}

export function useConsoleContext() {
  const context = useContext(ConsoleContext);
  if (!context) {
    throw new Error("useConsoleContext must be used within a ConsoleProvider");
  }
  return context;
}