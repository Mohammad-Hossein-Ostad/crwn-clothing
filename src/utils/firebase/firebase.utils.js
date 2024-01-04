import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocs,
  setDoc,
  collection,
  writeBatch,
  query,
} from 'firebase/firestore';

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
const googleProvider = new GoogleAuthProvider();

// Initialize Cloud firestore to get a reference from db
const db = getFirestore(app);

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Initialize Firebase Authentication and get reference to the server
export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);

  return querySnapShot.docs.map((docSnapShot) => docSnapShot.data());
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {},
) => {
  if (!userAuth) return;

  // Docuemnt reference
  const userDocumentRef = doc(db, 'users', userAuth.uid);

  // Retrive data
  const docSnap = await getDocs(userDocumentRef);

  if (!docSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // Add a new document in collection 'users'
    try {
      await setDoc(userDocumentRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userDocumentRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
