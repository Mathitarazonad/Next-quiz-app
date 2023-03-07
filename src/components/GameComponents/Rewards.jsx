'use client'
import { useCoins } from '@/contexts/CoinsContext'
import { useLevels } from '@/contexts/LevelsContext'
import { useSound } from '@/contexts/SoundContext'
import { useUser } from '@/contexts/UserContext'
import { updateUserCoins } from '@firebase/firestoreFunctions'
import DifficultyStars from './DifficultyStars'

export default function Rewards({ level, difficulty }) {
  const { setDifficultyPassed, levels } = useLevels()
  const { coins, setCoins } = useCoins()
  const { coinGainSound } = useSound()
  const { currentUser } = useUser()
  const isLevelCompleted = levels[level - 1].isCompleted

  const handleReward = () => {
    const username = currentUser.displayName
    const reward = getReward()
    setDifficultyPassed(false)
    coinGainSound()
    setCoins(coins + reward)
    updateUserCoins(username, coins + reward)
  }

  const getReward = () => {
    const reward = isLevelCompleted ? 10 : 0

    if (difficulty === 1) {
      return reward + 3
    } else if (difficulty === 2) {
      return reward + 4
    } else {
      return reward + 5
    }
  }

  return (
    <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
      <div className='border-[5px] border-dark-violet-title border-opacity-80 bg-white py-4 px-8 rounded-2xl text-center flex flex-col gap-2 items-center'>
        <h3 className='capitalize text-xl font-bold text-dark-violet-title'>
          {isLevelCompleted ? 'Level Completed' : 'Difficulty Completed'}
        </h3>
        <DifficultyStars level={level} difficulty={difficulty} />
        <p className='text-2xl font-bold text-yellow-600 text-opacity-90'>You won {getReward()} coins!</p>
        <button className='bg-violet-500 bg-opacity-60 w-1/3 rounded-lg py-1 text-lg text-white font-semibold spacing hover:bg-opacity-50 duration-300' onClick={() => handleReward()}>Get</button>
      </div>
    </div>
  )
}
