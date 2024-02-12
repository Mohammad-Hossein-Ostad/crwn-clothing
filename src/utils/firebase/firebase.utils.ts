import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  NextOrObserver
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocs,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { Unsubscribe } from 'redux';
import { Category } from '../../store/categories/category.types';

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

export type objectToAdd = {
  title: string,
}

export const addCollectionAndDocuments = async<T extends objectToAdd>(
  collectionKey: string,
  objectsToAdd: T[],
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);

  return querySnapShot.docs.map(
    (docSnapShot) => docSnapShot.data() as Category
  );
};

export type AdditionalDetails = {
  displayName?: string
}

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalDetails = {} as AdditionalDetails,
): Promise<QueryDocumentSnapshot<UserData> | void> => {
  if (!userAuth) return;

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
        ...additionalDetails,
      });
    } catch (error) {
      console.log('Error creating user', error);
    }
  }

  return docSnap as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<UserCredential | void> => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential | void> => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async (): Promise<void> => await signOut(auth);

export const onAuthStateChangedListener = (
  callback: NextOrObserver<User>
): Unsubscribe => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unSubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unSubscribe();
        resolve(userAuth);
      },
      reject
    )
  })
}
