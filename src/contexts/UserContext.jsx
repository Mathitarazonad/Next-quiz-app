'use client'
import { createContext, useState, useEffect, useContext } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { auth } from '@firebase/firebaseApp'
import { useRouter } from 'next/navigation'

export const UserContext = createContext()
export function UserAuth () {
  return useContext(UserContext)
}

export default function UserProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const router = useRouter()

  const signUp = async (username, email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser, { displayName: username })
  }

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login')
      }
      if (user) {
        setCurrentUser(user)
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
