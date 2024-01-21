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

router.get("/ultimas-transacciones", isAuth, getLastTransactions);

export default router;
