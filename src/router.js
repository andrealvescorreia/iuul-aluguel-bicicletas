import express from 'express';
const router = express.Router();

import ciclistaController from './controllers/ciclistaController.js'
import cartaoController from './controllers/cartaoController.js';
import aluguelController from './controllers/aluguelController.js'



router.get("/hello", async (req, res) => {
  res.send("Hello World!!");
});

// rotas Ciclista
router.get('/ciclista/existeEmail/:email?', ciclistaController.existeEmail)
router.post('/ciclista', ciclistaController.criaCiclista)
router.get('/ciclista/:idCiclista?', ciclistaController.encontraCiclista)

//rotas CartaoDeCredito
router.get('/cartaoDeCredito/:idCiclista?', cartaoController.obterCartao)
router.put('/cartaoDeCredito/:idCiclista?', cartaoController.atualizarCartao)

router.post('/aluguel', aluguelController.realizarAluguel)

export default router;