import Image from 'next/image'

export default function AppLogo({ width = 200, height = 200 }) {
  return (
    <Image
      src='/imgs/first-logo.png'
      width={width}
      height={height}
      alt='Next Quiz App Logo'
    />
  )
}
