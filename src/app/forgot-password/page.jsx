'use client'
import EmailInput from '@/components/RegisterComponents/EmailInput'
import Alert from '@/components/RegisterComponents/Alert'
import useAuth from '@/hooks/useAuth'
import SubmitButton from '@/components/RegisterComponents/SubmitButton'
import ProtectedRoutes from '@/components/RegisterComponents/ProtectedRoutes'
import AppLogo from '@/components/MenuComponents/AppLogo'
import SuccessAlert from '@/components/RegisterComponents/SuccessAlert'
import Link from 'next/link'

export default function RegisterPage () {
  const { error, successMessage, disableSubmit, handleCloseError, handlePasswordForgot } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email } = Object.fromEntries(new window.FormData(e.target))
    handlePasswordForgot(email)
  }

  return (
    <ProtectedRoutes path='/' authentication>
      <div className='min-h-screen max-w-md flex flex-col gap-3 justify-center items-center mx-auto px-10 py-8'>
        <AppLogo />
        <h1 className='text-3xl font-bold text-dark-violet-title -mt-5 text-center'>
          Forgot Password
        </h1>
        <p className='text-semi-dark-violet text-sm'>
          Don't have an account yet?
          <Link href='/register' className='text-purple-500 font-bold cursor-pointer'>
            {' '}Sign Up
          </Link>
        </p>

        {error && <Alert message={error} handleCloseError={handleCloseError} />}
        {successMessage && <SuccessAlert message={successMessage} />}

        <form
          className='card gap-5'
          onSubmit={handleSubmit}
        >
          <EmailInput message='Enter your email' />
          <SubmitButton isDisabled={disableSubmit}>Continue</SubmitButton>
        </form>
      </div>
    </ProtectedRoutes>
  )
}
