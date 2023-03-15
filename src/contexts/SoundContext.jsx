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

  const coinDropSound = () => {
    const coinDrop = new Audio('/sounds/coinDrop.mp3')
    coinDrop.volume = 0.7
    coinDrop.playbackRate = 2
    if (soundActive) {
      coinDrop.play()
    }
  }

  const abilityUnableSound = () => {
    const unable = new Audio('/sounds/unable.mp3')
    unable.volume = 0.5
    unable.playbackRate = 1.75
    if (soundActive) {
      unable.play()
    }
  }

  const value = {
    soundActive, setSoundActive,
    coinGainSound, starCollectionSound, coinDropSound, abilityUnableSound
  }

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  )
}
