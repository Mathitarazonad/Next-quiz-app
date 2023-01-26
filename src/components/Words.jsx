import SingleWord from './SingleWord';
import levelsData from '@/data/levels.json';

export default function Words({ level, difficulty }) {
  const words = levelsData[level - 1][difficulty];

  return (
    <div className="words-container">
      {words.map((word) => (
        <SingleWord
          word={word}
          key={word}
          level={level}
          difficulty={difficulty}
        />
      ))}
    </div>
  );
}
