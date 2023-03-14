'use client'
import { useCoins } from '@/contexts/CoinsContext'

export default function UserCoins() {
  const { coins } = useCoins()

  return (
    <div className='flex flex-col items-center gap-1'>
      <p className='rounded-full border-[6.5px] border-coin-border border-opacity-60 bg-coin-background w-[55px] h-[55px] text-xl flex items-center justify-center text-white tracking-wide font-bold overflow-hidden relative after:absolute after:content-[""] after:top-0 after:-left-7 after:w-1/2 after:h-full after:skew-x-[-30deg] after:bg-gray-200 after:bg-opacity-30 select-none after:animate-coin-shine animate-coin-pulse' key={Math.random()}>
        {coins}
      </p>
    </div>
  )
}
