import express from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/requestValidationError";
import { BadRequestError } from "../errors/badRequestError";
import { User } from "../models/User";
import { PasswordManager } from "../services/passwordManager";
import jwt from "jsonwebtoken";

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
    const { email } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new BadRequestError("User Already Exists");
    }

    const hashedPassword = await PasswordManager.toHash(req.body.password);

    try {
      const createdUser = await User.create({
        email: req.body.email,
        password: hashedPassword,
      });

      //generate the jwt
      const userJwt = jwt.sign(
        {
          id: createdUser._id,
          email: createdUser.email,
        },
        "qwerty"
      );

      //store it in cookie --> can use req.session.jwt = userjwt but this is ts and it requires the definition
      req.session = {
        jwt: userJwt,
      };

      res.status(201).send(createdUser);
    } catch (err) {
      res.json({ status: "Error", error: err });
    }

    // const createdUser = new User({ email, password });

    //send success code
  }
);

export { router as signUpRouter };
