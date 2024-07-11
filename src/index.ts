import express from "express";
import bodyParser from "body-parser";
import { router } from "./routes/user";
import cors from "cors";

const app = express();

const PORT = 4000;
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
