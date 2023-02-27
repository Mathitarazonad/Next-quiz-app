import AppLogo from '@/components/MenuComponents/AppLogo'
import MenuIcons from '@/components/MenuComponents/MenuIcons'
import UserCoins from '@/components/MenuComponents/UserCoins'
import ProfileButton from '@/components/ProfileComponents/ProfileButton'
import ProtectedRoutes from '@/components/RegisterComponents/ProtectedRoutes'
import Link from 'next/link'

export default function Home() {
  return (
    <ProtectedRoutes path='/login'>
      <main className='min-h-screen max-w-md flex items-center mx-auto px-7'>
        <div className='card gap-5 w-full'>
          <ProfileButton />
          <UserCoins />
          <AppLogo width={300} height={300} />
          <h1 className='-mt-7 text-3xl font-bold text-dark-violet-title text-center'>Next Quiz App</h1>
          <Link href='/levels' className='bg-violet-600 bg-opacity-80 w-full py-2 rounded-md text-white font-semibold text-center hover:bg-violet-400 hover:scale-95 duration-300 shadow-md '>
            Play
          </Link>
          <button className='bg-gray-500 bg-opacity-90 w-full py-2 rounded-md text-white font-semibold text-center hover:bg-gray-400 hover:scale-95 duration-300 shadow-md '>
            Rules
          </button>
          <MenuIcons />
        </div>
      </main>
    </ProtectedRoutes>
  )
}
