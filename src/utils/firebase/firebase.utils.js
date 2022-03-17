import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7-3Ssmd9bKD8F8yNFFTOJJ65Fkmq8Vsw",
  authDomain: "e-commerce-template-db.firebaseapp.com",
  projectId: "e-commerce-template-db",
  storageBucket: "e-commerce-template-db.appspot.com",
  messagingSenderId: "966011382252",
  appId: "1:966011382252:web:4907ad014a6e991935f8c9",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // if user data does not exist
  // create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      alert("error creating user", error.message);
    }
  }

  // if user data exists
  // return userDocRef
  return userDocRef;
  
};
