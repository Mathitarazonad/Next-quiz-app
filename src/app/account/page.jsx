'use client'
import { useUser } from '@/contexts/UserContext'
import Image from 'next/image'
import UserCompletedLevels from '@/components/ProfileComponents/UserCompletedLevels'
import UserCredentials from '@/components/ProfileComponents/UserCredentials'
import ProtectedRoutes from '@/components/RegisterComponents/ProtectedRoutes'

export default function AccountPage() {
  const { currentUser } = useUser()

  return (
    <ProtectedRoutes path='/login'>
      <div className='min-h-screen max-w-md flex items-center mx-auto px-10'>
        <div className='rounded-xl bg-white flex flex-col justify-center items-center py-7 px-7 md:px-10 lg:px-12 gap-7 w-full shadow-lg'>
          <Image
            src='/user-photo.png'
            width={130}
            height={130}
            alt='User Profile Photo'
          />
          <h1 className='text-dark-violet-title font-bold text-2xl -mt-3 text-center w-full'>
            {currentUser?.displayName + "'s"} Profile
          </h1>
          <UserCompletedLevels />
          <UserCredentials />
        </div>
      </div>
    </ProtectedRoutes>
  )
}