'use client'
import { createContext, useState, useEffect, useContext } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset
} from 'firebase/auth'
import { auth } from '@firebase/firebaseApp'
import { useRouter, usePathname } from 'next/navigation'
import { createUserDocument } from '@firebase/firestoreFunctions'

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
    await createUserDocument(auth.currentUser.displayName)
  }

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const changeEmail = async (currentPassword, email) => {
    const user = auth.currentUser
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    )
    await reauthenticateWithCredential(user, credential)
    await updateEmail(user, email)
    logout()
  }

  const changePassword = async (currentPassword, newPassword) => {
    const user = auth.currentUser
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    )
    await reauthenticateWithCredential(user, credential)
    await updatePassword(user, newPassword)
    logout()
  }

  const sendEmailOfPasswordReset = async (email) => {
    await sendPasswordResetEmail(auth, email)
  }

  const isValidPasswordResetCode = async (code) => {
    try {
      await verifyPasswordResetCode(auth, code)
      return true
    } catch (error) {
      return false
    }
  }

  const confirmNewPasswordReset = async (code, password) => {
    return await confirmPasswordReset(auth, code, password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserChecked(true)
      if (!user) {
        setCurrentUser(null)
      }
      if (user) {
        setCurrentUser({
          displayName: user.displayName,
          email: user.email
        })
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
    changePassword,
    sendEmailOfPasswordReset,
    isValidPasswordResetCode,
    confirmNewPasswordReset
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
