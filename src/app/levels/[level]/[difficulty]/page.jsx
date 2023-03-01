import BackButton from '@/components/MenuComponents/BackButton'
import Words from '@/components/GameComponents/Words'
import levelsData from '@/data/levels.json'
import UserCoins from '@/components/MenuComponents/UserCoins'

export default function Page({ params }) {
  const { level, difficulty } = params

  return (
    <div className='card gap-2 p-7'>
      <BackButton />
      <UserCoins />
      <h1 className='text-4xl text-dark-violet-title font-bold'>Level {level}</h1>
      <h2 className='text-lg font-bold text-semi-dark-violet capitalize mb-1'>{difficulty}</h2>
      <Words level={parseInt(level)} difficulty={difficulty} />
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
