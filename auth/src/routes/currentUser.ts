import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send("now working latest");
});

export { router as currentUserRouter };
