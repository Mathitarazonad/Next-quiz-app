'use client'
import { LevelsContext } from '@/contexts/LevelsContext'
import { useContext } from 'react'

export default function LevelUnlocked() {
  const {setNewUnlockedLevel} = useContext(LevelsContext)

  const handleClick = () => {
    setNewUnlockedLevel(false);
  }

  return (
    <div className='level-unlocked-message'>
      <p>Next Level Unlocked!</p>
      <button className='ok-btn' onClick={() => handleClick()}>Ok</button>
    </div>
  )
}
