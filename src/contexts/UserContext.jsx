'use client'
import { createContext,useState, useContext, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@firebase/firebaseApp';

export const UserContext = createContext();

export default function UserProvider({children}) {
  const [currentUser, setCurrentUser] = useState(null);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(email, password);
  }

  const logout = () => signOut();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unsubscribe();
    };
  },[])

  const value = {
    currentUser,
    signUp,
    signIn,
    logout,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>)
}
