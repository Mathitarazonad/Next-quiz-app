import BackButton from '@/components/MenuComponents/BackButton'
import IconsPair from '@/components/MenuComponents/IconsPair'
import LogoutButton from '@/components/MenuComponents/LogoutButton'
import Image from 'next/image'
export default function HowToPlayPage() {
  return (
    <div className='min-h-screen max-w-md flex items-center mx-auto px-7 py-7'>
      <div className='card gap-3'>
        <IconsPair><BackButton /><LogoutButton /></IconsPair>
        <h1 className='text-dark-violet-title font-bold text-3xl text-center'>How to play</h1>
        <div className=' flex flex-col gap-1'>
          <h2 className='text-semi-dark-violet font-bold text-2xl text-center'>General</h2>
          <ul className='flex flex-col gap-1'>
            <li className='text-sm font-medium text-semi-dark-violet'>1. The game have 10 levels and 3 difficulties each one.</li>
            <li className='text-sm font-medium text-semi-dark-violet'>2. You have 5 words, guess all of them to complete a difficulty.</li>
            <li className='text-sm font-medium text-semi-dark-violet'>3. Complete the 3 difficulties per level to unlock the next one.</li>
          </ul>
        </div>
        <div className=' flex flex-col gap-1'>
          <h2 className='text-semi-dark-violet font-bold text-2xl text-center'>In Game</h2>
          <ul className='flex flex-col gap-1'>
            <li className='text-sm font-medium text-semi-dark-violet flex flex-col gap-[2px]'>
              1. You have 3 abilities available. Each one only can be use once per difficulty
              <Image src='/imgs/abilities.PNG' width={300} height={300} alt='Abilities image' className='h-full w-full' />
            </li>
            <li className='text-sm font-medium text-semi-dark-violet'>
              2. You need to enter existing words. When the word doesn't exists.
              <Image src='/imgs/word-not-exists.PNG' width={150} height={150} alt='Abilities image' className='h-2/3 w-2/3' />
            </li>
            <li className='text-sm font-medium text-semi-dark-violet flex items-center gap-[6px]'>
              3. Letter not in is the word:
              <Image src='/imgs/incorrect-letter.PNG' width={50} height={50} alt='Incorrect letter image' />
            </li>
            <li className='text-sm font-medium text-semi-dark-violet flex items-center gap-3'>
              4. Letter is wrong placed:
              <Image src='/imgs/letter-wrong-placed.PNG' width={50} height={50} alt='Letter wrong placed image' />
            </li>
            <li className='text-sm font-medium text-semi-dark-violet flex items-center gap-3'>
              5. Letter correctly placed:
              <Image src='/imgs/correct-letter.PNG' width={45} height={45} alt='Letter wrong placed image' />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
