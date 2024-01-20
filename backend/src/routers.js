import { Router } from "express";
import { makeDeposit, makeWithdrawal, getBalance } from "./controllers.js";

const router = Router();

router.post("/deposito", makeDeposit);

router.post("/retiro", makeWithdrawal);

router.get("/saldo", getBalance);

export default router;
