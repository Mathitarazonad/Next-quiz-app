import { useUser } from '@/contexts/UserContext'
import { isUsernameValid } from '@firebase/firestoreFunctions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function useAuth () {
  const [hiddenPassword, setHiddenPassword] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { currentUser, signUp, signIn, logout, changeEmail, changePassword, sendEmailOfPasswordReset, confirmNewPasswordReset } = useUser()
  const [disableSubmit, setDisableSubmit] = useState(false)
  const router = useRouter()

  const getUserValidationError = (errorCode) => {
    if (errorCode === 'auth/email-already-in-use') {
      return 'Email is already in use'
    } else if (errorCode === 'auth/user-not-found') {
      return 'This account doesn\'t exists'
    } else if (errorCode === 'auth/wrong-password') {
      return 'Invalid password or email'
    } else {
      return `Error at ${errorCode}`
    }
  }

  const handleSignUp = async (username, email, password, passwordConfirmation) => {
    if (disableSubmit) {
      return
    }

    if (error) {
      setError('')
    }

    const resp = await isUsernameValid(username)
    if (!resp) {
      setError('Username is already in use')
      return
    }

    if (password !== passwordConfirmation) {
      setError('Passwords do not match')
      return
    }

    try {
      setDisableSubmit(true)
      await signUp(username, email, password)
    } catch (error) {
      setError(getUserValidationError(error.code))
    }
  }

  const handleSignIn = async (email, password) => {
    if (disableSubmit) {
      return
    }

    if (error) {
      setError('')
    }

    try {
      setDisableSubmit(true)
      await signIn(email, password)
    } catch (error) {
      setError(getUserValidationError(error.code))
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  const handleEmailChange = async (currentPassword, newEmail, newEmailConfirmation) => {
    if (disableSubmit) {
      return
    }

    if (error) {
      setError('')
    }

    if (currentUser.email === newEmail) {
      setError('New email cannot be the current one')
      return
    }

    if (!newEmail === newEmailConfirmation) {
      setError('Emails do not match')
      return
    }

    try {
      setDisableSubmit(true)
      await changeEmail(currentPassword, newEmail)
    } catch (error) {
      setError(getUserValidationError(error.code))
    }
  }

  const handlePasswordChange = async (currentPassword, newPassword, newPasswordConfirmation) => {
    if (disableSubmit) {
      return
    }

    if (error) {
      setError('')
    }

    if (currentPassword === newPassword) {
      setError('New password cannot be the current one')
      return
    }

    if (newPassword !== newPasswordConfirmation) {
      setError('Passwords do not match')
      return
    }

    try {
      setDisableSubmit(true)
      await changePassword(currentPassword, newPassword)
    } catch (error) {
      setError(getUserValidationError(error.code))
    }
  }

  const handlePasswordForgot = async (email) => {
    if (disableSubmit) {
      return
    }

    if (error) {
      setError('')
    }

    try {
      await sendEmailOfPasswordReset(email)
      setDisableSubmit(true)
      setSuccessMessage('Mail sent successfully, check it for further instructions')
    } catch (error) {
      setError(getUserValidationError(error))
    }
  }

  const handlePasswordReset = async (code, password, passwordConfirmation) => {
    if (disableSubmit) {
      return
    }

    if (error) {
      setError('')
    }

    if (password !== passwordConfirmation) {
      setError('Passwords do not match')
      return
    }

    try {
      await confirmNewPasswordReset(code, password)
      setSuccessMessage('Password reset successful')
      setDisableSubmit(true)
    } catch (error) {
      setError(getUserValidationError(error))
    }
  }

  const handleCloseError = () => {
    setError('')
  }

  return {
    error,
    handleCloseError,
    successMessage,
    hiddenPassword,
    setHiddenPassword,
    handleSignUp,
    handleSignIn,
    handleLogout,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordForgot,
    handlePasswordReset,
    disableSubmit
  }
}
