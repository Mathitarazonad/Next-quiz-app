import { FaLock } from 'react-icons/fa'
import { MdOutlineVisibilityOff, MdVisibility } from 'react-icons/md'

export default function PasswordInput ({ hiddenPassword, setHiddenPassword, isSignUp = false }) {
  return (
    <div className='form-section'>
      <div className='flex justify-between w-full'>
        <h2 className='input-title'>Your Password</h2>
        {hiddenPassword
          ? (
            <MdOutlineVisibilityOff
              className='text-sm text-zinc-600 mr-[2px]'
              onPointerDown={() => setHiddenPassword(false)}
            />
            )
          : (
            <MdVisibility
              className='text-sm text-zinc-600 mr-[2px]'
              onPointerUp={() => setHiddenPassword(true)}
            />
            )}
      </div>
      <div className='input-container'>
        <FaLock className='input-icon' />
        <input
          placeholder={isSignUp ? 'Must be at least 6 characters long' : ''}
          className='input'
          type={hiddenPassword ? 'password' : 'text'}
          name='password'
        />
      </div>
    </div>
  )
}
