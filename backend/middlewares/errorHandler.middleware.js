import {
  ValidationError,
  ForbiddenError,
  NotFoundError,
} from "../lib/errors.js";

export const errorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.status(error.statusCode).json({
      type: error.name,
      message: error.message,
      errors: error.errors,
    });
  }

  if (error instanceof ForbiddenError) {
    return res.status(error.statusCode).json({
      type: error.name,
      message: error.message,
    });
  }

  if (error instanceof NotFoundError) {
    return res.status(error.statusCode).json({
      type: error.name,
      message: error.message,
    });
  }

  return res.status(500).json({ message: "Ocurrió un error" });
};
