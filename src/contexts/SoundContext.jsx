'use client'
import { createContext, useContext, useState } from 'react'

const SoundContext = createContext()
export const useSound = () => useContext(SoundContext)

export default function SoundProvider({ children }) {
  const [soundActive, setSoundActive] = useState(true)

  return (
    <SoundContext.Provider value={{ soundActive, setSoundActive }}>
      {children}
    </SoundContext.Provider>
  )
}
