import { initialState } from '@/reducers/levelReducer'
import { setDoc, updateDoc, doc, getDoc } from 'firebase/firestore'
import { db } from './firebaseApp'

export const createUserDocument = async (username) => {
  await setDoc(doc(db, 'usersData', username), { levels: initialState, coins: 5 })
}

export const updateUserLevels = async (username, data) => {
  await updateDoc(doc(db, 'usersData', username), { levels: data })
}

export const updateUserCoins = async (username, coins) => {
  await updateDoc(doc(db, 'usersData', username), { coins })
}

export const getUserDocument = async (username) => {
  const documents = await getDoc(doc(db, 'usersData', username))
  return documents.data()
}

export const isUsernameValid = async (username) => {
  const documents = await getDoc(doc(db, 'usersData', username))
  return (documents.data() === undefined)
}
