import levels from '@/data/levels.json'
import BackButton from '@/components/MenuComponents/BackButton'
import LevelSelector from '@/components/LevelSelector'
import LogoutButton from '@/components/MenuComponents/LogoutButton'
import IconsPair from '@/components/MenuComponents/IconsPair'

export default function LevelsMenu() {
  return (
    <div className='card gap-3 px-7'>
      <IconsPair>
        <BackButton />
        <LogoutButton />
      </IconsPair>
      <h1 className='text-3xl text-dark-violet-title font-bold'>Levels</h1>
      <div className='flex gap-3 flex-wrap justify-center'>
        {levels.map((level) => (
          <LevelSelector key={level.index}>{level.level}</LevelSelector>
        ))}
      </div>
    </div>
  )
}
