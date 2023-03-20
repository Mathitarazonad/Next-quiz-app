'use client'
import Link from 'next/link'
import EmailInput from '@/components/RegisterComponents/EmailInput'
import PasswordInput from '@/components/RegisterComponents/PasswordInput'
import Alert from '@/components/RegisterComponents/Alert'
import useAuth from '@/hooks/useAuth'
import React from 'react'
import SubmitButton from '@/components/RegisterComponents/SubmitButton'
import ProtectedRoutes from '@/components/RegisterComponents/ProtectedRoutes'
import AppLogo from '@/components/MenuComponents/AppLogo'

export default function LoginPage () {
  const { error, handleCloseError, disableSubmit, hiddenPassword, setHiddenPassword, handleSignIn } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = Object.fromEntries(new window.FormData(e.target))
    handleSignIn(email, password)
  }

  return (
    <ProtectedRoutes path='/' authentication>
      <div className='min-h-screen max-w-md flex flex-col gap-3 justify-center items-center mx-auto px-10'>
        <AppLogo />
        <h1 className='text-3xl font-bold text-dark-violet-title -mt-5 text-center'>
          Sign In
        </h1>
        <p className='text-semi-dark-violet text-sm'>
          Don't have an account yet?
          <Link href='/register' className='text-purple-500 font-bold'>
            {' '}Sign Up
          </Link>
        </p>

        {error && <Alert message={error} handleCloseError={handleCloseError} />}

        <form
          className='card gap-5'
          onSubmit={(e) => handleSubmit(e)}
        >
          <EmailInput message='Enter your email' />
          <PasswordInput hiddenPassword={hiddenPassword} setHiddenPassword={setHiddenPassword} message='Enter your password' />
          <Link href='/forgot-password' className='text-semi-dark-violet text-xs font-semibold -mt-4 text-end w-full'>Forgot password?</Link>
          <SubmitButton isDisabled={disableSubmit}>Sign In</SubmitButton>
        </form>
      </div>
    </ProtectedRoutes>
  )
}
