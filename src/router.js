import express from 'express';
const router = express.Router();

import ciclistaController from './controllers/ciclistaController.js'



router.get("/hello", async (req, res) => {
  res.send("Hello World!!");
});

// rotas Ciclista
router.get('/ciclista/existeEmail/', ciclistaController.existeEmail)
router.get('/ciclista/existeEmail/:email', ciclistaController.existeEmail)

export default router;