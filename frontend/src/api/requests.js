import axios from "./axios";

export const getBalance = async (token) => {
  return axios.get("/saldo", { headers: { authtoken: token } });
};

export const makeDeposit = async (token, data) => {
  return axios.post("/deposito", data, { headers: { authtoken: token } });
};