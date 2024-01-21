import { Router } from "express";
import {
  makeDeposit,
  makeWithdrawal,
  getBalance,
  getLastTransactions,
} from "./controllers.js";
import { isAuth } from "./middlewares/isAuth.middleware.js";

const router = Router();

router.post("/deposito", isAuth, makeDeposit);

router.post("/retiro", isAuth, makeWithdrawal);

router.get("/saldo", isAuth, getBalance);

router.get("/ping", isAuth, (req, res) => {
  try {
    console.log(req.headers.authtoken);
    return res.send("pong");
  } catch (error) {
    return res.status(500).send("errorasdfadsf");
  }
});

router.get("/ultimas-transacciones", isAuth, getLastTransactions);

export default router;
