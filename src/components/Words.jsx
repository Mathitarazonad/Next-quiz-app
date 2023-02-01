'use client'
import SingleWord from './SingleWord';
import levelsData from '@/data/levels.json';
import WordsProvider from '@/contexts/WordsContext';
import { useContext } from 'react';
import { LevelsContext } from '@/contexts/LevelsContext';
import LevelUnlocked from './LevelUnlocked';

export default function Words({ level, difficulty }) {
  const words = levelsData[level - 1][difficulty];
  const {newLevelUnlocked} = useContext(LevelsContext);

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
        {newLevelUnlocked && <LevelUnlocked />} {/*Alert the user that a new level has been unlocked*/}
      </div>
    </WordsProvider>
  );
}
