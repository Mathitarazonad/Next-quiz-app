import levels from '@/data/levels.json';
import SingleWord from '@/components/SingleWord';
import BackButton from '@/components/BackButton';

export default function page({params}) {
  const {level, difficulty} = params;
  const words = levels[level-1][difficulty];

  return (
    <div className='words-container'>
      <BackButton path={`/levels/${level}`} />
      {words.map(word => <SingleWord word={word}/>)}
    </div>
  )
}
