import { useLevels } from '@/contexts/LevelsContext'
import { useEffect } from 'react'
import { AiFillStar } from 'react-icons/ai'

export default function DifficultyStars({ level, difficulty }) {
  const { levels } = useLevels()
  const { completedDifficulties } = levels[level - 1]

  const starCompleted = ' fill-yellow-600'
  const startIncompleted = ' fill-gray-400'
  const starGrow = ' animate-star-grow'

  useEffect(() => {
    setTimeout(() => {
      new Audio('/sounds/starCollection.mp3').play()
    }, 250)
  }, [])

  return (
    <div className='flex items-center gap-2'>
      <AiFillStar
        className={difficulty === 1 ? 'w-[45px] h-[45px] mt-4 rounded-sm' + starCompleted + starGrow
          : completedDifficulties.includes(1) ? 'w-[45px] h-[45px] mt-4 rounded-sm' + starCompleted
            : 'w-[45px] h-[45px] mt-4' + startIncompleted}
      />
      <AiFillStar
        className={difficulty === 3 ? 'w-[55px] h-[55px] mb-2 rounded-sm' + starCompleted + starGrow
          : completedDifficulties.includes(3) ? 'w-[55px] h-[55px] mb-2 rounded-sm' + starCompleted
            : 'w-[55px] h-[55px] mb-2' + startIncompleted}
      />
      <AiFillStar
        className={difficulty === 2 ? 'w-[50px] h-[50px] mt-2 rounded-sm' + starCompleted + starGrow
          : completedDifficulties.includes(2) ? 'w-[50px] h-[50px] mt-2 rounded-sm' + starCompleted
            : 'w-[50px] h-[50px] mt-2' + startIncompleted}
      />
    </div>
  )
}
