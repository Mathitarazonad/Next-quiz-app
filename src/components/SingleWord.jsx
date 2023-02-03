'use client'
import { useWord } from "@/hooks/useWord";
import CharacterInput from "./CharacterInput";
import WordError from "./WordError";

export default function SingleWord({word, level, difficulty}) {
  const {characters, completed, charClues, inputs, error, manageFocus, updateInput, levels} = useWord({word, level, difficulty})

  const handleChange = (e, index) => {
    updateInput(e, index)
  }

  //Handler to change to the next input or the previous based on character introduced
  const handleKey = (e, index) => {
    manageFocus(e,index);
  }

  return (
    <div className='single-word-container' style={{display: 'flex', gap: 5}}>
      {!levels[level-1].completedDifficulties.includes(difficulty) ? word.split('').map((character, index) => 
        <CharacterInput key={`${word}-${word[index]}-${index}`}
        characters={characters} 
        inputRef={inputs[index]}
        index={index}
        completed={completed} 
        charClues={charClues}
        handleChange={handleChange} handleKey={handleKey}/>
      ) : 
      word.split('').map((chr, index) => 
      <p className='single-input correct' style={{width: 50, height:50}} key={`${word}-${chr}-${index}`}>{chr}</p>)}
      {error && <WordError />}
    </div>
  )
}
