'use client'
import { useWord } from '@/hooks/useWord'
import CharacterInput from './CharacterInput'
import CompletedCharacter from './CompletedCharacter'

export default function SingleWord ({ word, wordIndex, level, difficulty }) {
  const {
    characters,
    completedWords,
    charClues,
    inputRefs,
    manageFocus,
    updateInput,
    levels,
    handleCurrentWord
  } = useWord({ word, wordIndex, level, difficulty })

  const handleChange = (e, index) => {
    updateInput(e, index)
  }

  // Handler to change to the next input or the previous based on character introduced
  const handleKey = (e, index) => {
    manageFocus(e, index)
  }

  return (
    <div className={word.length > 6 ? 'flex gap-2' : 'flex gap-3'}>
      {!levels[level - 1].completedDifficulties.includes(difficulty) && !completedWords[wordIndex]
        ? word
          .split('')
          .map((character, index) => (
            <CharacterInput
              key={`${word}-${word[index]}-${index}`}
              characters={characters}
              index={index}
              wordIndex={wordIndex}
              inputRefs={inputRefs}
              completed={completedWords[wordIndex]}
              charClues={charClues}
              handleCurrentWord={handleCurrentWord}
              handleChange={handleChange}
              handleKey={handleKey}
            />
          ))
        : word.split('').map((chr, index) => (
          <CompletedCharacter key={`${word}-${chr}-${index}`} character={chr} wordLength={word.length} />
        ))}
    </div>
  )
}
