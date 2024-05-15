import Ciclista from "../src/models/Ciclista.js";
import ErrorOperationCodes from "../src/controllers/ErrorOperationCodes.js";

let ciclistaRepositoryMock;
let ciclistaBrasileiro;
let ciclistaEstrangeiro;

beforeEach(() => {
  ciclistaBrasileiro = {
    nome: 'andre',
    email: 'andre@email.com',
    senha: '12345',
    nacionalidade: 'BRASILEIRO',
    cpf: '59626243279',
    urlFotoDocumento: 'https://picsum.photos/200',
    nascimento: new Date('2000-10-10')
  }
  ciclistaEstrangeiro = {
    nome: 'andrew',
    email: 'andrew@email.com',
    senha: '12345',
    nacionalidade: 'ESTRANGEIRO',
    urlFotoDocumento: 'https://picsum.photos/200',
    nascimento: new Date('2000-10-10'),
    passaporte: {
      pais: 'US',
      numero: '01234',
      validade: new Date('2025-01-10')
    }
  }
  ciclistaRepositoryMock = {
    async add(ciclista) { return ciclista },
    async getAll() { return [] },
    async getByEmail() { return null },
  }
});

test('criação ciclista brasileiro', async () => {
  const ciclistaModel = new Ciclista(ciclistaRepositoryMock);
  const res = await ciclistaModel.create(ciclistaBrasileiro);
  expect(res).toEqual({ success: ciclistaBrasileiro });
});

test('deve falhar ciclista brasileiro sem cpf', async () => {
  delete ciclistaBrasileiro.cpf

  const ciclistaModel = new Ciclista(ciclistaRepositoryMock);
  const res = await ciclistaModel.create(ciclistaBrasileiro);
  expect(res).toEqual({
    failure: [{
      code: ErrorOperationCodes.MISSING_REQUIRED_FIELD,
      field: 'cpf'
    }]
  });
});

test('criação ciclista estrangeiro', async () => {
  const ciclistaModel = new Ciclista(ciclistaRepositoryMock);
  const res = await ciclistaModel.create(ciclistaEstrangeiro);
  expect(res).toEqual({ success: ciclistaEstrangeiro });
});

test('deve falhar ciclista estrangeiro sem passaporte', async () => {
  delete ciclistaEstrangeiro.passaporte

  const ciclistaModel = new Ciclista(ciclistaRepositoryMock);
  const res = await ciclistaModel.create(ciclistaEstrangeiro);
  expect(res).toEqual({
    failure: [{
      code: ErrorOperationCodes.MISSING_REQUIRED_FIELD,
      field: 'passaporte'
    }]
  });
});