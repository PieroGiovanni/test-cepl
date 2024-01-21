import { auth } from "../lib/firebase.js";

export const isAuth = async (req, res, next) => {
  try {
    const decodedToken = await auth.verifyIdToken(req.headers.authtoken);
    if (decodedToken) {
      req.uid = decodedToken.uid;
    }
    return next();
  } catch (error) {
    return res.status(500).send({ message: "Token Inválido" });
  }
};
