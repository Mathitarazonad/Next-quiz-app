import { HiOutlineMail } from 'react-icons/hi'

export default function EmailInput ({ message }) {
  return (
    <div className='form-section'>
      <h2 className='input-title'>{message}</h2>
      <div className='input-container'>
        <HiOutlineMail className='input-icon' />
        <input
          className='input'
          type='email'
          name='email'
          placeholder='example@gmail.com'
          required
        />
      </div>
    </div>
  )
}
