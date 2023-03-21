'use client'
import SingleWord from './SingleWord'
import levelsData from '@/data/levels.js'
import { useLevels } from '@/contexts/LevelsContext'
import DifficultyReward from './Rewards'
import Abilities from './Abilities'
import { useCurrentLevel } from '@/contexts/CurrentLevelContext'
import LeavingAlert from '../MenuComponents/LeavingAlert'

export default function Words ({ level, difficulty }) {
  const words = levelsData[level - 1][difficulty]
  const currentDifficulty = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3
  const { difficultyPassed } = useLevels()
  const { showAlert } = useCurrentLevel()

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
              difficulty={currentDifficulty}
            />
          ))}
        </div>
        <Abilities level={level} difficulty={currentDifficulty} />
      </div>
      {difficultyPassed && <DifficultyReward level={level} difficulty={currentDifficulty} />}
      {showAlert && <LeavingAlert />}
    </>
  )
}
