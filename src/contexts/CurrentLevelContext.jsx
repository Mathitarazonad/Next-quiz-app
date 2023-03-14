'use client'
import { createContext, useContext, useState } from 'react'

export const CurrentLevelContext = createContext()
export const useCurrentLevel = () => useContext(CurrentLevelContext)

export default function CurrentLevelProvider ({ children }) {
  const [completedWords, setCompletedWords] = useState(Array(5).fill(false))
  // 1-Reveal half of the word  2-Reveal a random word  3-Reveal the current word
  const [abilityToUse, setAbilityToUse] = useState(0)
  const [usedAbilities, setUsedAbilities] = useState([])
  const [currentWord, setCurrentWord] = useState(null)

  const value = {
    completedWords, setCompletedWords,
    abilityToUse, setAbilityToUse,
    usedAbilities, setUsedAbilities,
    currentWord, setCurrentWord
  }

  return (
    <CurrentLevelContext.Provider value={value}>
      {children}
    </CurrentLevelContext.Provider>
  )
}
