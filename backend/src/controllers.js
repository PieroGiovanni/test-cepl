import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseDb } from "./lib/firebase.js";

export const makeDeposit = async (req, res, next) => {
  //   const uid = req.res.user.uid;
  const uid = "USUARIO6";
  const quantity = 400;
  let balance = 0;

  try {
    const userDocRef = doc(firebaseDb, "user-transactions", uid);

    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      balance = docSnap.data().balance;
    }

    const transactionDocRef = await addDoc(
      collection(firebaseDb, "user-transactions", uid, "transaction"),
      {
        type: "DEPOSIT",
        quantity: quantity,
      }
    );

    await setDoc(doc(firebaseDb, "user-transactions", uid), {
      balance: balance + quantity,
    });
    console.log("Transacción completada, ID: ", transactionDocRef.id);

    res.status(200).json({
      message: "Transacción completada, ID: " + transactionDocRef.id,
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const makeWithdrawal = async (req, res, next) => {
  //   const uid = req.res.user.uid;
  const uid = "USUARIO6";
  const quantity = 100;
  let balance = 0;

  try {
    const userDocRef = doc(firebaseDb, "user-transactions", uid);

    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      balance = docSnap.data().balance;
    }

    if (balance < quantity)
      return res.status(500).json({ message: "Fondos insuficientes" });

    const transactionDocRef = await addDoc(
      collection(firebaseDb, "user-transactions", uid, "transaction"),
      {
        type: "WITHDRAWAL",
        quantity: quantity,
      }
    );

    await setDoc(doc(firebaseDb, "user-transactions", uid), {
      balance: balance - quantity,
    });
    console.log("Transacción completada, ID: ", transactionDocRef.id);

    res.status(200).json({
      message: "Transacción completada, ID: " + transactionDocRef.id,
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const getBalance = async (req, res, next) => {
  const uid = "USUARIO6";
  let balance;

  try {
    const userDocRef = doc(firebaseDb, "user-transactions", uid);

    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      balance = docSnap.data().balance;
      res.status(200).json({
        saldo: balance,
      });
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
