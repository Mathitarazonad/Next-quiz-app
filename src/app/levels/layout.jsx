import ProtectedRoutes from '@/components/RegisterComponents/ProtectedRoutes'

export default function layout({ children }) {
  return (
    <ProtectedRoutes path='/login'>
      <div className='min-h-screen max-w-md flex items-center mx-auto px-7'>
        {children}
      </div>
    </ProtectedRoutes>
  )
}
