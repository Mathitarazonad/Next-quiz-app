'use client'
import { useRouter } from 'next/navigation'
import { IoMdArrowRoundBack } from 'react-icons/io'

export default function BackButton () {
  const router = useRouter()

  return (
    <button onClick={() => router.back()} className='rounded-full border-[4px] border-dark-violet-title hover:scale-95 duration-300'>
      <IoMdArrowRoundBack className='text-[37px] text-dark-violet-title' />
    </button>
  )
}
