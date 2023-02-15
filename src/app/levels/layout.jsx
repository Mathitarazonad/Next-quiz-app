import ProtectedRoutes from '@/components/RegisterComponents/ProtectedRoutes'

export default function layout({ children }) {
  return <ProtectedRoutes path='/login'>{children}</ProtectedRoutes>
}
