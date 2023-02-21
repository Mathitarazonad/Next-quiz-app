'use client'
import { createContext, useContext, useState } from 'react'

export const CoinsContext = createContext()
export const useCoins = () => useContext(CoinsContext)

export default function CoinsProvider ({ children }) {
  const [coins, setCoins] = useState(0)

  return (
    <CoinsContext.Provider value={{ coins, setCoins }}>
      {children}
    </CoinsContext.Provider>
  )
}
