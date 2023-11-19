import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDzlfNZjG4MqE3wU4H_Gbl8cusXPLEWWg8',
  authDomain: 'crwn-clothing-db-aca90.firebaseapp.com',
  projectId: 'crwn-clothing-db-aca90',
  storageBucket: 'crwn-clothing-db-aca90.appspot.com',
  messagingSenderId: '633318468216',
  appId: '1:633318468216:web:76ece377d4392862b85b8d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Google authentication
const provider = new GoogleAuthProvider();

// Initialize Cloud firestore to get a reference from db
const db = getFirestore(app);

provider.setCustomParameters({
  prompt: 'select_account',
});

// Initialize Firebase Authentication and get reference to the server
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createUserDocumentFromAuth = async (userAuth) => {
  // Docuemnt reference
  const userDocumentRef = doc(db, 'users', userAuth.uid);
  // Retrive data
  const docSnap = await getDoc(userDocumentRef);

  if (!docSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // Add a new document in collection 'users'
    try {
      await setDoc(userDocumentRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userDocumentRef;
};
