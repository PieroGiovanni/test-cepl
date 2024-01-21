import axios from "./axios";

export const getBalance = async (token) => {
  return axios.get("/saldo", { headers: { authtoken: token } });
};

export const makeDeposit = async (token, data) => {
  return axios.post("/deposito", data, { headers: { authtoken: token } });
};

export const makeWithdrawal = async (token, data) => {
  return axios.post("/retiro", data, { headers: { authtoken: token } });
};

export const getLastTransactions = async (token) => {
  return axios.get("/ultimas-transacciones", { headers: { authtoken: token } });
};
