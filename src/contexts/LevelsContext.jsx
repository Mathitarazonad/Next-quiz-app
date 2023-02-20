'use client'
import { createContext, useContext, useReducer, useState } from 'react'
import { initialState, levelReducer } from '@/reducers/levelReducer'

export const LevelsContext = createContext()
export function useLevels () {
  return useContext(LevelsContext)
}

export default function LevelsProvider ({ children }) {
  const [levels, dispatch] = useReducer(levelReducer, initialState)
  const [newLevelUnlocked, setNewLevelUnlocked] = useState(false)

  return (
    <LevelsContext.Provider value={{ levels, dispatch, newLevelUnlocked, setNewLevelUnlocked }}>
      {children}
    </LevelsContext.Provider>
  )
}
