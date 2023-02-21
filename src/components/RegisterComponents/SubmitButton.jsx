export default function SubmitButton ({ children }) {
  return (
    <button
      type='submit'
      className='bg-violet-500 bg-opacity-90 w-full py-[6px] rounded-md text-white text-sm font-semibold'
    >
      {children}
    </button>
  )
}
