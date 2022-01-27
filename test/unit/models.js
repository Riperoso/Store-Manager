const sinon = require('sinon');
const { expect } = require('chai');
const storeModel = require('../../models/storeModel');
const connection = require('../../models/connection');

describe('Insere um novo item no bando de dados', () => {
  const payloadStore = {
   name: 'farofa',
   quantity: '5',
  }

  before(async () => {
    const execute = [{ inserId: 1}];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando é inserido com sucesso', () => {

    it('retorna um objeto', async () => {
      const response = await storeModel.create(payloadStore);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await storeModel.create(payloadStore);

      expect(response).to.have.a.property('id')
    });

    it('o objeto possui a chave "name"', async () => {
      const response = await storeModel.create(payloadStore);

      expect(response).to.have.a.property('name');
    });

    it('o objeto possui a chave "quantity"', async () => {
      const response = await storeModel.create(payloadStore);

      expect(response).to.have.a.property('quantity');
    });
  })
})