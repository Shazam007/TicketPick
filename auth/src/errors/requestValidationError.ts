import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();

    //Because error is system class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  //error handling logic
  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
