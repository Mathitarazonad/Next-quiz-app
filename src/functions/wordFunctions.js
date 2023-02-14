export function checkCharacters (word, charPositions) {
/* Return an array of each position with its clue:
  1-Char isn't in the word
  2-Char is in the word but not in that position
  3-Char is in the word and is in that position */
  const resultArr = Array(word.length).fill('')
  const chrsUsed = []

  for (let i = 0; i < word.length; i++) {
    const currentChr = charPositions[i].toLowerCase()

    if (word[i] === currentChr) {
      resultArr[i] = 3
      chrsUsed.push(word[i])

      // Check if there are characters repeated that are more than in the actual word
      if (!isCharacterAvailable(word, chrsUsed, word[i])) {
        const repeatedIndexs = checkForRepeatedCharacters(word, word[i], resultArr, chrsUsed, chrsUsed.filter(chr => chr === word[i]).length - word.split('').filter(chr => chr === word[i]).length)

        repeatedIndexs.forEach(i => {
          resultArr[i] = 1
        })
      }
    } else if (word.includes(currentChr) && isCharacterAvailable(word, chrsUsed, currentChr)) {
      chrsUsed.push(currentChr)
      resultArr[i] = 2
    } else {
      chrsUsed.push(currentChr)
      resultArr[i] = 1
    }
  }
  return resultArr
}

function checkForRepeatedCharacters (word, chr, arrOfResults, usedCharacters, extraChrs) {
  const arrOfIndexs = []

  for (let i = 0; i < word.length && extraChrs !== 0; i++) {
    if (usedCharacters[i] === chr && arrOfResults[i] !== 3) {
      extraChrs--
      arrOfIndexs.push(i)
    }
  }
  return arrOfIndexs
}

function isCharacterAvailable (word, chrsUsed, chr) {
  return word.split('').filter(currentChr => currentChr === chr).length > chrsUsed.filter(currentChr => currentChr === chr).length
}
