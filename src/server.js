require('dotenv').config()

const express = require('express');
const router = express.Router();
const app = express()

router.get('/hello', (req, res) => {
  res.send('Hello World!!')
})

app.use(process.env.BASE_ROUTE, router);
app.listen(process.env.PORT);