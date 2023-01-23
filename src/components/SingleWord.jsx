'use client'
import { checkCharacters, manageFocus } from "@/functions/wordFunctions";
import { useEffect, useRef, useState } from "react";
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
  const [characters, setCharacters] = useState(Array(word.length).fill(''));
  const [completed, setCompleted] = useState(false);
  const [charClues, setCharClues] = useState(Array(word.length).fill(0));
  const [error, setError] = useState(false);
  const inputs = characters.map(input => useRef(null));
  const [charsForInputChange, setCharsForInputChange] = useState(Array(word.length).fill(''));

  const handleChange = async (e, index) => {
    const character = e.target.value;
    const newCharacters = characters;
    newCharacters[index] = index === 0 ? character.toUpperCase() : character.toLowerCase();
    setCharacters([...newCharacters]);
  }

  //Handler to change to the next input or the previous based on character introduced
  const handleKey = (e, index) => {
    manageFocus(e, characters, charsForInputChange, inputs, index, setCharacters, setCharsForInputChange);
  }

  const checkWord = async () => {
    //If user guess the word
    if (!characters.some(l => l === '') && characters.join('') === word) {
      setCompleted(true);
      setCharClues(Array(word.length).fill(3));
    } else if (!characters.some(l => l === '')){
      //Only gives clues when the word that user wrote exists
      const response = await checkIfWordExists(characters.join(''))
        if (response) {
          setCharClues(checkCharacters(word, characters));
        } else {
          setError(true);
        }

    } else {
      setCharClues(Array(word.length).fill(0));
      setError(false);
    }
  }

  useEffect(() => {
      checkWord();
  }, [characters])

  return (
    <>
    <div className='single-word-container' style={{display: 'flex', gap: 5}}>
      {word.split('').map((character, index) => 
        <input minLength={1} maxLength={1} disabled={completed ? true : false}
          name={`input-${index}`} key={`${character}${index}`} ref={inputs[index]}
          style={{width: 50, height:50}} value={characters[index]} onChange={(e) => handleChange(e, index)}
          onKeyUp={(e) => handleKey(e, index)}
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
