import { Timestamp } from "firebase-admin/firestore";
import { firebaseDb as db } from "./lib/firebase.js";
import { formatTime } from "./lib/formatTime.js";
import { ValidationError } from "./lib/errors.js";
import { quantityValidator } from "./lib/zodSchema.js";

export const makeDeposit = async (req, res, next) => {
  const uid = req.uid;

  let balance = 0;

  const { quantity } = req.body;

  try {
    const result = quantityValidator.safeParse({ quantity });
    if (!result.success)
      return next(
        new ValidationError(
          "Transacción Inválida",
          400,
          result.error.format().quantity._errors
        )
      );

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
    next(error);
  }
};

export const makeWithdrawal = async (req, res, next) => {
  const uid = req.uid;
  const { quantity } = req.body;
  let balance = 0;

  try {
    const result = quantityValidator.safeParse({ quantity });

    if (!result.success)
      return next(
        new ValidationError(
          "Transacción Inválida",
          400,
          result.error.format().quantity._errors
        )
      );

    const docSnap = await db.collection("users-transactions").doc(uid).get();

    if (docSnap.exists) {
      balance = docSnap.data().balance;
    }

    if (balance < quantity)
      return next(new ValidationError("Fondos insuficientes"));

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
    next(error);
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
    return res.status(200).json({ balance });
  } catch (error) {
    return next(error);
  }
};

export const getLastTransactions = async (req, res, next) => {
  const uid = req.uid;
  try {
    const docSnap = await db
      .collection("users-transactions")
      .doc(uid)
      .collection("transactions")
      .get();

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

    return res.status(200).send(transactions);
  } catch (error) {
    next(error);
  }
};
