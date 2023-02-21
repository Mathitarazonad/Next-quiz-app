import { UserContext } from '@/contexts/UserContext'
import { useState, useContext } from 'react'

export default function useAuth () {
  const [hiddenPassword, setHiddenPassword] = useState(true)
  const [error, setError] = useState('')
  const { currentUser, signUp, signIn, logout, changeEmail, changePassword } = useContext(UserContext)

  const handleSignUp = async (username, email, password, passwordConfirmation) => {
    if (password === passwordConfirmation) {
      try {
        if (error) {
          setError('')
        }
        if (email && password && passwordConfirmation) {
          await signUp(username, email, password)
        } else {
          setError('All fields are required')
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
      if (email && password) {
        await signIn(email, password)
      } else {
        setError('All fields are required')
      }
    } catch (error) {
      setError(getUserValidationError(error.code))
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  const getUserValidationError = (errorCode) => {
    if (errorCode === 'auth/weak-password') {
      return 'Password must be at least 6 characters long'
    } else if (errorCode === 'auth/email-already-in-use') {
      return 'Email is already in use'
    } else if (errorCode === 'auth/user-not-found') {
      return 'This account doesn\'t exists'
    } else if (errorCode === 'auth/wrong-password') {
      return 'Invalid password or email'
    } else {
      return `Error at ${errorCode}`
    }
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
      console.log(currentPassword, newPassword, newPasswordConfirmation)
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
