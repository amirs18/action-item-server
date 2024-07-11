import express from "express";
import { db } from "../db/database";
import { User } from "../db/types";

export const router = express.Router();
router.get("/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;

  const user = await db
    .selectFrom("user")
    .selectAll()
    .where("email", "=", userEmail)
    .executeTakeFirst();

  //TODO error handling
  res.send(user);
});

router.get("/", async (req, res) => {
  const users = await db.selectFrom("user").selectAll().execute();

  //TODO error handling
  res.send(users);
});

router.post("/", async (req, res) => {
  const user: User = req.body.body;

  await db.insertInto("user").values(user).executeTakeFirst();
  //   TODO error handling
  res.sendStatus(200);
});
router.delete("/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;
  await db.deleteFrom("user").where("email", "=", userEmail).executeTakeFirst();

  //TODO error handling
  res.sendStatus(200);
});
router.patch("/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;
  const name: User["name"] = req.body;
  console.log("🚀 ~ router.patch ~ name:", name);

  await db
    .updateTable("user")
    .set({ name: name })
    .where("email", "=", userEmail)
    .executeTakeFirst();

  //TODO error handling
  res.sendStatus(200);
});
