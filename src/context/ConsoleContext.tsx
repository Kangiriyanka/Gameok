import React, { createContext, useContext, useState } from 'react';

type ConsoleGame = {
  id: number;
  series: string;
  year: string;
  title: string;
  cover_photo: string;
};

type ConsoleContextType = {
  selectedID: number;
  setSelectedID: (id: number) => void;
  consoleGamesMap: Record<number, ConsoleGame[]>;
  setConsoleGamesMap: React.Dispatch<React.SetStateAction<Record<number, ConsoleGame[]>>>;
  showGamesMap: Record<number, boolean>;
  setShowGamesMap: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
};

const ConsoleContext = createContext<ConsoleContextType | undefined>(undefined);

export function useConsoleContext() {
  const context = useContext(ConsoleContext);
  if (!context) {
    throw new Error('useConsoleContext must be used within a ConsoleProvider');
  }
  return context;
}



export const ConsoleProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedID, setSelectedID] = useState(-1);
  const [consoleGamesMap, setConsoleGamesMap] = useState<Record<number, ConsoleGame[]>>({});
  const [showGamesMap, setShowGamesMap] = useState<Record<number, boolean>>({});

  return (
    <ConsoleContext.Provider
      value={{ selectedID, setSelectedID, consoleGamesMap, setConsoleGamesMap, showGamesMap, setShowGamesMap }}
    >
      {children}
    </ConsoleContext.Provider>
  );
};