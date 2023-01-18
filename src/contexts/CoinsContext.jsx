"use client"
import { createContext, useState } from 'react';

export const CoinsContext = createContext();

export default function CoinsProvider({children}) {
  const [coins, setCoins] = useState(0);

  return (
    <CoinsContext.Provider value={{coins, setCoins}}>
      {children}
    </CoinsContext.Provider>
  )
}
