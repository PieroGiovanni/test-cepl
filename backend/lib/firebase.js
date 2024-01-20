import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../firebaseConfig.json" assert { type: "json" };

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export const firebaseDb = getFirestore();
export const auth = getAuth();
