import levelsData from '@/data/levels.js'
import types from './types'

export const initialState = levelsData.map((level, index) => ({
  level: level.level,
  isUnlocked: index === 0,
  isCompleted: false,
  completedDifficulties: []
}))

export const levelReducer = (state, action) => {
  switch (action.type) {
    case types.completeDifficulty: {
      const { level, difficulty } = action.payload
      const currentLevel = state[level - 1]
      const newDifficulties = [
        ...currentLevel.completedDifficulties,
        difficulty
      ]
      return state.map((lvl, index) =>
        index === level - 1
          ? {
              ...lvl,
              completedDifficulties: newDifficulties
            }
          : lvl
      )
    }
    case types.completeLevel: {
      const { level } = action.payload
      const currentLevel = state[level - 1]
      const newState = !currentLevel.isCompleted
      return state.map((lvl, index) =>
        index === level - 1
          ? {
              ...lvl,
              isCompleted: newState
            }
          : lvl
      )
    }
    case types.unlockLevel: {
      const { level } = action.payload
      const newState = true
      return state.map((lvl, index) =>
        index === parseInt(level) // level === index + 1 (Next level)
          ? {
              ...lvl,
              isUnlocked: newState
            }
          : lvl
      )
    }
    case types.setUserData: {
      const { userData } = action.payload
      return userData
    }
    default:
      return state
  }
}
