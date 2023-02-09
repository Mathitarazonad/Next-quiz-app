import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className='menu-container'>
        <h1>Word Quiz App</h1>
        <Image src='/first-logo.png' alt='Next Quiz App Logo' width='200' height='200'/>
        <Link href='/levels'><button className='play-btn'>Play</button></Link>
      </div>
    </main>
  )
}
