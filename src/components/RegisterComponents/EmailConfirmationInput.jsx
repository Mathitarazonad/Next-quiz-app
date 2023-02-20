import { HiOutlineMail } from 'react-icons/hi'

export default function EmailConfirmationInput () {
  return (
    <div className='form-section'>
      <h2 className='input-title'>Confirm new email</h2>
      <div className='input-container'>
        <HiOutlineMail className='input-icon' />
        <input
          className='input'
          type='email'
          name='emailConfirmation'
          placeholder='example@gmail.com'
          required
        />
      </div>
    </div>
  )
}
