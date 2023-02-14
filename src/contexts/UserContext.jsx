'use client'
import { createContext, useState, useEffect, useContext } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '@firebase/firebaseApp'
import { useRouter } from 'next/navigation'

export const UserContext = createContext()
export function UserAuth () {
  return useContext(UserContext)
}

export default function UserProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const router = useRouter()

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      if (!user) {
        router.push('/login')
      }
      if (user) {
        router.push('/')
      }
    })
    return () => {
      unsubscribe()
    }
  }, [router])

  const value = {
    currentUser,
    signUp,
    signIn,
    logout
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
