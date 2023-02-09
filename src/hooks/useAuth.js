import { UserContext } from '@/contexts/UserContext';
import { getUserValidationError } from '@/functions/userValidations';
import {useState, useContext} from 'react';

export default function useAuth () {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [error, setError] = useState('');
  const {signUp} = useContext(UserContext);

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

  const handleCloseError = () => {
    setError('');
  }

  return {
    error, handleCloseError,
    hiddenPassword, setHiddenPassword,
    handleSignUp,
  }
}