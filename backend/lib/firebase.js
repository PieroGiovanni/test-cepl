import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDb = getFirestore(firebaseApp);

export const initializeFirebaseApp = () => {
  try {
    firebaseApp;
    firebaseDb;
    console.log("Firebase connected");
    return firebaseApp;
  } catch (error) {
    console.log(error);
  }
};

export const getTestData = async () => {
  try {
    const docSnap = await getDocs(collection(firebaseDb, "test-collection"));
    const finalData = [];
    docSnap.forEach((doc) => {
      finalData.push(doc.data());
    });

    console.log(finalData);
  } catch (error) {
    console.log(error);
  }
};

export const updateTestData = async () => {
  try {
    const docRef = await addDoc(collection(firebaseDb, "test-collection"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const getFirebaseApp = () => firebaseApp;
