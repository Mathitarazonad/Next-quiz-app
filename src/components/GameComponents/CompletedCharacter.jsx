export default function CompletedCharacter({ character, wordLength }) {
  const defaultStyles = 'border-[4px] border-purple-400 border-opacity-90 bg-purple-100 text-purple-400 text-opacity-90 rounded-[10px] text-lg text-center font-bold flex items-center justify-center select-none'

  const inputDefaultStyles = wordLength === 5 ? `w-10 h-10 ${defaultStyles} md:w-[45px] md:h-[45px]`
    : wordLength === 6 ? `w-9 h-9 ${defaultStyles} md:w-[43px] md:h-[43px]`
      : wordLength > 6 ? `w-8 h-8 ${defaultStyles} md:w-[41px] md:h-[41px]`
        : `w-[50px] h-[50px] ${defaultStyles}`

  return (
    <p className={inputDefaultStyles + 'bg-green-100 border-green-700 border-opacity-50 text-green-700 text-opacity-50'}>
      {character}
    </p>
  )
}
