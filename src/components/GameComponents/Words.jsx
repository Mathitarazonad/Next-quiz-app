import SingleWord from './SingleWord'
import levelsData from '@/data/levels.json'
import WordsProvider from '@/contexts/WordsContext'
import { UseLevels } from '@/contexts/LevelsContext'
import LevelUnlocked from '../LevelUnlocked'

export default function Words ({ level, difficulty }) {
  const words = levelsData[level - 1][difficulty]
  const { newLevelUnlocked } = UseLevels

  return (
    <WordsProvider>
      <div className={words[0].length > 6 ? 'flex flex-col gap-2' : 'flex flex-col gap-3'}>
        {words.map((word) => (
          <SingleWord
            word={word}
            key={word}
            level={level}
            difficulty={
              difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3
            }
          />
        ))}
        {newLevelUnlocked && <LevelUnlocked />}{' '}
        {/* Alert the user that a new level has been unlocked */}
      </div>
    </WordsProvider>
  )
}
