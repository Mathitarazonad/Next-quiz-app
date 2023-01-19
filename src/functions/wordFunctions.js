export function checkCharacters (word, charPositions) {
  //Return an array of: 1-Char isn't in the word  2-Char is in the word but not in that position  3-Char is in the word and is in that position
  return charPositions.map((chr, i) => 
    word[i] === chr ? 3 
    : word.includes(chr) ? 2 
    : 1
  )
}