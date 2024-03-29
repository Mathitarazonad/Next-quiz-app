'use client'
import { createContext, useContext, useState } from 'react'

export const CurrentLevelContext = createContext()
export const useCurrentLevel = () => useContext(CurrentLevelContext)

export default function CurrentLevelProvider ({ children }) {
  const [completedWords, setCompletedWords] = useState(Array(5).fill(false))
  const [alertAtLeaving, setAlertAtLeaving] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  // Abilities: 1-Reveal some letters  2-Reveal a random word  3-Reveal the current word
  const [abilityToUse, setAbilityToUse] = useState(0)
  const [usedAbilities, setUsedAbilities] = useState([])
  const [currentWord, setCurrentWord] = useState(null)

  const value = {
    completedWords, setCompletedWords,
    abilityToUse, setAbilityToUse,
    usedAbilities, setUsedAbilities,
    currentWord, setCurrentWord,
    alertAtLeaving, setAlertAtLeaving,
    showAlert, setShowAlert
  }

  return (
    <CurrentLevelContext.Provider value={value}>
      {children}
    </CurrentLevelContext.Provider>
  )
}
