'use client'
import { BsShareFill, BsGithub } from 'react-icons/bs'
import { ImVolumeHigh, ImVolumeMute2 } from 'react-icons/im'
import { useSound } from '@/contexts/SoundContext'
import Link from 'next/link'

export default function MenuIcons() {
  const { soundActive, setSoundActive, muteSound } = useSound()

  const handleShare = () => {
    navigator.clipboard.writeText('next-quiz-app-mathitarazonad.vercel.app')
  }

  const handleSound = (mode) => {
    setSoundActive(mode)
    if (!mode) {
      muteSound()
    }
  }

  return (
    <div className='flex justify-between w-full'>
      <div className='group relative bg-violet-600 w-[40px] h-[40px] flex items-center justify-center bg-opacity-90 p-1 rounded-full duration-300'>
        <BsShareFill className='text-xl text-white -ml-[2px] cursor-pointer' onClick={() => handleShare()} />
        <p className='hidden group-hover:flex items-center h-5 px-2 text-[10px] text-white rounded-md absolute -left-7 -top-7 mx-auto bg-violet-400 w-max after:w-2 after:h-2 after:rotate-45 after:content-[""] after:absolute after:left-11 after:top-[14px] after:bg-violet-400'>
          Copy to clipboard
        </p>
      </div>
      <Link href='https://github.com/Mathitarazonad/Next-quiz-app' rel='noopener noreferrer' target='_blank' className='group relative bg-violet-600 w-[40px] h-[40px] flex items-center justify-center bg-opacity-90 p-1 rounded-full duration-300'>
        <BsGithub className='text-2xl text-white cursor-pointer' />
        <p className='hidden group-hover:flex items-center h-5 px-2 text-[10px] text-white rounded-md absolute -left-4 -top-7 mx-auto bg-violet-400 w-max after:w-2 after:h-2 after:rotate-45 after:content-[""] after:absolute after:left-[30px] after:top-[14px] after:bg-violet-400'>
          Repository
        </p>
      </Link>
      <div className='group relative bg-violet-600 w-[40px] h-[40px] flex items-center justify-center bg-opacity-90 p-1 rounded-full duration-300'>
        {soundActive
          ? <ImVolumeHigh className='text-2xl text-white cursor-pointer' onClick={() => handleSound(false)} />
          : <ImVolumeMute2 className='text-2xl text-white cursor-pointer' onClick={() => handleSound(true)} />}
      </div>
    </div>
  )
}
