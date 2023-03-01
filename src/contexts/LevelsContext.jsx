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
  const [difficultyPassed, setDifficultyPassed] = useState(false)

  const value = {
    levels, dispatch,
    newLevelUnlocked, setNewLevelUnlocked,
    difficultyPassed, setDifficultyPassed
  }

  return (
    <LevelsContext.Provider value={value}>
      {children}
    </LevelsContext.Provider>
  )
}
