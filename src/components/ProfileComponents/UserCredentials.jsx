import Link from 'next/link'

export default function UserCredentials() {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <h2 className='text-semi-dark-violet text-lg font-bold text-center'>Credentials Change</h2>
      <Link href='/change-email' className='rounded-md bg-violet-500 bg-opacity-80 p-2 text-xs font-semibold text-white text-center flex-1 hover:bg-opacity-70'>
        Change email
      </Link>
      <Link href='/change-password' className='rounded-md bg-violet-500 bg-opacity-80 p-2 text-xs font-semibold text-white text-center flex-1 hover:bg-opacity-70'>
        Change password
      </Link>
    </div>
  )
}
