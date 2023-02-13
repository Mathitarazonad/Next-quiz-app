import { IoMdClose } from 'react-icons/io';

export default function Alert ({message, handleCloseError,}) {
  return (
    <div className='flex justify-between items-center bg-red-300 text-red-700 border-[.5px] border-red-700 font-bold w-full px-5 py-3 rounded-lg text-xs relative'>
      {message}
      <IoMdClose className='text-sm' onClick={handleCloseError}/>
    </div>
  );
}
