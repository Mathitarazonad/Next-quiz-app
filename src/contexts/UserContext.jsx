'use client'
import { createContext, useState, useEffect, useContext } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  reauthenticateWithCredential,
  getAuth,
  EmailAuthProvider,
  updateEmail,
  updatePassword
} from 'firebase/auth'
import { auth } from '@firebase/firebaseApp'
import { useRouter, usePathname } from 'next/navigation'

export const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const router = useRouter()
  const currentPath = usePathname()
  // This prevents to push to a path in the protected routes context before the user is checked if it is logged in
  const [userChecked, setUserChecked] = useState(false)

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

  const changeEmail = async (currentPassword, email) => {
    const user = getAuth().currentUser
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    )
    await reauthenticateWithCredential(user, credential)
    await updateEmail(user, email)
    logout()
  }

  const changePassword = async (currentPassword, newPassword) => {
    const user = getAuth().currentUser
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    )
    await reauthenticateWithCredential(user, credential)
    await updatePassword(user, newPassword)
    logout()
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserChecked(true)
      if (!user) {
        setCurrentUser(null)
        if (currentPath !== '/login' && currentPath !== '/register') {
          router.push('/login')
        }
      }
      if (user) {
        setCurrentUser({
          displayName: user.displayName,
          email: user.email
        })
        if (currentPath === '/login' || currentPath === '/register') {
          router.push('/')
        }
      }
    })
    return () => {
      unsubscribe()
    }
  }, [router, currentPath])

  const value = {
    currentUser,
    signUp,
    signIn,
    logout,
    changeEmail,
    userChecked,
    changePassword
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
