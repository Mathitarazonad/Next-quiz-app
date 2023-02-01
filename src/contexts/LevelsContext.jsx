"use client"
import { createContext, useReducer, useState} from 'react';
import { initialState, levelReducer} from '@/reducers/levelReducer';
export const LevelsContext = createContext();

export default function LevelsProvider({children}) {
  const [levels, dispatch] = useReducer(levelReducer, initialState);
  const [newLevelUnlocked, setNewLevelUnlocked] = useState(false);

  return (
    <LevelsContext.Provider value={{levels, dispatch, newLevelUnlocked, setNewLevelUnlocked}}>
      {children}
    </LevelsContext.Provider>
  )
}


