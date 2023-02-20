'use client'
import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoutes({ children, path, authentication = false }) {
  const { currentUser, userChecked } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (userChecked) {
      if (!currentUser && !authentication) {
        router.push(path)
      } else if (currentUser && authentication) {
        router.push(path)
      }
    }
  }, [currentUser, path, router, authentication, userChecked])

  return (
    <>
      {authentication && !currentUser && userChecked ? children : authentication && currentUser ? null : currentUser ? children : null}
    </>
  )
}
