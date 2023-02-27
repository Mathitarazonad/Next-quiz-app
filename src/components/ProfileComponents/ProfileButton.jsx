import Link from 'next/link'
import { AiOutlineUser } from 'react-icons/ai'

export default function ProfileButton() {
  return (
    <Link href='/account' className='absolute top-5 left-5 hover:scale-95 duration-300 rounded-full border-[4px] border-dark-violet-title'>
      <AiOutlineUser className='fill-dark-violet-title text-[43px]' />
    </Link>
  )
}
