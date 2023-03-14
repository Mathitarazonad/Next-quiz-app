export default function CharacterInput ({ characters, inputRefs, index, wordIndex, completed, charClues, handleChange, handleKey, handleCurrentWord }) {
  const defaultStyles = 'border-[4px] border-purple-400 border-opacity-90 bg-purple-100 text-purple-400 text-opacity-90 rounded-[10px] text-lg text-center font-bold caret-transparent outline-none duration-150 cursor-pointer hover:border-purple-500 focus:border-purple-500 select-none'

  const inputDefaultStyles = characters.length === 5 ? `w-10 h-10 ${defaultStyles} md:w-[45px] md:h-[45px]`
    : characters.length === 6 ? `w-9 h-9 ${defaultStyles} md:w-[43px] md:h-[43px]`
      : characters.length > 6 ? `w-8 h-8 ${defaultStyles} text-base md:w-[41px] md:h-[41px] md:text-lg`
        : `w-[45px] h-[45px] ${defaultStyles} lg:w-[50px] lg:h-[50px]`

  const incorrectClue = ' bg-red-500 bg-opacity-20 border-red-500 border-opacity-60 text-red-500 text-opacity-60 focus:border-red-500 focus:border-opacity-90 hover:border-red-500 hover:border-opacity-90'

  const inWordClue = ' bg-yellow-100 border-yellow-700 border-opacity-40 text-yellow-700 text-opacity-40 focus:border-yellow-800 focus:border-opacity-50 hover:border-yellow-800 hover:border-opacity-60'

  const correctClue = ' bg-green-100 border-green-700 border-opacity-50 text-green-700 text-opacity-50 hover:border-green-700 hover:border-opacity-50'

  const wordNotExistClue = ' bg-semi-dark-violet bg-opacity-10 border-semi-dark-violet border-opacity-50 text-gray-500 text-opacity-70 focus:border-semi-dark-violet focus:border-opacity-70 hover:border-semi-dark-violet hover:border-opacity-70'

  return (
    <input
      minLength={1} maxLength={1}
      disabled={charClues[index] === 3 || completed}
      ref={(element) => { inputRefs.current[index] = element }}
      value={characters[index]}
      spellCheck='false'
      onChange={(e) => handleChange(e, index)}
      onKeyUp={(e) => handleKey(e, index)}
      onFocus={() => handleCurrentWord(wordIndex)}
      className={charClues[index] === 4 ? inputDefaultStyles + wordNotExistClue
        : charClues[index] === 3 ? inputDefaultStyles + correctClue
          : charClues[index] === 2 ? inputDefaultStyles + inWordClue
            : charClues[index] === 1 ? inputDefaultStyles + incorrectClue
              : inputDefaultStyles}
    />
  )
}
