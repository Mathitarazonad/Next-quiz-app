import BackButton from '@/components/MenuComponents/BackButton'
import Difficulties from '@/components/Difficulties'
import IconsPair from '@/components/MenuComponents/IconsPair'
import UserCoins from '@/components/MenuComponents/UserCoins'

export default function Level({ params }) {
  const { level } = params

  return (
    <div className='card gap-3'>
      <IconsPair>
        <BackButton />
        <UserCoins />
      </IconsPair>
      <h1 className='text-4xl text-dark-violet-title font-bold'>Level {level}</h1>
      <Difficulties level={level} />
    </div>
  )
}
