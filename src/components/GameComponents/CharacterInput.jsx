export default function CharacterInput ({ characters, inputRefs, index, completed, charClues, handleChange, handleKey }) {
  const defaultStyles = 'border-[4px] border-purple-400 border-opacity-90 bg-purple-100 text-purple-400 text-opacity-90 rounded-[10px] text-lg text-center font-bold caret-transparent outline-none duration-150 cursor-pointer hover:border-purple-500 focus:border-purple-500 select-none'
  const inputDefaultStyles = characters.length === 6 ? `w-9 h-9 md:w-[42px] md:h-[42px] ${defaultStyles}` : characters.length > 6 ? `w-8 h-8 md:w-[42px] md:h-[42px] ${defaultStyles}` : `w-[50px] h-[50px] ${defaultStyles}`

  const incorrectClue = ' bg-red-500 bg-opacity-20 border-red-500 border-opacity-60 text-red-500 text-opacity-60 focus:border-red-500 focus:border-opacity-80 hover:border-red-500 hover:border-opacity-90'

  const inWordClue = ' bg-yellow-100 border-yellow-700 border-opacity-40 text-yellow-700 text-opacity-40 focus:border-yellow-800 focus:border-opacity-50 hover:border-yellow-800 hover:border-opacity-60'

  const correctClue = ' bg-green-100 border-green-700 border-opacity-50 text-green-700 text-opacity-50 focus:border-green-700 focus:border-opacity-70 hover:border-green-700 hover:border-opacity-70'

  return (
    <input
      minLength={1} maxLength={1}
      disabled={!!completed}
      ref={(element) => { inputRefs.current[index] = element }}
      value={characters[index]}
      spellCheck='false'
      onChange={(e) => handleChange(e, index)}
      onKeyUp={(e) => handleKey(e, index)}
      className={charClues[index] === 3
        ? inputDefaultStyles + correctClue
        : charClues[index] === 2
          ? inputDefaultStyles + inWordClue
          : charClues[index] === 1
            ? inputDefaultStyles + incorrectClue
            : inputDefaultStyles}
    />
  )
}
