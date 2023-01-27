"use client"
import { createContext, useReducer } from 'react';
import { levelReducer, Levels } from '@/reducers/levelReducer';
export const LevelsContext = createContext();

export default function LevelsProvider({children}) {
  const [levels, dispatch] = useReducer(levelReducer, Levels);

  return (
    <LevelsContext.Provider value={{levels, dispatch}}>
      {children}
    </LevelsContext.Provider>
  )
}


