import { FaUser } from 'react-icons/fa'

export default function UsernameInput () {
  return (
    <div className='form-section'>
      <h2 className='input-title'>Enter an Username</h2>
      <div className='input-container'>
        <FaUser className='input-icon' />
        <input
          className='input'
          type='text'
          name='username'
          placeholder='Username'
          required
        />
      </div>
    </div>
  )
}
