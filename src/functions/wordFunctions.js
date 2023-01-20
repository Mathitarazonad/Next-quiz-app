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
      if (!IsCharacterAvailable(word, chrsUsed, word[i].toLowerCase())) {
        const repeatedIndexs = checkForRepeatedCharacters(word, word[i].toLowerCase(), resultArr, chrsUsed, chrsUsed.filter(chr => chr === word[i].toLowerCase()).length - word.split('').filter(chr => chr === word[i].toLowerCase()).length);

        repeatedIndexs.forEach(i => {
          resultArr[i] = 1;
        })
      }
    } else if (word.toLowerCase().includes(currentChr) && IsCharacterAvailable(word, chrsUsed, currentChr)) {
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

function IsCharacterAvailable(word, chrsUsed, chr) {
  return word.toLowerCase().split('').filter(currentChr => currentChr === chr).length > chrsUsed.filter(currentChr => currentChr === chr).length;
}