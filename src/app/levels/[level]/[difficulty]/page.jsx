import BackButton from '@/components/MenuComponents/BackButton'
import Words from '@/components/GameComponents/Words'
import levelsData from '@/data/levels.json'

export default function Page({ params }) {
  const { level, difficulty } = params

  return (
    <div className='level-container'>
      <BackButton />
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
