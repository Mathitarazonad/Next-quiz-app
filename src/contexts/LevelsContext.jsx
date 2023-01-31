"use client"
import { createContext, useReducer} from 'react';
import { initialState, levelReducer} from '@/reducers/levelReducer';
export const LevelsContext = createContext();

export default function LevelsProvider({children}) {
  const [levels, dispatch] = useReducer(levelReducer, initialState);

  return (
    <LevelsContext.Provider value={{levels, dispatch}}>
      {children}
    </LevelsContext.Provider>
  )
}


