// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,

} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSwy2hs8BDTD1wnQPTJrL9I5AVCMCDW4g",
  authDomain: "crwn-clothing-v3-5a84c.firebaseapp.com",
  projectId: "crwn-clothing-v3-5a84c",
  storageBucket: "crwn-clothing-v3-5a84c.appspot.com",
  messagingSenderId: "112508459642",
  appId: "1:112508459642:web:1a496763ccd8e010b9f9c3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()
export const createUserDocumentFromAuth = async (
  userAuth, additionalInformation = {}) => {
  if (!userAuth) return
  const userDocref = doc(db, 'users', userAuth.uid)
  console.log(userDocref)

  const userSnapshot = await getDoc(userDocref)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createAt = new Date()
    try {
      await setDoc(userDocref, {
        displayName,
        email,
        createAt,
        ...additionalInformation
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
    return userDocref
  }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback)