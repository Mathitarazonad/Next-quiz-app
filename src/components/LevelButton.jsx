import CompletedDifficulties from "./CompletedDifficulties";
import Link from "next/link";

export default function LevelButton({children}) {
  return (
    <Link href={`/levels/${children}`}>
      <div className='single-level-button'>
        {children}
        <CompletedDifficulties level={children} />
      </div>
    </Link>
  )
}
