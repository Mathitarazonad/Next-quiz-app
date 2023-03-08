import CompletedDifficulties from './CompletedDifficulties'
import Link from 'next/link'

export default function LevelSelector ({ children }) {
  return (
    <Link href={`/levels/${children}`} className='flex gap-1 md:mr-5'>
      <div className='rounded-full border-[5px] border-dark-violet-title border-opacity-80 bg-violet-600 bg-opacity-60 h-[50px] w-[50px] text-center'>
        <p className='font-bold mt-[7px] text-white text-lg'>{children}</p>
      </div>
      <CompletedDifficulties level={children} />
    </Link>
  )
}
