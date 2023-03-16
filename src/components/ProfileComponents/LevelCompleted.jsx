export default function LevelCompleted({ level }) {
  return (
    <div className='rounded-full bg-violet-600 bg-opacity-60 w-11 h-11 flex justify-center items-center border-[5px] border-dark-violet-title border-opacity-80 md:w-12 md:h-12'>
      <p className='text-lg md:text-[21px] text-white font-bold'>{level}</p>
    </div>
  )
}
