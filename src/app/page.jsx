import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <div className='menu-container'>
        <h1>Word Quiz App</h1>
        <Image src='/first-logo.PNG' alt='Word Quiz App Logo' className='word-quiz-logo' width='200' height='200'/>
        <button className='play-btn'>Play</button>
      </div>
    </main>
  )
}
