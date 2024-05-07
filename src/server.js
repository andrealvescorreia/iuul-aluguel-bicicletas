require('dotenv').config()

import express, { Router } from 'express';
import db from '../database/db'
import { initModels } from './models';

const router = Router();
const app = express()

initModels(db)

router.get('/hello', (req, res) => {
  res.send('Hello World!!')
})

app.use(process.env.BASE_ROUTE, router);
app.listen(process.env.PORT);