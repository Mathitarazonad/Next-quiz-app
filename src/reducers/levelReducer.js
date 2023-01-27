import levelsData from '@/data/levels.json'

export const Levels = [
]

for (let i = 0; i < levelsData.length; i++) {
  Levels.push({
    'level' : i + 1,
    'isCompleted' : false,
    'completedDifficulties' : [] // 1-Easy  2-Normal  3-Hard
  })
}

export const levelReducer = (state, action) => {
  const {level, difficulty} = action;
  const currentLevel = state[level-1];


  switch(action) {
    case 'ADD_COMPLETED_DIFFICULTY': {
      currentLevel.completedDifficulties.push(difficulty);
      break;
    } 
    case 'SET_COMPLETED_LEVEL': {
      currentLevel.isCompleted = true;
      break;
    }
      
  }
}

