import Image from 'next/image'

export default function AppLogo({ width = 200, height = 200 }) {
  return (
    <Image
      src='/imgs/app-logo.png'
      width={width}
      height={height}
      alt='Next Quiz App Logo'
    />
  )
}
