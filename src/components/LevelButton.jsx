import CompletedDifficulties from "./CompletedDifficulties";

export default function LevelButton({children}) {
  return (
    <div className='single-level-button'>
      {children}
      <CompletedDifficulties level={children} />
    </div>
  )
}
