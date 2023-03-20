'use client'
import { createContext, useContext, useState } from 'react'

const SoundContext = createContext()
export const useSound = () => useContext(SoundContext)

export default function SoundProvider({ children }) {
  const [soundActive, setSoundActive] = useState(true)

  const coinGainSound = () => {
    const sound = new Audio('/sounds/coinGain.wav')
    sound.volume = 0.2
    if (soundActive) {
      sound.play()
    }
  }

  const starCollectionSound = () => {
    const sound = new Audio('/sounds/starCollection.mp3')
    sound.volume = 0.5
    if (soundActive) {
      sound.play()
    }
  }

  const coinDropSound = () => {
    const sound = new Audio('/sounds/coinDrop.mp3')
    sound.volume = 0.7
    sound.playbackRate = 2
    if (soundActive) {
      sound.play()
    }
  }

  const unableSound = () => {
    const sound = new Audio('/sounds/unable.mp3')
    sound.volume = 0.5
    sound.playbackRate = 1.75
    if (soundActive) {
      sound.play()
    }
  }

  const value = {
    soundActive, setSoundActive,
    coinGainSound, starCollectionSound, coinDropSound, unableSound
  }

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  )
}
