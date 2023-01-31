'use client'
import SingleWord from './SingleWord';
import levelsData from '@/data/levels.json';
import WordsProvider from '@/contexts/WordsContext';

export default function Words({ level, difficulty }) {
  const words = levelsData[level - 1][difficulty];

  return (
    <WordsProvider>
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
    </WordsProvider>
  );
}
