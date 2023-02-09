import { FaUser } from "react-icons/fa";

export default function EmailInput() {
  return (
    <div className='form-section'>
      <h2 className='input-title'>Enter an Email</h2>
      <div className='input-container'>
        <FaUser className='input-icon' />
        <input
          className='input'
          type='email'
          name='email'
          placeholder='example@gmail.com'
        />
      </div>
    </div>
  )
}