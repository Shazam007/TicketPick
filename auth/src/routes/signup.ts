import express from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/requestValidationError";
import { BadRequestError } from "../errors/badRequestError";
import { User } from "../models/User";

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
  async (req: express.Request, res: express.Response) => {
    //get errors from express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //there are errors
      throw new RequestValidationError(errors.array());
    }

    //get body data
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new BadRequestError("User Already Exists");
    }

    try {
      const createdUser = await User.create({
        email: req.body.email,
        password: req.body.password,
      });
      res.status(201).send(createdUser);
    } catch (err) {
      res.json({ status: "Error", error: err });
    }

    // const createdUser = new User({ email, password });

    //send success code
  }
);

export { router as signUpRouter };
