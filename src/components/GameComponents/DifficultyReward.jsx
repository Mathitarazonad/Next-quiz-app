'use client'
import { useCoins } from '@/contexts/CoinsContext'
import { useLevels } from '@/contexts/LevelsContext'
import { useUser } from '@/contexts/UserContext'
import { updateUserCoins } from '@firebase/firestoreFunctions'
import DifficultyStars from './DifficultyStars'

export default function DifficultyReward({ level, difficulty }) {
  const { setDifficultyPassed } = useLevels()
  const { coins, setCoins } = useCoins()
  const { currentUser } = useUser()

  const handleClick = () => {
    setDifficultyPassed(false)
    setCoins(prevState => prevState + getRewardByDifficulty())
    updateUserCoins(currentUser.displayName, coins + getRewardByDifficulty())
    new Audio('/sounds/coinGain.wav').play()
  }

  const getRewardByDifficulty = () => {
    if (difficulty === 1) {
      return 3
    } else if (difficulty === 2) {
      return 4
    } else {
      return 5
    }
  }

  return (
    <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
      <div className='border-[5px] border-dark-violet-title border-opacity-80 bg-white py-4 px-8 rounded-2xl text-center flex flex-col gap-2 items-center'>
        <h3 className='capitalize text-xl font-bold text-dark-violet-title'>Difficulty Completed</h3>
        <DifficultyStars level={level} difficulty={difficulty} />
        <p className='text-2xl font-bold text-yellow-600 text-opacity-90'>You won {getRewardByDifficulty()} coins!</p>
        <button className='bg-violet-500 bg-opacity-60 w-1/3 rounded-lg py-1 text-lg text-white font-semibold spacing hover:bg-opacity-50 duration-300' onClick={() => handleClick()}>Get</button>
      </div>
    </div>
  )
}
