import { ForbiddenError } from "../lib/errors.js";
import { auth } from "../lib/firebase.js";

export const isAuth = async (req, res, next) => {
  try {
    if (!req.headers.authtoken)
      return next(new ForbiddenError("Falta token, acceso denegado"));
    const decodedToken = await auth.verifyIdToken(req.headers.authtoken);
    if (decodedToken) {
      req.uid = decodedToken.uid;
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
