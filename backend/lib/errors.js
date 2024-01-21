export class ValidationError extends Error {
  constructor(message = "Datos incorrectos", statusCode = 400, errors) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Acceso denegado", statusCode = 403) {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends Error {
  constructor(message = "No se encontró", statusCode = 404) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = statusCode;
  }
}
