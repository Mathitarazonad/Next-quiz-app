'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'
import PasswordInput from '@/components/RegisterComponents/PasswordInput'
import EmailInput from '@/components/RegisterComponents/EmailInput'
import Alert from '@/components/RegisterComponents/Alert'
import SubmitButton from '@/components/RegisterComponents/SubmitButton'
import ProtectedRoutes from '@/components/RegisterComponents/ProtectedRoutes'
import EmailConfirmationInput from '@/components/RegisterComponents/EmailConfirmationInput'

export default function EmailChangePage () {
  const { error, handleCloseError, hiddenPassword, setHiddenPassword, handleEmailChange } = useAuth()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const { password, email, emailConfirmation } = Object.fromEntries(new window.FormData(e.target))
    handleEmailChange(password, email, emailConfirmation)
  }

  return (
    <ProtectedRoutes path='/login'>
      <div className='min-h-screen max-w-md flex flex-col gap-3 justify-center items-center mx-auto px-10'>
        <Image
          src='/first-logo.png'
          width={200}
          height={200}
          alt='Next Quiz App Logo'
        />
        <h1 className='text-3xl font-bold text-purple-900 -mt-5 text-center'>
          Change your email
        </h1>
        <p className='text-zinc-600 text-sm'>
          I don't think it anymore,
          <a className='text-purple-500 font-bold' onClick={() => router.back()}>
            {' '}go back
          </a>
        </p>

        {error && <Alert message={error} handleCloseError={handleCloseError} />}

        <form
          className='rounded-xl bg-white flex flex-col justify-center items-center py-7 px-7 gap-5 w-full shadow-lg'
          onSubmit={handleSubmit}
        >
          <PasswordInput hiddenPassword={hiddenPassword} setHiddenPassword={setHiddenPassword} isSignUp message='Current password' />
          <EmailInput message='Enter a new email' />
          <EmailConfirmationInput />
          <SubmitButton>Change email</SubmitButton>
        </form>
      </div>
    </ProtectedRoutes>
  )
}
