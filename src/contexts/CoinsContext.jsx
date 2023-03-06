'use client'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

export const CoinsContext = createContext()
export const useCoins = () => useContext(CoinsContext)

export default function CoinsProvider ({ children }) {
  const [coins, setCoins] = useState(0)
  const [coinsToAdd, setCoinsToAdd] = useState(0) // State for animation when coins are added
  const [coinsObtained, setCoinsObtained] = useState(0) // State to control the coins gained and rest them if user leaves the level
  const path = usePathname()

  const value = {
    coins, setCoins,
    coinsToAdd, setCoinsToAdd,
    coinsObtained, setCoinsObtained
  }

  useEffect(() => {
    if (coinsToAdd !== 0) {
      const timer = setInterval(() => {
        setCoins(coins + 1)
        setCoinsToAdd(coinsToAdd - 1)
        new Audio('/sounds/coinGain.wav').play()
      }, 300)
      return () => clearInterval(timer)
    }
  }, [coinsToAdd, coins])

  useEffect(() => {
    // If user leaves a level without completing it, then rest the coins that gained in that level
    if (coinsObtained > 0) {
      setCoins(prevState => prevState - coinsObtained)
      setCoinsObtained(0)
    }
  }, [path])

  return (
    <CoinsContext.Provider value={value}>
      {children}
    </CoinsContext.Provider>
  )
}
