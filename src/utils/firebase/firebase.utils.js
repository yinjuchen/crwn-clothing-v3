import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD93oXOFDvRAuI7tAnjTatMw4M_kCvim4o",
  authDomain: "crwn-db-v2-ce90e.firebaseapp.com",
  projectId: "crwn-db-v2-ce90e",
  storageBucket: "crwn-db-v2-ce90e.appspot.com",
  messagingSenderId: "35660226870",
  appId: "1:35660226870:web:3ff2a51aa165fe195e5397"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// there could be different provider ex GoogleAuthProvider, FeacebookAuthProvider that's why we name signInWithGoogleRedirect

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation= {}
) => {
  if(!userAuth) return
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)
  console.log(userSnapshot.exists())

  if (!userSnapshot.exists()) {
    // pull off displayName, email informtion
    const { displayName, email } = userAuth
    // set up a date new variable for user check in
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
      console.log('error createing the user', error.message)
    }
  }
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email || !password) return

  return await createUserWithEmailAndPassword(auth, email,password)

}

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email || !password) return
  return await signInWithEmailAndPassword(auth, email, password)
}