'use client'
import { useCoins } from '@/contexts/CoinsContext'

export default function UserCoins() {
  const { coins } = useCoins()

  return (
    <div className='flex flex-col items-center gap-1 absolute top-5 right-5'>
      <p className='rounded-full border-[5px] border-coin-border border-opacity-60 bg-coin-background w-[50px] h-[50px] text-2xl flex items-center justify-center text-white tracking-wide font-bold overflow-hidden relative after:absolute after:content-[""] after:top-0 after:-left-7 after:w-1/2 after:h-full after:skew-x-[-30deg] after:bg-gray-200 after:bg-opacity-30 hover:after:left-12 after:duration-[300ms] select-none after:animate-coin-shine animate-coin-pulse' key={Math.random()}>
        {coins}
      </p>
    </div>
  )
}
