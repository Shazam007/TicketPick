import express from "express";
import axios from "axios";
import { json } from "body-parser";
import cors from "cors";

//import routes
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/signout";
import { signOutRouter } from "./routes/signup";
import { currentUserRouter } from "./routes/current-user";

const app = express();

// app.use(express.json());
app.use(json());
app.use(cors());

app.get("/api/users/currentuser", (req, res) => {
  res.send("now workinsadsg latest");
});

app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);
app.use(currentUserRouter);

app.listen(3000, () => {
  console.log("auth listening on port 3000!");
});
