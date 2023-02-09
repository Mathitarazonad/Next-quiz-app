import { UserContext } from '@/contexts/UserContext';
import {useState, useContext} from 'react';

export default function useAuth () {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [error, setError] = useState('');
  const {signUp, signIn, logout} = useContext(UserContext);

  const handleSignUp = async (email, password, passwordConfirmation) => {
    if (password === passwordConfirmation) {
      try {
        if (error) {
          setError('');
        }
        await signUp(email, password);
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
        setError('');
      }
      await signIn(email, password);
    } catch (error) {
      setError(getUserValidationError(error.code))
    }
  }

  const handleLogout = async () => {
    await logout();
  }

  const getUserValidationError = (errorCode) => {
    if (errorCode === 'auth/weak-password') {
      return 'Password must be at least 6 characters long';
    } else if (errorCode === 'auth/email-already-in-use') {
      return 'Email is already in use';
    } else if (errorCode === 'auth/user-not-found') {
      return 'This account doesn\'t exists';
    } else {
      return 'Problem at login';
    }
  }

  const handleCloseError = () => {
    setError('');
  }

  return {
    error, handleCloseError,
    hiddenPassword, setHiddenPassword,
    handleSignUp, handleSignIn, handleLogout
  }
}