'use client'
import { useWord } from '@/hooks/useWord'
import CharacterInput from './CharacterInput'
import CompletedCharacter from './CompletedCharacter'
import WordError from './WordError'

export default function SingleWord ({ word, level, difficulty }) {
  const {
    characters,
    completed,
    charClues,
    inputRefs,
    error,
    manageFocus,
    updateInput,
    levels
  } = useWord({ word, level, difficulty })

  const handleChange = (e, index) => {
    updateInput(e, index)
  }

  // Handler to change to the next input or the previous based on character introduced
  const handleKey = (e, index) => {
    manageFocus(e, index)
  }

  return (
    <div className={word.length > 6 ? 'flex gap-2' : 'flex gap-3'}>
      {!levels[level - 1].completedDifficulties.includes(difficulty)
        ? word
          .split('')
          .map((character, index) => (
            <CharacterInput
              key={`${word}-${word[index]}-${index}`}
              characters={characters}
              index={index}
              inputRefs={inputRefs}
              completed={completed}
              charClues={charClues}
              handleChange={handleChange}
              handleKey={handleKey}
            />
          ))
        : word.split('').map((chr, index) => (
          <CompletedCharacter key={`${word}-${chr}-${index}`} character={chr} wordLength={word.length} />
        ))}
      {error && <WordError />}
    </div>
  )
}
