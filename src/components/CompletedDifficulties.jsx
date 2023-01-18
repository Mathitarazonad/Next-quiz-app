"use client"
import { LevelsContext } from "@/contexts/LevelsContext"
import { useContext } from "react"

export default function CompletedDifficulties({level}) {
  const {difficultiesCompleted} = useContext(LevelsContext);
  //0-None  1-Easy completed  2-Medium completed  3-Hard completed

  return (
    <div className='completed-difficulties-container'>
      <span className={difficultiesCompleted[level-1] === 1
        ? 'difficulty easy completed' 
        : 'difficulty easy'}></span>
      <span className={difficultiesCompleted[level-1] === 2 
        ? 'difficulty medium completed' 
        : 'difficulty medium'}></span>
      <span className={difficultiesCompleted[level-1] === 3 
        ? 'difficulty hard completed' 
        : 'difficulty hard'}></span>
    </div>
  )
}
