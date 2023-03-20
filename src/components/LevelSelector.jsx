'use client'
import CompletedDifficulties from './CompletedDifficulties'
import Link from 'next/link'
import { useLevels } from '@/contexts/LevelsContext'

export default function LevelSelector ({ level }) {
  const { levels } = useLevels()
  const { isUnlocked } = levels[level - 1]

  if (!isUnlocked) {
    return (
      <div href={`/levels/${level}`} className='flex gap-1 md:mr-5 select-none'>
        <div className='rounded-full border-[5px] border-semi-dark-violet border-opacity-80 bg-semi-dark-violet bg-opacity-60 h-[50px] w-[50px] text-center'>
          <p className='font-bold mt-[7px] text-white text-lg'>{level}</p>
        </div>
        <CompletedDifficulties level={level} />
      </div>
    )
  }

  return (
    <Link href={`/levels/${level}`} className='flex gap-1 md:mr-5'>
      <div className='rounded-full border-[5px] border-dark-violet-title border-opacity-80 bg-violet-600 bg-opacity-60 h-[50px] w-[50px] text-center hover:animate-coin-pulse'>
        <p className='font-bold mt-[7px] text-white text-lg'>{level}</p>
      </div>
      <CompletedDifficulties level={level} />
    </Link>
  )
}
