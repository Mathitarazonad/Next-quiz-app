'use client'
import { useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'
import PasswordInput from '@/components/RegisterComponents/PasswordInput'
import Alert from '@/components/RegisterComponents/Alert'
import SubmitButton from '@/components/RegisterComponents/SubmitButton'
import ProtectedRoutes from '@/components/RegisterComponents/ProtectedRoutes'
import AppLogo from '@/components/MenuComponents/AppLogo'

export default function PasswordChangePage () {
  const { error, handleCloseError, hiddenPassword, setHiddenPassword, handlePasswordChange } = useAuth()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const { currentPassword, newPassword, newPasswordConfirmation } = Object.fromEntries(new window.FormData(e.target))
    handlePasswordChange(currentPassword, newPassword, newPasswordConfirmation)
  }

  return (
    <ProtectedRoutes path='/login'>
      <div className='min-h-screen max-w-md flex flex-col gap-3 justify-center items-center mx-auto px-10'>
        <AppLogo />
        <h1 className='text-3xl font-bold text-dark-violet-title -mt-5 text-center'>
          Change your password
        </h1>
        <p className='text-semi-dark-violet text-sm'>
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
          <PasswordInput
            hiddenPassword={hiddenPassword}
            setHiddenPassword={setHiddenPassword}
            message='Enter your current password'
            inputName='currentPassword'
          />
          <PasswordInput
            hiddenPassword={hiddenPassword}
            setHiddenPassword={setHiddenPassword}
            isSignUp
            message='Enter your new password'
            inputName='newPassword'
          />
          <PasswordInput
            hiddenPassword={hiddenPassword}
            setHiddenPassword={setHiddenPassword}
            message='Confirm your new password'
            inputName='newPasswordConfirmation'
          />
          <SubmitButton>Change password</SubmitButton>
        </form>
      </div>
    </ProtectedRoutes>
  )
}
