export default function CompletedCharacter({ character, wordLength }) {
  const defaultStyles = 'border-[4px] border-purple-400 border-opacity-90 bg-purple-100 text-purple-400 text-opacity-90 rounded-[10px] text-lg text-center font-bold flex items-center justify-center select-none '

  const inputDefaultStyles = wordLength.length === 6 ? `w-9 h-9 md:w-[42px] md:h-[42px] ${defaultStyles}` : wordLength.length > 6 ? `w-8 h-8 md:w-[42px] md:h-[42px] ${defaultStyles}` : `w-[50px] h-[50px] ${defaultStyles}`

  return (
    <p className={inputDefaultStyles + 'bg-green-100 border-green-700 border-opacity-70 text-green-700 text-opacity-50'}>
      {character}
    </p>
  )
}
