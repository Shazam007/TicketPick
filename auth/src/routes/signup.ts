import express from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/requestValidationError";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 15 })
      .withMessage("password should minimum 4 and maximum 15"),
  ],
  (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      //there are errors
      throw new RequestValidationError(errors.array());
    }

    // throw new Error("db error");
    res.send("user succefully added");
  }
);

export { router as signUpRouter };
