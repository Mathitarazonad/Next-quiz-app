'use client'
import { useUser } from '@/contexts/UserContext'
import { CgLogOut } from 'react-icons/cg'

export default function LogoutButton() {
  const { logout } = useUser()

  return (
    <button onClick={() => logout()} className='rounded-full border-[4px] border-dark-violet-title hover:scale-95 duration-300 text-[29px] text-dark-violet-title p-1'>
      <CgLogOut />
    </button>
  )
}
