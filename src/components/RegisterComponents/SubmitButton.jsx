export default function SubmitButton({children}) {
  return (
    <button
      type='submit'
      className='bg-violet-500 bg-opacity-90 w-full py-1 rounded-md text-white font-semibold'
    >
      {children}
    </button>
  )
}
