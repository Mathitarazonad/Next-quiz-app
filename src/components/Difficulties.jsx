import Link from "next/link"

export default function Difficulties({ level }) {
  return (
    <div className="difficulties-container">
      <Link href={`/levels/${level}/easy`}>
        <button className="difficulty easy">Easy</button>
      </Link>
      <Link href={`/levels/${level}/medium`}>
        <button className="difficulty medium">Medium</button>
      </Link>
      <Link href={`/levels/${level}/hard`}>
        <button className="difficulty hard">Hard</button>
      </Link>
    </div>
  )
}
