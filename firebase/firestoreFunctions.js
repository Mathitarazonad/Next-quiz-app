import { initialState } from '@/reducers/levelReducer'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { db } from './firebaseApp'

export const createUserDocument = async (username) => {
  await setDoc(doc(db, 'usersData', username), { levels: initialState, coins: 0 })
}

export const updateUserLevels = async (username, data) => {
  await setDoc(doc(db, 'usersData', username), { levels: data }, { merge: true })
}

export const updateUserCoins = async (username, coins) => {
  await setDoc(doc(db, 'usersData', username), { coins }, { merge: true })
}

export const getUserDocument = async (username) => {
  const documents = await getDoc(doc(db, 'usersData', username))
  return documents.data()
}

export const isUsernameValid = async (username) => {
  const documents = await getDoc(doc(db, 'usersData', username))
  return (documents.data() === undefined)
}
