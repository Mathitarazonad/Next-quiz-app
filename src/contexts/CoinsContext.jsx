'use client'
import { createContext, useContext, useEffect, useState } from 'react'

export const CoinsContext = createContext()
export const useCoins = () => useContext(CoinsContext)

export default function CoinsProvider ({ children }) {
  const [coins, setCoins] = useState(0)
  const [coinsToAdd, setCoinsToAdd] = useState(0)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (coinsToAdd !== 0) {
      setAnimate(true)
      const timer = setInterval(() => {
        setCoins(coins + 1)
        setCoinsToAdd(coinsToAdd - 1)
        new Audio('/sounds/coinGain.wav').play()
      }, 750)

      return () => clearInterval(timer)
    } else {
      setAnimate(false)
    }
  }, [coinsToAdd, coins])

  return (
    <CoinsContext.Provider value={{ coins, setCoins, coinsToAdd, setCoinsToAdd, animate }}>
      {children}
    </CoinsContext.Provider>
  )
}
