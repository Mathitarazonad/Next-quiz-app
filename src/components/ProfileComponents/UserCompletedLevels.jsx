import { useLevels } from '@/contexts/LevelsContext'
import LevelCompleted from './LevelCompleted'

export default function UserCompletedLevels() {
  const { levels } = useLevels()
  const completedLevels = levels.filter(lvl => lvl.isCompleted)

  return (
    <div className='flex flex-col justify-center gap-2'>
      <h2 className='w-full text-center text-lg font-bold text-semi-dark-violet'>Completed Levels</h2>
      <div className='flex justify-center gap-2'>
        {completedLevels.length > 0
          ? completedLevels.map(lvl => <LevelCompleted key={lvl} level={lvl.level} />)
          : <p className='text-xs text-semi-dark-violet text-center font-semibold'>You didn't completed any levels yet!</p>}
      </div>
    </div>
  )
}
