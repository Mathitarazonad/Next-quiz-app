'use client'
import { useLevels } from '@/contexts/LevelsContext'
import { useUser } from '@/contexts/UserContext'
import types from '@/reducers/types'
import { getUserDocument } from '@firebase/firestoreFunctions'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoutes({ children, path, authentication = false }) {
  const { currentUser, userChecked } = useUser()
  const { dispatch } = useLevels()
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

  useEffect(() => {
    if (userChecked && currentUser) {
      if (currentUser.displayName) {
        getUserDocument(currentUser.displayName).then(userData => dispatch({
          type: types.setUserData,
          payload: { userData: Object.values(userData) }
        }))
      }
    }
  }, [currentUser, userChecked])

  return (
    <>
      {authentication && !currentUser && userChecked ? children
        : authentication && currentUser ? null
          : currentUser ? children
            : null}
    </>
  )
}
