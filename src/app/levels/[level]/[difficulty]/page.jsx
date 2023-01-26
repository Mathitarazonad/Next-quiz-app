import BackButton from '@/components/BackButton';
import Words from '@/components/Words';

export default function page({ params }) {
  const {level, difficulty} = params;

  return (
    <div className='level-container'>
      <BackButton path={`/levels/${level}`} />
      <Words level={level} difficulty={difficulty}/>
    </div>
  )
}
