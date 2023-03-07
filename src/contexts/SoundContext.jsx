'use client'
import { createContext, useContext, useState } from 'react'

const SoundContext = createContext()
export const useSound = () => useContext(SoundContext)

export default function SoundProvider({ children }) {
  const [soundActive, setSoundActive] = useState(true)

  const coinGainSound = () => soundActive && new Audio('/sounds/coinGain.wav').play()
  const starCollectionSound = () => soundActive && new Audio('/sounds/starCollection.wav').play()

  return (
    <SoundContext.Provider value={{ soundActive, setSoundActive, coinGainSound, starCollectionSound }}>
      {children}
    </SoundContext.Provider>
  )
}
