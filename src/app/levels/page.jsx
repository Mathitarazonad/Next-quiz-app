import levels from '@/data/levels.json'
import BackButton from '@/components/MenuComponents/BackButton'
import LevelButton from '@/components/LevelButton'

export default function LevelsMenu() {
  return (
    <div className='levels-selection-container'>
      <BackButton />
      <h2>Level Selection</h2>
      <div className='levels-list'>
        {levels.map((level) => (
          <LevelButton key={level.index}>{level.level}</LevelButton>
        ))}
      </div>
    </div>
  )
}
