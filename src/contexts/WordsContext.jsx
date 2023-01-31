import { createContext, useState } from "react";

export const WordsContext = createContext();

export default function WordsProvider({children}) {
  const [completedWords, setCompletedWords] = useState(0);

  return (
    <WordsContext.Provider value={{completedWords, setCompletedWords}}>
      {children}
    </WordsContext.Provider>
  )
}