'use client'
import { createContext, useState } from 'react'

export const WordsContext = createContext()

export default function WordsProvider ({ children }) {
  const [completedWords, setCompletedWords] = useState(Array(5).fill(false))

  return (
    <WordsContext.Provider value={{ completedWords, setCompletedWords }}>
      {children}
    </WordsContext.Provider>
  )
}
