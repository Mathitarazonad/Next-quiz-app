import BackButton from '@/components/MenuComponents/BackButton'
import Words from '@/components/GameComponents/Words'
import levelsData from '@/data/levels.js'
import UserCoins from '@/components/MenuComponents/UserCoins'
import IconsPair from '@/components/MenuComponents/IconsPair'
import CurrentLevelProvider from '@/contexts/CurrentLevelContext'

export default function Page({ params }) {
  const { level, difficulty } = params

  return (
    <div className='card gap-2 p-7'>
      <CurrentLevelProvider>
        <IconsPair>
          <BackButton />
          <UserCoins />
        </IconsPair>
        <h1 className='text-4xl text-dark-violet-title font-bold'>Level {level}</h1>
        <h2 className='text-2xl font-bold text-semi-dark-violet capitalize mb-1'>Hint: {levelsData[level - 1].topic}</h2>
        <h3 className='text-xl font-bold text-semi-dark-violet capitalize mb-1'>{difficulty}</h3>
        <Words level={parseInt(level)} difficulty={difficulty} />
      </CurrentLevelProvider>
    </div>
  )
}

export async function generateStaticParams() {
  const difficulties = ['easy', 'medium', 'hard']
  return difficulties
    .map((diff) =>
      levelsData.map((lvl) => ({
        level: lvl.level.toString(),
        difficulty: diff
      }))
    )
    .flat()
}
