import LevelButton from '@/components/LevelButton';
import levels from '../../data/levels.json';

export default function LevelsMenu() {
  return (
    <div className='levels-menu-container'>
      <h2>Level Selection</h2>
      <div className='levels-list'>
        {levels.map(level => <LevelButton key={level.index}>{level.level}</LevelButton>)}
      </div>
    </div>
  )
}
