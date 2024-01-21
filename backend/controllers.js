import { Timestamp } from "firebase-admin/firestore";
import { firebaseDb as db } from "./lib/firebase.js";
import { formatTime } from "./lib/formatTime.js";

export const userRef = db.collection("users-transactions");

export const makeDeposit = async (req, res, next) => {
  const uid = req.uid;

  const { quantity } = req.body;
  let balance = 0;

  try {
    const docSnap = await db.collection("users-transactions").doc(uid).get();

    if (docSnap.exists) {
      balance = docSnap.data().balance;
    }

    const newTransaction = await db
      .collection("users-transactions")
      .doc(uid)
      .collection("transactions")
      .add({
        type: "DEPOSIT",
        quantity,
        date: Timestamp.fromDate(new Date()),
      });

    if (newTransaction)
      await db
        .collection("users-transactions")
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
  const uid = req.uid;
  const { quantity } = req.body;
  let balance = 0;

  try {
    const docSnap = await db.collection("users-transactions").doc(uid).get();

    if (docSnap.exists) {
      balance = docSnap.data().balance;
    }

    if (balance < quantity)
      return res.status(500).json({ message: "Fondos insuficientes" });

    const newTransaction = await db
      .collection("users-transactions")
      .doc(uid)
      .collection("transactions")
      .add({
        type: "WITHDRAWAL",
        quantity,
        date: Timestamp.fromDate(new Date()),
      });

    if (newTransaction)
      await db
        .collection("users-transactions")
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
  const uid = req.uid;
  let balance = 0;

  try {
    const docSnap = await db.collection("users-transactions").doc(uid).get();

    if (docSnap.exists) {
      balance = docSnap.data().balance;
    }
    return res.json({ balance });
  } catch (error) {
    return console.log(error);
  }
};

export const getLastTransactions = async (req, res, next) => {
  const uid = req.uid;
  // const uid = "ALJRFe9q0IR6wXcBzyNO1zCjAXw1";
  try {
    const docSnap = await db
      .collection("users-transactions")
      .doc(uid)
      .collection("transactions")
      .get();

    // console.log(formatTime(1705811000));

    const transactions = docSnap.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => b.date._seconds - a.date._seconds)
      .map((doc) => {
        return {
          id: doc.id,
          date: formatTime(doc.date._seconds),
          quantity: doc.quantity,
          type: doc.type,
        };
      })
      .slice(0, 10);

    // console.log(transactions);
    return res.status(200).send(transactions);
  } catch (error) {
    console.log(error);
  }
};
