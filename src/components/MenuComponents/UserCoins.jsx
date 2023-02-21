'use client'
import { useCoins } from '@/contexts/CoinsContext'

export default function UserCoins() {
  const { coins } = useCoins()

  return (
    <div className='flex flex-col items-center gap-1 absolute top-5 right-5'>
      <p className='rounded-full border-[4px] border-coin-border bg-coin-background w-[50px] h-[50px] text-2xl flex items-center justify-center text-white tracking-wide font-bold'>
        {coins}
      </p>
    </div>
  )
}
