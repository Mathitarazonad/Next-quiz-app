export default function SingleHability({ handleAbility, cost, ability, abilityDescription }) {
  return (
    <div className='flex flex-col items-center justify-center gap-1 relative flex-1'>
      <p className='rounded-full border-[5px] border-coin-border border-opacity-60 bg-coin-background w-[45px] h-[45px] text-xl flex items-center justify-center text-white tracking-wide font-bold overflow-hidden relative after:absolute after:content-[""] after:top-0 after:-left-7 after:w-1/2 after:h-full after:skew-x-[-30deg] after:bg-gray-200 after:bg-opacity-30 select-none hover:after:animate-coin-shine hover:animate-coin-pulse cursor-pointer' onClick={() => handleAbility(cost, ability)}>
        {cost}
      </p>
      <p className='text-xs text-center font-bold text-semi-dark-violet w-[90%]'>{abilityDescription}</p>
    </div>
  )
}
