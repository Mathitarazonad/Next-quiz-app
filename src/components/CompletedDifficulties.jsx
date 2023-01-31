"use client"
import { LevelsContext } from "@/contexts/LevelsContext"
import { useContext } from "react"

export default function CompletedDifficulties({level}) {
  const {levels} = useContext(LevelsContext)
  const {completedDifficulties} = levels[level-1]
  //0-None  1-Easy completed  2-Medium completed  3-Hard completed

  return (
    <div className='completed-difficulties-container'>
      <span className={completedDifficulties.includes(1)
        ? 'difficulty easy completed' 
        : 'difficulty easy'}></span>
      <span className={completedDifficulties.includes(2) 
        ? 'difficulty medium completed' 
        : 'difficulty medium'}></span>
      <span className={completedDifficulties.includes(3)
        ? 'difficulty hard completed' 
        : 'difficulty hard'}></span>
    </div>
  )
}
