import 'dotenv/config'

import express from 'express';
import { db } from "./database/db.js"
import { initModels } from "./database/models/index.js";
import router from "./router.js";

const app = express();

//parse do body (string para JSON)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await db.authenticate();
initModels(db);


app.use(process.env.BASE_ROUTE, router);
app.listen(process.env.PORT);

console.log(`rodando em localhost:${process.env.PORT}${process.env.BASE_ROUTE}/`)