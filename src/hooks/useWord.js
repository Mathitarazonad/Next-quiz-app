import { useState, useContext, useRef, useEffect } from "react";
import { LevelsContext } from "@/contexts/LevelsContext";
import types from "@/reducers/types";
import { checkCharacters } from "@/functions/wordFunctions";
import { WordsContext } from "@/contexts/WordsContext";

const checkIfWordExists = async (word) => { 
  const url = `/api/dictionary?word=${word}`
  const data = await fetch(url).then(data => data.json());
  return data;
}

export const useWord = ({word, level, difficulty}) => {
  const [characters, setCharacters] = useState(Array(word.length).fill(''));
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(false);
  //State for the clues giving
  const [charClues, setCharClues] = useState(Array(word.length).fill(0));
  //State for input change with they unique references
  const inputRefs = useRef([]);
  //Helper state to change the focus
  const [charsForFocusChange, setCharsForFocusChange] = useState(Array(word.length).fill(''));
  //Contexts
  const {completedWords, setCompletedWords} = useContext(WordsContext);
  const {levels, dispatch, setNewLevelUnlocked} = useContext(LevelsContext);

  const updateInput = (e, index) => {
    const character = e.target.value;
    const newCharacters = [...characters];
    newCharacters[index] = index === 0 ? character.toUpperCase() : character.toLowerCase();
    setCharacters([...newCharacters]);
  } //Input value management
   
  const manageFocus = (e, index) =>{
      const keyCode = e.keyCode;
      //Only if character is a Unicode letter
      if ((keyCode >= 65 && keyCode <= 90) || (keyCode === 8)){
        const keyCharacter = e.key.toLowerCase();
        const newArr = [...charsForFocusChange];
        const searchEmptyInput = (inputs, currentIndex) => inputs.some(input => input === '') ? inputs.indexOf('', currentIndex) : currentIndex;
    
        //If user deletes a character at some input that is not the first, delete it and 
        if (keyCode === 8 && index !== 0) {
          inputRefs.current[index - 1].focus();
          newArr[index] = '';
          setCharsForFocusChange(newArr);
    
          //If user is at the first input and want to delete something, don't change the focus
        } else if (keyCode === 8 && index === 0) {
          newArr[index] = '';
          setCharsForFocusChange(newArr);
    
          //If the space is available, use the character and jump to the next available space
        } else if (keyCode !== 8 && index !== characters.length-1 && charsForFocusChange[index] === ''){
          inputRefs.current[searchEmptyInput(characters, index)].focus();
          newArr[index] = index === 0 ? keyCharacter.toUpperCase() : keyCharacter;
          setCharsForFocusChange(newArr);
          setCharacters(newArr);
          //When user writes in an input that already have a character, change the next available space for that character and jump to the first available space.
        } else if (keyCode !== 8 && index !== characters.length-1 && charsForFocusChange[index] !== '') {
          newArr[searchEmptyInput(characters, index)] = keyCharacter;
          setCharsForFocusChange(newArr);
          setCharacters(newArr);
          inputRefs.current[searchEmptyInput(characters, index)].focus();
        }
      }
  } //Input focus change management

  const checkForClues = async () => {
    //If user guess the word
    if (!characters.some(l => l === '') && characters.join('') === word) {
      setCompleted(true);
      setCharClues(Array(word.length).fill(3));
      setCompletedWords(prevState => prevState + 1);
      if(completedWords === 4) {
        completeDifficulty();
      }
    } else if (!characters.some(l => l === '')){
      //Only gives clues when the word that user wrote exists
      const response = await checkIfWordExists(characters.join(''))
        if (response) {
          setCharClues(checkCharacters(word.toLowerCase(), characters));
        } else {
          setError(true);
        }
  
    } else {
      setCharClues(Array(word.length).fill(0));
      setError(false);
    }
  } //Type of clues giving management

  const completeDifficulty = () => {
    dispatch({
      type: types.completeDifficulty,
      payload: {level, difficulty}
    })
  }

  const completeLevel = () => {
    dispatch({
      type: types.completeLevel,
      payload : {level, difficulty}
    });
  }

  const unlockLevel = () => {
    dispatch({
      type: types.unlockLevel,
      payload : {level, difficulty}
    });
    setNewLevelUnlocked(true);
  }

  useEffect(() => {
    checkForClues();
  }, [characters])

  useEffect(() => {
    if (levels[level-1].completedDifficulties.length === 3) {
      completeLevel();
    }
  }, [levels[level-1].completedDifficulties])
  
  useEffect(() => {
    if (levels[level-1].isCompleted && !levels[level].isUnlocked) {
      unlockLevel();
    }
  }, [levels[level-1].isCompleted])
    
  return {
    characters,
    completed,
    charClues,
    error,
    inputRefs,
    updateInput,
    manageFocus,
    levels
  }
}