// import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseDb as db } from "./lib/firebase.js";

export const userRef = db.collection("user-transactions");

export const makeDeposit = async (req, res, next) => {
  //   const uid = req.res.user.uid;
  const uid = "USUARIO6";
  const quantity = 400;
  let balance = 0;

  try {
    const docSnap = await db
      .collection("user-transactions", uid)
      .doc(uid)
      .get();

    if (docSnap.exists) {
      balance = docSnap.data().balance;
    }

    const newTransaction = await db
      .collection("user-transactions")
      .doc(uid)
      .collection("transaction")
      .add({
        type: "DEPOSIT2",
        quantity,
      });

    if (newTransaction)
      await db
        .collection("user-transactions")
        .doc(uid)
        .set({
          balance: balance + quantity,
        });

    return res.status(200).json({
      message: "Depósito exitoso",
    });
  } catch (error) {
    return console.error("Error adding document: ", error);
  }
};

export const makeWithdrawal = async (req, res, next) => {
  const uid = "USUARIO6";
  const quantity = 200;
  let balance = 0;

  try {
    const docSnap = await db
      .collection("user-transactions", uid)
      .doc(uid)
      .get();

    if (docSnap.exists) {
      balance = docSnap.data().balance;
    }

    if (balance < quantity)
      return res.status(500).json({ message: "Fondos insuficientes" });

    const newTransaction = await db
      .collection("user-transactions")
      .doc(uid)
      .collection("transaction")
      .add({
        type: "WITHDRAWAL2",
        quantity,
      });

    if (newTransaction)
      await db
        .collection("user-transactions")
        .doc(uid)
        .set({
          balance: balance - quantity,
        });

    return res.status(200).json({
      message: "Retiro exitoso",
    });
  } catch (error) {
    return console.error("Error adding document: ", error);
  }
};

export const getBalance = async (req, res, next) => {
  const uid = "USUARIO6";
  let balance = 0;

  try {
    const docSnap = await db
      .collection("user-transactions", uid)
      .doc(uid)
      .get();

    if (docSnap.exists) {
      balance = docSnap.data().balance;
    }
    return res.json({ balance });
  } catch (error) {
    return console.log(error);
  }
};
