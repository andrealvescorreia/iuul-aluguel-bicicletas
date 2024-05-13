import 'dotenv/config'

import express from 'express';
import { db } from "./database/db.js"
import { initModels } from "./models/index.js";
import router from './router.js';

const app = express();

await db.authenticate();
initModels(db);


app.use(process.env.BASE_ROUTE, router);
app.listen(process.env.PORT);

console.log(`rodando em localhost:${process.env.PORT}${process.env.BASE_ROUTE}/`)