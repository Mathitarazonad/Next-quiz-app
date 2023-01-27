import levelsData from '@/data/levels.json';
import types from './types';

export const initialState = [];

for (let i = 0; i < levelsData.length; i++) {
  initialState.push({
    level: i + 1,
    isCompleted: false,
    completedDifficulties: [], // 1-Easy  2-Normal  3-Hard
  });
}

export const levelReducer = (state, action) => {
  const { level, difficulty } = action.payload;
  const currentLevel = state[level - 1];

  switch (action.type) {
    case types.completeDifficulty: {
      const newDifficulties = [
        ...currentLevel.completedDifficulties,
        difficulty,
      ];
      state.map((lvl, index) =>
        index === level - 1 
          ? {
              level: lvl.level,
              isCompleted: lvl.isCompleted,
              completedDifficulties: newDifficulties,
            }
          : lvl
      );
    }
    case types.completeLevel: {
      const newState = !currentLevel.isCompleted;
      return state.map((lvl, index) => index === level-1 ? {
        level: lvl.level,
        isCompleted: newState,
        completedDifficulties: newDifficulties,
      } : lvl)
    }
    default:
      return state;
  }
};
