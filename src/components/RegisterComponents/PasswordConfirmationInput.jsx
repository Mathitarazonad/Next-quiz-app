import { FaLock } from 'react-icons/fa';

export default function PasswordConfirmationInput ({ hiddenPassword}) {
  return (
    <div className='form-section'>
     <h2 className='input-title'>Confirm Password</h2>
     <div className='input-container'>
        <FaLock className='input-icon' />
        <input
        className='input'
        type={hiddenPassword ? 'password' : 'text'}
        name='passwordConfirmation'
        />
      </div>
    </div>
  )
}