// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_APP_DOMAIN,
  projectId: "next-quiz-app-38abe",
  storageBucket: "next-quiz-app-38abe.appspot.com",
  messagingSenderId: "419437706768",
  appId: "1:419437706768:web:b1726c08f002cb12621495",
  measurementId: "G-QWYJ24BNM9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);