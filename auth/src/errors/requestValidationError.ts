import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();

    //Because error is system class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
