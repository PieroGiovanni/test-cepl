import axios from "axios";
const { VITE_DEV_API_URL, VITE_PROD_API_URL, MODE } = import.meta.env;

const instance = axios.create({
  baseURL: MODE === "development" ? VITE_DEV_API_URL : VITE_PROD_API_URL,
  withCredentials: true,
});

export default instance;
