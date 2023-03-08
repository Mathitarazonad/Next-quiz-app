'use client'
import { LevelsContext } from '@/contexts/LevelsContext'
import { useContext } from 'react'
import { AiFillStar } from 'react-icons/ai'

export default function CompletedDifficulties ({ level }) {
  const { levels } = useContext(LevelsContext)
  const { completedDifficulties } = levels[level - 1]
  // 0-None  1-Easy completed  2-Medium completed  3-Hard completed

  const starCompleted = ' fill-yellow-600'
  const startIncompleted = ' fill-gray-400'

  return (
    <div className='flex items-center justify-center gap-1'>
      <AiFillStar
        className={completedDifficulties.includes(1) ? 'w-[16px] h-[16px] rounded-sm' + starCompleted
          : 'w-[16px] h-[16px]' + startIncompleted}
      />
      <AiFillStar
        className={completedDifficulties.includes(2) ? 'w-[19px] h-[19px] rounded-sm' + starCompleted
          : 'w-[19px] h-[19px]' + startIncompleted}
      />
      <AiFillStar
        className={completedDifficulties.includes(3) ? 'w-[21px] h-[21px] rounded-sm' + starCompleted
          : 'w-[21px] h-[21px]' + startIncompleted}
      />
    </div>
  )
}
