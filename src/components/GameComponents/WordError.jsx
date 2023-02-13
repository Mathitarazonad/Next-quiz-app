import {BiErrorCircle} from 'react-icons/bi'

export default function WordError() {
  return (
    <div className='word-error'>
      <p>That word {"doesn't"} exists!</p>
      <BiErrorCircle className='word-error-icon'/>
    </div>
  )
}
