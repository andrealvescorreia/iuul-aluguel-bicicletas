import CartaoDeCredito from "../src/models/CartaoDeCredito.js";
import ErrorOperationCodes from "../src/controllers/ErrorOperationCodes.js";

test('criação de cartao de crédito', async () => {
  const cartaoDeCredito = {
    ciclista: 1,
    nomeTitular: 'andre',
    numero: '123',
    validade: new Date('10-05-2025'),
    cvv: '456',
  }

  const repositoryMock = {
    add(cartao) { return cartao }
  }

  const isValidMock = () => true
  const cartaoDeCreditoModel = new CartaoDeCredito(repositoryMock, isValidMock);
  const res = await cartaoDeCreditoModel.create(cartaoDeCredito);
  expect(res).toEqual({ success: cartaoDeCredito });
});

test('não deve criar o cartao pois o ciclista não existe', async () => {
  const cartaoDeCredito = {
    ciclista: 0,
    nomeTitular: 'andre',
    numero: '123',
    validade: new Date('10-05-2025'),
    cvv: '456',
  }

  const repositoryMock = {
    add(cartao) {
      return {
        failure:
          [
            { code: ErrorOperationCodes.CYCLIST_NOT_FOUND },
          ]
      }
    }
  }

  const isValidMock = () => true

  const cartaoDeCreditoModel = new CartaoDeCredito(repositoryMock, isValidMock);
  const res = await cartaoDeCreditoModel.create(cartaoDeCredito);
  expect(res).toEqual({
    failure:
      [
        { code: ErrorOperationCodes.CYCLIST_NOT_FOUND },
      ]
  });
});