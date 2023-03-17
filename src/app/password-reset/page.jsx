'use client'
import Alert from '@/components/RegisterComponents/Alert'
import useAuth from '@/hooks/useAuth'
import SubmitButton from '@/components/RegisterComponents/SubmitButton'
import AppLogo from '@/components/MenuComponents/AppLogo'
import PasswordInput from '@/components/RegisterComponents/PasswordInput'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUser } from '@/contexts/UserContext'
import SuccessAlert from '@/components/RegisterComponents/SuccessAlert'

export default function RegisterPage () {
  const oobCode = useSearchParams().get('oobCode')
  const [showPage, setShowPage] = useState(false)
  const { isValidPasswordResetCode } = useUser()
  const router = useRouter()
  const { error, handleCloseError, successMessage, disableSubmit, hiddenPassword, setHiddenPassword, handlePasswordReset } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    const { password, passwordConfirmation } = Object.fromEntries(new window.FormData(e.target))
    handlePasswordReset(oobCode, password, passwordConfirmation)
  }

  useEffect(() => {
    isValidPasswordResetCode(oobCode).then(resp => {
      if (resp) {
        setShowPage(true)
      } else {
        router.replace('/login')
      }
    })
  }, [])

  if (showPage) {
    return (
      <div className='min-h-screen max-w-md flex flex-col gap-3 justify-center items-center mx-auto px-10 py-8'>
        <AppLogo />
        <h1 className='text-3xl font-bold text-dark-violet-title -mt-5 text-center'>
          Password Reset
        </h1>

        {error && <Alert message={error} handleCloseError={handleCloseError} />}
        {successMessage.length > 0 && <SuccessAlert message={successMessage} />}

        <form
          className='card gap-5'
          onSubmit={handleSubmit}
        >
          <PasswordInput
            hiddenPassword={hiddenPassword}
            setHiddenPassword={setHiddenPassword}
            isSignUp message='Enter you new password'
          />
          <PasswordInput
            hiddenPassword={hiddenPassword}
            setHiddenPassword={setHiddenPassword}
            isSignUp message='Confirm your new password'
            inputName='passwordConfirmation'
          />
          <SubmitButton isDisabled={disableSubmit}>Continue</SubmitButton>
        </form>
      </div>
    )
  } else {
    return null
  }
}
