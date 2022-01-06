import express from "express";
import { RequestValidationError } from "../errors/requestValidationError";

export const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (err instanceof RequestValidationError) {
    res.status(400).send({ Error: err.message });
  }
};
