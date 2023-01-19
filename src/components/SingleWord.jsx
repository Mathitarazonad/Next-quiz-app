'use client'
import { checkCharacters } from "@/functions/wordFunctions";
import { useState } from "react";
import WordError from "./WordError";

const checkIfWordExists = async (word) => {
  const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  const response = await fetch(apiURL);
  if (response.ok) {
    return response.json()
  } else if (response.status === 404) {
    return false;
  }
}

export default function SingleWord({word}) {
  const [letters, setLetters] = useState(Array(word.length).fill(''));
  const [completed, setCompleted] = useState(false);
  const [charClues, setCharClues] = useState(Array(word.length).fill(0));
  const [error, setError] = useState(false);

  const handleChange = async (e, index) => {
    const letter = e.target.value;
    const newLetters = letters;
    newLetters[index] = index === 0 ? letter.toUpperCase() : letter.toLowerCase();
    setLetters([...newLetters]);

    //If user guess a word
    if (!letters.some(l => l === '') && letters.join('') === word) {
      setCompleted(true);
      setCharClues(Array(word.length).fill(3));

    } else if (!letters.some(l => l === '')){
      const response = await checkIfWordExists(letters.join(''))
        if (response) {
          //Only gives clues when the word that user wrote exists
          setCharClues(checkCharacters(word, letters));
        } else {
          setError(true);
        }

    } else {
      setCharClues(Array(word.length).fill(0));
      setError(false);
    }
  }

  return (
    <>
    <div className='single-word-container' style={{display: 'flex', gap: 5}}>
      {word.split('').map((letter, index) => 
        <input minLength={1} maxLength={1} disabled={completed ? true : false}
          name={`input-${index}`} key={`${letter}${index}`}
          style={{width: 50, height:50}} value={letters[index]} onChange={(e) => handleChange(e, index)}
          className={charClues[index] === 1 ? 'single-input none' 
          : charClues[index] === 2 ? 'single-input in-word' 
          : charClues[index] === 3 ? 'single-input correct' 
          : 'single-input'}/>
      )}
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
