import { CustomError } from "./customError";

export class RouteNotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Route not found");
    Object.setPrototypeOf(this, RouteNotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: "Route Not Found" }];
  }
}
