import express from "express";
import axios from "axios";
import { json } from "body-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandling";
import { RouteNotFoundError } from "./errors/routeNotFoundError";
import "express-async-errors";
//import routes
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { currentUserRouter } from "./routes/currentUser";

const app = express();

// app.use(express.json());
app.use(json());
app.use(cors());

// app.get("/api/users/currentuser", (req, res) => {
//   res.send("now workinsadsg latsdaest");
// });

app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);
app.use(currentUserRouter);

app.all("*", async () => {
  throw new RouteNotFoundError();
});

//error handling custom middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log("auth listening on port 3000!");
});
