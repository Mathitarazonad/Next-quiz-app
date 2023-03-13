'use client'
import SingleWord from './SingleWord'
import levelsData from '@/data/levels.js'
import { useLevels } from '@/contexts/LevelsContext'
import DifficultyReward from './Rewards'
import Abilities from './Abilities'

export default function Words ({ level, difficulty }) {
  const words = levelsData[level - 1][difficulty]
  const { difficultyPassed } = useLevels()

  return (
    <>
      <div className='flex flex-col gap-3 w-full'>
        <div className={words[0].length > 6 ? 'flex flex-col gap-2 items-center' : 'flex flex-col gap-3 items-center'}>
          {words.map((word, index) => (
            <SingleWord
              word={word}
              wordIndex={index}
              key={word}
              level={level}
              difficulty={
                difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3
              }
            />
          ))}
          {/* Alert the user that a new level has been unlocked */}
        </div>
        <Abilities level={level} difficulty={difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3} />
      </div>
      {difficultyPassed && <DifficultyReward level={level} difficulty={difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3} />}
    </>
  )
}
