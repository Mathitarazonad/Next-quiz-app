export default function LevelCompleted({ level }) {
  return (
    <div className='rounded-full bg-violet-500 bg-opacity-80 w-10 h-10 flex justify-center items-center border-[5px] border-violet-900 border-opacity-70'>
      <p className='text-sm text-white font-bold'>{level}</p>
    </div>
  )
}
