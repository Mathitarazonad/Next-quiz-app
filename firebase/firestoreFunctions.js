import { initialState } from '@/reducers/levelReducer'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { db } from './firebaseApp'

export const createUserDocument = async (username) => {
  await setDoc(doc(db, 'usersData', username), { ...initialState })
}

export const updateUserDocument = async (username, data) => {
  await setDoc(doc(db, 'usersData', username), { ...data })
}

export const getUserDocument = async (username) => {
  const documents = await getDoc(doc(db, 'usersData', username))
  return documents.data()
}

export const isUsernameValid = async (username) => {
  const documents = await getDoc(doc(db, 'usersData', username))
  return (documents.data() === undefined)
}
