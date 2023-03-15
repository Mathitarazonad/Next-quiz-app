import { useCurrentLevel } from '@/contexts/CurrentLevelContext'
import { useRouter } from 'next/navigation'

export default function LeavingAlert() {
  const router = useRouter()
  const { setShowAlert } = useCurrentLevel()

  return (
    <div className='absolute m-auto border-[5px] border-dark-violet-title border-opacity-80 bg-white py-4 px-8 rounded-2xl text-center flex flex-col gap-2 items-center'>
      <h3 className='text-xl font-bold text-dark-violet-title'>Are you sure you want to leave?</h3>
      <p className='text-semi-dark-violet font-medium text-sm'>You will lose the coins you obtained, the coins you spent as well as your progress in this difficulty.</p>
      <div className='flex gap-2 w-full'>
        <button className='flex-1 bg-violet-500 bg-opacity-80 text-white font-medium rounded-md py-1 hover:bg-opacity-60' onClick={() => router.back()}>Yes</button>
        <button className='flex-1 bg-violet-500 bg-opacity-80 text-white font-medium rounded-md py-1 hover:bg-opacity-60' onClick={() => setShowAlert(false)}>No</button>
      </div>

    </div>
  )
}
