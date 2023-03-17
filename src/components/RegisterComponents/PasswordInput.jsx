import { FaLock } from 'react-icons/fa'
import { MdOutlineVisibilityOff, MdVisibility } from 'react-icons/md'

export default function PasswordInput ({ hiddenPassword, setHiddenPassword, isSignUp = false, message, inputName = 'password' }) {
  return (
    <div className='form-section'>
      <div className='flex justify-between w-full'>
        <h2 className='input-title'>{message}</h2>
        {hiddenPassword && (inputName === 'password' || inputName === 'currentPassword')
          ? (
            <MdOutlineVisibilityOff
              className='text-sm text-zinc-600 mr-[2px] cursor-pointer'
              onPointerDown={() => setHiddenPassword(false)}
            />
            )
          : !hiddenPassword && (inputName === 'password' || inputName === 'currentPassword')
              ? (
                <MdVisibility
                  className='text-sm text-zinc-600 mr-[2px] cursor-pointer'
                  onPointerUp={() => setHiddenPassword(true)}
                />
                )
              : null}
      </div>
      <div className='input-container'>
        <FaLock className='input-icon' />
        <input
          placeholder={isSignUp && (inputName === 'password' || inputName === 'newPassword') ? 'Must be at least 6 characters long' : ''}
          className='input'
          minLength={6}
          type={hiddenPassword ? 'password' : 'text'}
          name={inputName}
          required
        />
      </div>
    </div>
  )
}
