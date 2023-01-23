export function checkCharacters (word, charPositions) {
/*Return an array of each position with its clue: 
  1-Char isn't in the word  
  2-Char is in the word but not in that position  
  3-Char is in the word and is in that position */
  let resultArr = Array(word.length).fill('');
  let chrsUsed = [];

  for (let i = 0; i < word.length; i++) {
    const currentChr = charPositions[i];

    if (word[i] === currentChr){
      resultArr[i] = 3;
      chrsUsed.push(word[i]);

      //Check if there are characters repeated that are more than in the actual word
      if (!isCharacterAvailable(word, chrsUsed, word[i].toLowerCase())) {
        const repeatedIndexs = checkForRepeatedCharacters(word, word[i].toLowerCase(), resultArr, chrsUsed, chrsUsed.filter(chr => chr === word[i].toLowerCase()).length - word.split('').filter(chr => chr === word[i].toLowerCase()).length);

        repeatedIndexs.forEach(i => {
          resultArr[i] = 1;
        })
      }
    } else if (word.toLowerCase().includes(currentChr) && isCharacterAvailable(word, chrsUsed, currentChr)) {
      chrsUsed.push(currentChr);
      resultArr[i] = 2;
    } else {
      chrsUsed.push(currentChr)
      resultArr[i] = 1;
    }
  }
  return resultArr;
}

function checkForRepeatedCharacters(word, chr, arrOfResults, usedCharacters, extraChrs) {
  const arrOfIndexs = [];

  for (let i = 0; i < word.length && extraChrs !== 0; i++) {
    if (usedCharacters[i] === chr && arrOfResults[i] !== 3) {
      extraChrs--;
      arrOfIndexs.push(i);
    }
  }
  return arrOfIndexs;
}

function isCharacterAvailable(word, chrsUsed, chr) {
  return word.toLowerCase().split('').filter(currentChr => currentChr === chr).length > chrsUsed.filter(currentChr => currentChr === chr).length;
}

export function manageFocus(e, characters, charsForInputChange, inputs, index, setCharacters, setCharsForInputChange) {
  const keyCode = e.keyCode;
  //Only if character is a Unicode letter
  if ((keyCode >= 65 && keyCode <= 90) || (keyCode === 8)){
    const keyCharacter = e.key.toLowerCase();
    const newArr = charsForInputChange;

    //If user deletes a character at some input that is not the first, delete it and 
    if (keyCode === 8 && index !== 0) {
      inputs[index - 1].current.focus();
      newArr[index] = '';
      setCharsForInputChange(newArr);

      //If user is at the first input and want to delete something, don't change the focus
    } else if (keyCode === 8 && index === 0) {
      newArr[index] = '';
      setCharsForInputChange(newArr);

      //If the space is available, use the character and jump to the next available space
    } else if (keyCode !== 8 && index !== characters.length-1 && charsForInputChange[index] === ''){
      inputs[searchEmptyInput(characters, index)].current.focus();
      newArr[index] = index === 0 ? keyCharacter.toUpperCase() : keyCharacter;
      setCharsForInputChange(newArr);

      //When user writes in an input that already have a character, change the next available space for that character and jump to the first available space.
    } else if (keyCode !== 8 && index !== characters.length-1 && charsForInputChange[index] !== '') {
      newArr[searchEmptyInput(characters, index)] = keyCharacter;
      setCharsForInputChange(newArr);
      setCharacters([...newArr]);
      inputs[searchEmptyInput(characters, index)].current.focus();
    }
  }
}

function searchEmptyInput (inputs, currentIndex) {
  return inputs.some(input => input === '') ? inputs.indexOf('', currentIndex) : currentIndex;
}