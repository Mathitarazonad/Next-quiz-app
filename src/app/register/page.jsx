'use client'
import Link from 'next/link'
import PasswordInput from '@/components/RegisterComponents/PasswordInput'
import EmailInput from '@/components/RegisterComponents/EmailInput'
import Alert from '@/components/RegisterComponents/Alert'
import useAuth from '@/hooks/useAuth'
import SubmitButton from '@/components/RegisterComponents/SubmitButton'
import ProtectedRoutes from '@/components/RegisterComponents/ProtectedRoutes'
import UsernameInput from '@/components/RegisterComponents/UsernameInput'
import AppLogo from '@/components/MenuComponents/AppLogo'

export default function RegisterPage () {
  const { error, handleCloseError, disableSubmit, handleSignUp, hiddenPassword, setHiddenPassword } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    const { username, email, password, passwordConfirmation } = Object.fromEntries(new window.FormData(e.target))
    handleSignUp(username, email, password, passwordConfirmation)
  }

  return (
    <ProtectedRoutes path='/' authentication>
      <div className='min-h-screen max-w-md flex flex-col gap-3 justify-center items-center mx-auto px-10 py-8'>
        <AppLogo />
        <h1 className='text-3xl font-bold text-dark-violet-title -mt-5 text-center'>
          Create your account
        </h1>
        <p className='text-semi-dark-violet text-sm'>
          Already have an account?
          <Link href='/login' className='text-purple-500 font-bold cursor-pointer'>
            {' '}Sign In
          </Link>
        </p>

        {error && <Alert message={error} handleCloseError={handleCloseError} />}

        <form
          className='card gap-5'
          onSubmit={handleSubmit}
        >
          <UsernameInput />
          <EmailInput message='Enter an email' />
          <PasswordInput
            hiddenPassword={hiddenPassword}
            setHiddenPassword={setHiddenPassword}
            isSignUp message='Enter a password'
          />
          <PasswordInput
            hiddenPassword={hiddenPassword}
            setHiddenPassword={setHiddenPassword}
            isSignUp message='Confirm your password'
            inputName='passwordConfirmation'
          />
          <SubmitButton isDisabled={disableSubmit}>Sign Up</SubmitButton>
        </form>
      </div>
    </ProtectedRoutes>
  )
}
