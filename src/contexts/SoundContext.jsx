'use client'
import { createContext, useContext, useState } from 'react'

const SoundContext = createContext()
export const useSound = () => useContext(SoundContext)

export default function SoundProvider({ children }) {
  const [soundActive, setSoundActive] = useState(true)

  const coinGainSound = () => {
    const coinSound = new Audio('/sounds/coinGain.wav')
    coinSound.volume = 0.2
    if (soundActive) {
      coinSound.play()
    }
  }

  const starCollectionSound = () => {
    const starSound = new Audio('/sounds/starCollection.mp3')
    starSound.volume = 0.5
    if (soundActive) {
      starSound.play()
    }
  }

  return (
    <SoundContext.Provider value={{ soundActive, setSoundActive, coinGainSound, starCollectionSound }}>
      {children}
    </SoundContext.Provider>
  )
}
