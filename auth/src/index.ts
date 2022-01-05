import express from "express";
import axios from "axios";
import { json } from "body-parser";
import cors from "cors";

const app = express();

// app.use(express.json());
app.use(json());
app.use(cors());

app.get("/api/users/currentuser", (req, res) => {
  // res.json({ "directrory working": "gg" });
  res.send("working");
});

app.listen(3000, () => {
  console.log("auth listening on port 3000!");
});
