import express from "express";
import axios from "axios";
import { json } from "body-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandling";
import { RouteNotFoundError } from "./errors/routeNotFoundError";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

//import routes
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { currentUserRouter } from "./routes/currentUser";

const app = express();
//https
app.set("trust proxy", true);

// app.use(express.json());
app.use(json());
app.use(cors());

//creating the cookie
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);
app.use(currentUserRouter);

app.all("*", async () => {
  throw new RouteNotFoundError();
});

//error handling custom middleware
app.use(errorHandler);

//top level mongo await only allowed in latest ts
const startDB = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("succefully connected to mongo db auth");
  } catch (error) {
    console.log("error connecting with mongo db");
  }
};

startDB();

app.listen(3000, () => {
  console.log("auth listening on port 3000!");
});
