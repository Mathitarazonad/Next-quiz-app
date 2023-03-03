import { useUser } from '@/contexts/UserContext'
import { isUsernameValid } from '@firebase/firestoreFunctions'
import { useState } from 'react'

export default function useAuth () {
  const [hiddenPassword, setHiddenPassword] = useState(true)
  const [error, setError] = useState('')
  const { currentUser, signUp, signIn, logout, changeEmail, changePassword } = useUser()

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
    const resp = await isUsernameValid(username)
    if (!resp) {
      setError('Username is already in use')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    if (password === passwordConfirmation) {
      try {
        if (error) {
          setError('')
        }
        if (email && password && passwordConfirmation) {
          await signUp(username, email, password)
        }
      } catch (error) {
        setError(getUserValidationError(error.code))
      }
    } else {
      setError('Passwords do not match')
    }
  }

  const handleSignIn = async (email, password) => {
    try {
      if (error) {
        setError('')
      }
      await signIn(email, password)
    } catch (error) {
      setError(getUserValidationError(error.code))
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  const handleEmailChange = async (currentPassword, newEmail, newEmailConfirmation) => {
    try {
      if (error) {
        setError('')
      }
      if (currentUser.email === newEmail) {
        setError('New email cannot be the current one')
        return
      }
      if (newEmail === newEmailConfirmation) {
        await changeEmail(currentPassword, newEmail)
      } else {
        setError('Emails do not match')
      }
    } catch (error) {
      setError(getUserValidationError(error.code))
    }
  }

  const handlePasswordChange = async (currentPassword, newPassword, newPasswordConfirmation) => {
    try {
      if (error) {
        setError('')
      }
      if (newPassword.length < 6) {
        setError('Password must be at least 6 characters long')
        return
      }
      if (currentPassword === newPassword) {
        setError('New password cannot be the current one')
        return
      }
      if (newPassword === newPasswordConfirmation) {
        await changePassword(currentPassword, newPassword)
      } else {
        setError('Passwords do not match')
      }
    } catch (error) {
      setError(getUserValidationError(error.code))
    }
  }

  const handleCloseError = () => {
    setError('')
  }

  return {
    error,
    handleCloseError,
    hiddenPassword,
    setHiddenPassword,
    handleSignUp,
    handleSignIn,
    handleLogout,
    handleEmailChange,
    handlePasswordChange
  }
}
