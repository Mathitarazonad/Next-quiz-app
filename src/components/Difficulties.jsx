import Link from 'next/link'
import RewardDifficultyStars from './GameComponents/RewardDifficultyStars'

export default function Difficulties ({ level }) {
  return (
    <div className='flex flex-col gap-3 items-center w-full'>
      <h2 className='text-lg font-bold text-semi-dark-violet capitalize mb-1'>Select your Difficulty</h2>
      <RewardDifficultyStars level={level} />
      <Link href={`/levels/${level}/easy`} className='w-full text-center rounded-lg p-2 text-white font-semibold tracking-wider bg-violet-600 bg-opacity-70 hover:bg-opacity-50 duration-300'>
        Easy
      </Link>
      <Link href={`/levels/${level}/medium`} className='w-full text-center rounded-lg p-2 text-white font-semibold tracking-wide bg-violet-600 bg-opacity-70 hover:bg-opacity-50 duration-300'>
        Medium
      </Link>
      <Link href={`/levels/${level}/hard`} className='w-full text-center rounded-lg p-2 text-white font-semibold tracking-wide bg-violet-600 bg-opacity-70 hover:bg-opacity-50 duration-300'>
        Hard
      </Link>
    </div>
  )
}
