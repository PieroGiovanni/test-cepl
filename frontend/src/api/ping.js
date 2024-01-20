import axios from "./axios";
import { auth } from "../lib/firebaseConfig";

// const user = auth.currentUser;

export const getPing = async (token) => {
  console.log(auth.currentUser);
  return axios.get("/ping", {
    headers: { authtoken: token },
  });
};
