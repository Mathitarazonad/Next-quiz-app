import { useState, useRef, useEffect } from 'react'
import levelsData from '@/data/levels'
import types from '@/reducers/types'
import { updateUserCoins, updateUserLevels } from '@firebase/firestoreFunctions'
import { checkCharacters } from '@/functions/wordFunctions'
import { useLevels } from '@/contexts/LevelsContext'
import { useCurrentLevel } from '@/contexts/CurrentLevelContext'
import { useCoins } from '@/contexts/CoinsContext'
import { useUser } from '@/contexts/UserContext'

const checkIfWordExists = async (word) => {
  const url = `/api/dictionary?word=${word}`
  const data = await fetch(url).then(data => data.json())
  return data
}

export const useWord = ({ word, wordIndex, level, difficulty }) => {
  const [characters, setCharacters] = useState(Array(word.length).fill(''))
  // State for the clues giving
  const [charClues, setCharClues] = useState(Array(word.length).fill(0))
  // State for input change with they unique references
  const inputRefs = useRef([])
  // Helper state to change the focus
  const [charsForFocusChange, setCharsForFocusChange] = useState(Array(word.length).fill(''))
  // Contexts
  const { completedWords, setCompletedWords, abilityToUse, setAbilityToUse, currentWord, setCurrentWord } = useCurrentLevel()
  const { levels, dispatch, setDifficultyPassed } = useLevels()
  const [currentLevel, nextLevel] = [levels[level - 1], levels[level]]
  const { coins, coinsToAdd, setCoinsToAdd, setCoinsObtained } = useCoins()
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

  // ===============Level functions===============
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
  }

  // ===============Secondary functions===============
  const handleWords = () => {
    const newCompletedWords = [...completedWords]
    const currentDifficulty = difficulty === 1 ? 'easy' : difficulty === 2 ? 'medium' : 'hard'
    const wordIndex = levelsData[level - 1][currentDifficulty].indexOf(word)
    newCompletedWords[wordIndex] = true
    setCompletedWords(newCompletedWords)

    if (completedWords.filter(wordCompleted => wordCompleted).length === 4 && !currentLevel.completedDifficulties.includes(difficulty)) {
      completeDifficulty()
    }
  }

  const handleCoins = () => {
    const coinsGained = Math.floor(characters.length / 2)
    setCoinsToAdd(prevState => prevState + coinsGained)
    setCoinsObtained(prevState => prevState + coinsGained)
  }

  const handleCurrentWord = (wordIndex) => {
    if (wordIndex !== currentWord) {
      setCurrentWord(wordIndex)
    }
  }

  // ===============Abilities Functions===============
  const handleFirstAbility = () => {
    const randomCharactersIndex = []
    while (randomCharactersIndex.length !== Math.floor(word.length / 2)) {
      const randomIndex = Math.round(Math.random() * (word.length - 1))
      if (!randomCharactersIndex.includes(randomIndex) && characters[randomIndex] === '') {
        randomCharactersIndex.push(randomIndex)
      }
    }
    const newCharacters = characters.map((chr, index) => {
      if (randomCharactersIndex.includes(index)) {
        return word[index]
      } else {
        return chr
      }
    })
    setCharacters(newCharacters)
  }

  const handleSecondAbility = () => {
    const incompletedWords = completedWords.map((word, i) => i)
      .filter((word, i) => !completedWords[i])
    const randomWord = incompletedWords[Math.round(Math.random() * (incompletedWords.length - 1))]
    const newCompletedWords = [...completedWords]
    newCompletedWords[randomWord] = true
    setCompletedWords(newCompletedWords)
    setAbilityToUse(null)

    if (completedWords.filter(wordCompleted => wordCompleted).length === 4 && !currentLevel.completedDifficulties.includes(difficulty)) {
      completeDifficulty()
    }
  }

  const handleThirdAbility = () => {
    const newCompletedWords = [...completedWords]
    newCompletedWords[wordIndex] = true
    setCompletedWords(newCompletedWords)

    if (completedWords.filter(wordCompleted => wordCompleted).length === 4 && !currentLevel.completedDifficulties.includes(difficulty)) {
      completeDifficulty()
    }
  }

  useEffect(() => {
    checkForClues()
  }, [characters])

  useEffect(() => {
    if (abilityToUse === 1 && currentWord === wordIndex) {
      handleFirstAbility()
    }
    if (abilityToUse === 2) {
      handleSecondAbility()
    }
    if (abilityToUse === 3) {
      handleThirdAbility()
    }
  }, [abilityToUse])

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
    completedWords,
    charClues,
    inputRefs,
    updateInput,
    manageFocus,
    levels,
    handleFirstAbility,
    handleSecondAbility,
    handleThirdAbility,
    handleCurrentWord
  }
}
