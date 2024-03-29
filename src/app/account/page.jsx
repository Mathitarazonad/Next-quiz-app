'use client'
import { useUser } from '@/contexts/UserContext'
import Image from 'next/image'
import UserCompletedLevels from '@/components/ProfileComponents/UserCompletedLevels'
import UserCredentials from '@/components/ProfileComponents/UserCredentials'
import ProtectedRoutes from '@/components/RegisterComponents/ProtectedRoutes'
import UserCoins from '@/components/MenuComponents/UserCoins'
import BackButton from '@/components/MenuComponents/BackButton'
import IconsPair from '@/components/MenuComponents/IconsPair'
import LogoutButton from '@/components/MenuComponents/LogoutButton'

export default function AccountPage() {
  const { currentUser } = useUser()

  return (
    <ProtectedRoutes path='/login'>
      <div className='min-h-screen max-w-md flex items-center mx-auto px-7'>
        <div className='card gap-5'>
          <IconsPair>
            <BackButton />
            <LogoutButton />
          </IconsPair>
          <Image
            src='/imgs/user-photo.png'
            width={130}
            height={130}
            alt='User Profile Photo'
          />
          <h1 className='text-dark-violet-title font-bold text-2xl -mt-3 text-center w-full'>
            {currentUser?.displayName + "'s"} Profile
          </h1>
          <UserCompletedLevels />
          <div className='flex flex-col'>
            <h2 className='w-full text-center text-lg font-bold text-semi-dark-violet'>Your Coins</h2>
            <UserCoins />
          </div>
          <UserCredentials />
        </div>
      </div>
    </ProtectedRoutes>
  )
}
