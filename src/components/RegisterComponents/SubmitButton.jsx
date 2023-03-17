export default function SubmitButton ({ children, isDisabled = false }) {
  return (
    <button
      type='submit'
      disabled={isDisabled}
      className='bg-violet-500 bg-opacity-90 w-full py-[6px] rounded-md text-white text-sm font-semibold hover:bg-violet-400 duration-300'
    >
      {children}
    </button>
  )
}
