import SingleWord from '@/components/SingleWord';
import levels from '@/data/levels.json';

export default function page({params}) {
  const {level, difficulty} = params;
  const words = levels[level-1][difficulty];
  return (
    <div className='words-container'>
      {words.map(word => <SingleWord word={word}/>)}
    </div>
  )
}
