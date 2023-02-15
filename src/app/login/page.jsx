'use client'
import Link from 'next/link'
import Image from 'next/image'
import EmailInput from '@/components/RegisterComponents/EmailInput'
import PasswordInput from '@/components/RegisterComponents/PasswordInput'
import Alert from '@/components/RegisterComponents/Alert'
import useAuth from '@/hooks/useAuth'
import React from 'react'
import SubmitButton from '@/components/RegisterComponents/SubmitButton'
import ProtectedRoutes from '@/components/RegisterComponents/ProtectedRoutes'

export default function LoginPage () {
  const { error, handleCloseError, hiddenPassword, setHiddenPassword, handleSignIn } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = Object.fromEntries(new window.FormData(e.target))
    handleSignIn(email, password)
  }

  return (
    <ProtectedRoutes path='/' authentication>
      <div className='min-h-screen max-w-md flex flex-col gap-3 justify-center items-center mx-auto px-10'>
        <Image
          src='/first-logo.png'
          width={200}
          height={200}
          alt='Next Quiz App Logo'
        />
        <h1 className='text-3xl font-bold text-purple-900 -mt-5 text-center'>
          Sign In
        </h1>
        <p className='text-zinc-600 text-sm'>
          Don't have an account yet?
          <Link href='/register' className='text-purple-500 font-bold'>
            {' '}Sign Up
          </Link>
        </p>

        {error && <Alert message={error} handleCloseError={handleCloseError} />}

        <form
          className='rounded-xl bg-white flex flex-col justify-center items-center py-7 px-7 gap-5 w-full'
          onSubmit={(e) => handleSubmit(e)}
        >
          <EmailInput />
          <PasswordInput hiddenPassword={hiddenPassword} setHiddenPassword={setHiddenPassword} />
          <SubmitButton>Sign In</SubmitButton>
        </form>
      </div>
    </ProtectedRoutes>
  )
}
