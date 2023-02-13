import BackButton from '@/components/BackButton';
import Words from '@/components/GameComponents/Words';

export default function page({ params }) {
  const { level, difficulty } = params;

  return (
    <div className='level-container'>
      <BackButton path={`/levels/${level}`} />
      <Words level={parseInt(level)} difficulty={difficulty} />
    </div>
  );
}
