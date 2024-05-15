import express from 'express';
const router = express.Router();

import ciclistaController from './controllers/ciclistaController.js'
import cartaoController from './controllers/cartaoController.js';



router.get("/hello", async (req, res) => {
  res.send("Hello World!!");
});

// rotas Ciclista
router.get('/ciclista/existeEmail/:email?', ciclistaController.existeEmail)
router.post('/ciclista', ciclistaController.criaCiclista)

//rotas CartaoDeCredito
router.get('/cartaoDeCredito/:idCiclista?', cartaoController.obterCartao)
router.put('/cartaoDeCredito/:idCiclista?', cartaoController.atualizarCartao)

export default router;