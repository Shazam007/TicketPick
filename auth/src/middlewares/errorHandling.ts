import express from "express";
import { RequestValidationError } from "../errors/requestValidationError";

export const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({ errors: [{ message: "something went wrong" }] });
};
