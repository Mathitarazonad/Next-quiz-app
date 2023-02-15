'use client'
import { UserAuth } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoutes ({ children, path, authentication = false }) {
  const { currentUser } = UserAuth()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser && !authentication) {
      router.push(path)
    } else if (currentUser && authentication) {
      router.push(path)
    }
  }, [currentUser, path, router, authentication])

  return (
    <>
      {authentication && !currentUser ? children : authentication && currentUser ? null : currentUser ? children : null}
    </>
  )
}
