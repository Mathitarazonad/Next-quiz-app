'use client'
import { useCurrentLevel } from '@/contexts/CurrentLevelContext'
import { useRouter } from 'next/navigation'
import { IoMdArrowRoundBack } from 'react-icons/io'

export default function GameLeaveButton () {
  const router = useRouter()
  const { alertAtLeaving, setShowAlert } = useCurrentLevel()

  const handleClick = () => {
    if (alertAtLeaving) {
      setShowAlert(true)
      return
    }
    router.back()
  }

  return (
    <button onClick={handleClick} className='rounded-full border-[4px] border-dark-violet-title hover:scale-95 duration-300'>
      <IoMdArrowRoundBack className='text-[37px] text-dark-violet-title' />
    </button>
  )
}
