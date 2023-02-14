import { IoMdArrowRoundBack } from 'react-icons/io'
import Link from 'next/link'

export default function BackButton ({ path }) {
  return (
    <Link className='back-btn' href={path}>
      <IoMdArrowRoundBack />
    </Link>
  )
}
