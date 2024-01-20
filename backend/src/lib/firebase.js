import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../firebaseConfig.json" assert { type: "json" };

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export const firebaseDb = getFirestore();
