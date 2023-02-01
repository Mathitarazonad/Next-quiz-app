'use client'
import { useWord } from "@/hooks/useWord";
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
    <>
    <div className='single-word-container' style={{display: 'flex', gap: 5}}>
      {!levels[level-1].completedDifficulties.includes(difficulty) ? word.split('').map((character, index) => 
        <input minLength={1} maxLength={1} 
          disabled={completed ? true : false}
          key={`${word}-${character}-${index}`} 
          ref={inputs[index]}
          style={{width: 50, height:50}} //Temporal styles
          value={characters[index]} 
          onChange={(e) => handleChange(e, index)}
          onKeyUp={(e) => handleKey(e, index)}
          className={charClues[index] === 1 ? 'single-input none' 
          : charClues[index] === 2 ? 'single-input in-word' 
          : charClues[index] === 3 ? 'single-input correct' 
          : 'single-input'}/>
      ) : 
      word.split('').map((chr, index) => 
      <p className='single-input correct' style={{width: 50, height:50}} key={`${word}-${chr}-${index}`}>{chr}</p>)}
      {error && <WordError />}
    </div>
    <style jsx>{`
      .single-input.none {
        background-color: gray;
      }
      .single-input.in-word {
        background-color: yellow;
      }
      .single-input.correct {
        background-color: green;
      }
        `}</style>
    </>
  )
}
