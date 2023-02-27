'use client'
import { useRouter } from 'next/navigation'
import { IoMdArrowRoundBack } from 'react-icons/io'

export default function BackButton () {
  const router = useRouter()

  return (
    <button onClick={() => router.back()} className='rounded-full border-[5px] border-dark-violet-title absolute top-5 left-5 hover:scale-95 duration-300'>
      <IoMdArrowRoundBack className='text-[40px] text-dark-violet-title' />
    </button>
  )
}
