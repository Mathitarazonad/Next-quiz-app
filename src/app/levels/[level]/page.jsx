import Difficulties from "@/components/Difficulties";

export default function Level({ params }) {
  const { level } = params;

  return (
    <div className="level-container">
      <h2>Level {level}</h2>
      <Difficulties level={level}/>
    </div>
  );
}
