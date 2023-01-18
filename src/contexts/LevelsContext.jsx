import { createContext, useState } from 'react';

export const LevelsContext = createContext();

export default function LevelsProvider({children}) {
  const [levelsPassed, setLevelsPassed] = useState([]);
  const [difficultiesCompleted, setDifficultiesCompleted] = useState([]);

  return (
    <LevelsContext.Provider value={{
      levelsPassed, 
      setLevelsPassed, 
      difficultiesCompleted,
      setDifficultiesCompleted
    }}>
      {children}
    </LevelsContext.Provider>
  )
}


