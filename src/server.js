import 'dotenv/config'

import express, { Router } from 'express';
import { db } from "./database/db.js"
import { initModels } from "./models/index.js";

const router = Router();
const app = express();

initModels(db);

router.get("/hello", async (req, res) => {
  res.send("Hello World!!");
});

app.use(process.env.BASE_ROUTE, router);
app.listen(process.env.PORT);