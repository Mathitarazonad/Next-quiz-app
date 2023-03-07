import { useState, useContext, useRef, useEffect } from 'react'
import { useLevels } from '@/contexts/LevelsContext'
import types from '@/reducers/types'
import { checkCharacters } from '@/functions/wordFunctions'
import { WordsContext } from '@/contexts/WordsContext'
import { useCoins } from '@/contexts/CoinsContext'
import { updateUserCoins, updateUserLevels } from '@firebase/firestoreFunctions'
import { useUser } from '@/contexts/UserContext'

const checkIfWordExists = async (word) => {
  const url = `/api/dictionary?word=${word}`
  const data = await fetch(url).then(data => data.json())
  return data
}

export const useWord = ({ word, level, difficulty }) => {
  const [characters, setCharacters] = useState(Array(word.length).fill(''))
  const [completed, setCompleted] = useState(false)
  // State for the clues giving
  const [charClues, setCharClues] = useState(Array(word.length).fill(0))
  // State for input change with they unique references
  const inputRefs = useRef([])
  // Helper state to change the focus
  const [charsForFocusChange, setCharsForFocusChange] = useState(Array(word.length).fill(''))
  // Contexts
  const { completedWords, setCompletedWords } = useContext(WordsContext)
  const { levels, dispatch, setNewLevelUnlocked, setDifficultyPassed } = useLevels()
  const [currentLevel, nextLevel] = [levels[level - 1], levels[level]]
  const { coins, coinsObtained, coinsToAdd, setCoinsToAdd, setCoinsObtained } = useCoins()
  const { currentUser } = useUser()

  const updateInput = (e, index) => {
    const character = e.target.value
    const newCharacters = [...characters]
    newCharacters[index] = index === 0 ? character.toUpperCase() : character.toLowerCase()
    setCharacters(newCharacters)
  } // Input value management

  const manageFocus = (e, index) => {
    const keyCode = e.keyCode

    // Focus change with arrow keys
    if (keyCode === 39) {
      index !== characters.length - 1 ? inputRefs.current[index + 1].focus() : inputRefs.current[0].focus()
    } else if (keyCode === 37) {
      index !== 0 ? inputRefs.current[index - 1].focus() : inputRefs.current[characters.length - 1].focus()
    }

    // Only if character is a Unicode letter
    if ((keyCode >= 65 && keyCode <= 90) || (keyCode === 8)) {
      const keyCharacter = e.key.toLowerCase()
      const newArr = [...characters]
      const searchEmptyInput = (inputs, currentIndex) => inputs.slice(currentIndex).some(input => input === '') ? inputs.indexOf('', currentIndex) : false

      // If user deletes a character at some input that is not the first, delete it and
      if (keyCode === 8 && index !== 0) {
        inputRefs.current[index - 1].focus()
        newArr[index] = ''
        setCharsForFocusChange(newArr)
        setCharacters(newArr)

        // If user is at the first input and want to delete something, don't change the focus
      } else if (keyCode === 8 && index === 0) {
        newArr[index] = ''
        setCharsForFocusChange(newArr)
        setCharacters(newArr)

        // If the space is available and there more available spaces after this, use the character and jump to the next available space
      } else if (keyCode !== 8 && index !== characters.length - 1 && charsForFocusChange[index] === '' && searchEmptyInput(characters, index)) {
        inputRefs.current[searchEmptyInput(characters, index)].focus()
        newArr[index] = index === 0 ? keyCharacter.toUpperCase() : keyCharacter
        setCharsForFocusChange(newArr)
        setCharacters(newArr)

        // When user writes in an input that already have a character, change the next available space with that character and jump to the first available space.
      } else if (keyCode !== 8 && index !== characters.length - 1 && charsForFocusChange[index] !== '' && searchEmptyInput(characters, index)) {
        newArr[searchEmptyInput(characters, index)] = keyCharacter
        if (searchEmptyInput(newArr, index)) { // Double check because it can happen that after the update there is not an empty input to focus on
          inputRefs.current[searchEmptyInput(newArr, index)].focus()
        }
        setCharsForFocusChange(newArr)
        setCharacters(newArr)

        // When it is the last input
      } else if (keyCode !== 8 && index === characters.length - 1 && charsForFocusChange[index] === '') {
        setCharsForFocusChange(newArr)
      }
    }
  } // Input focus change management

  const checkForClues = async () => {
    // If user guess the word
    if (!characters.some(l => l === '') && characters.join('') === word) {
      setCompleted(true)
      setCharClues(characters.map(chr => 3))
      handleCoins()
      handleWords()
    } else if (!characters.some(l => l === '')) {
      inputRefs.current[characters.length - 1].focus()
      // Only gives clues when the word that user wrote exists
      const response = await checkIfWordExists(characters.join(''))
      if (response) {
        setCharClues(checkCharacters(word.toLowerCase(), characters))
      } else {
        setCharClues(characters.map(chr => 4))
      }
    } else {
      setCharClues(characters.map(chr => 0))
    }
  } // Type of clues giving management

  // Level functions
  const completeDifficulty = async () => {
    updateUserCoins(currentUser.displayName, coins + Math.floor(characters.length / 2)) // Update coins in database
    setCoinsObtained(0) // So users don't lose coins when leaving
    dispatch({
      type: types.completeDifficulty,
      payload: { level, difficulty }
    })
    const interval = setInterval(() => {
      if (coinsToAdd === 0) {
        setDifficultyPassed(true)
        clearInterval(interval)
      }
    }, 1000)
  }

  const completeLevel = () => {
    dispatch({
      type: types.completeLevel,
      payload: { level, difficulty }
    })
  }

  const unlockLevel = () => {
    dispatch({
      type: types.unlockLevel,
      payload: { level, difficulty }
    })
    setNewLevelUnlocked(true)
  }

  // Secondary functions
  const handleWords = () => {
    setCompletedWords(prevState => prevState + 1)
    if (completedWords === 4) {
      completeDifficulty()
    }
  }

  const handleCoins = () => {
    const coinsGained = Math.floor(characters.length / 2)
    setCoinsToAdd(prevState => prevState + coinsGained)
    setCoinsObtained(prevState => prevState + coinsGained)
  }

  useEffect(() => {
    checkForClues()
  }, [characters])

  useEffect(() => {
    if (currentLevel.completedDifficulties.length === 3 && !currentLevel.isCompleted && !nextLevel.isUnlocked) {
      completeLevel()
      unlockLevel()
    }
  }, [currentLevel.completedDifficulties])

  useEffect(() => {
    if (currentLevel.isCompleted || currentLevel.completedDifficulties.length > 0) {
      updateUserLevels(currentUser.displayName, levels)
    }
  }, [currentLevel.isCompleted, currentLevel.completedDifficulties])

  return {
    characters,
    completed,
    charClues,
    inputRefs,
    updateInput,
    manageFocus,
    levels
  }
}
