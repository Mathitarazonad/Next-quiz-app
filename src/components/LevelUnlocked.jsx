'use client'
import { LevelsContext } from '@/contexts/LevelsContext'
import { useContext } from 'react'

export default function LevelUnlocked() {
  const {setNewLevelUnlocked} = useContext(LevelsContext);

  return (
    <div className='level-unlocked-message'>
      <p>Next Level Unlocked!</p>
      <button className='ok-btn' onClick={() => setNewLevelUnlocked(false)}>Ok</button>
    </div>
  )
}
