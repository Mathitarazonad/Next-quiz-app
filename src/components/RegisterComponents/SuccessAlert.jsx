export default function SuccessAlert ({ message }) {
  return (
    <div className='flex justify-between items-center bg-green-200 text-green-700 border-[.5px] border-green-700 font-bold w-full px-5 py-3 rounded-lg text-xs relative'>
      {message}
    </div>
  )
}
