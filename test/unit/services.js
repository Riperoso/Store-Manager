const sinon = require('sinon');
const { expect } =  require('chai')

const storeModel = require('../../models/storeModel');
const storeServices = require('../../services/storeServices');

describe('Insere um novo produto no banco de dados', () => {
  describe('qaundo o payload informado não é válido', () => {
    const payloadStore = {};

    it('retorna um boolean', async () => {
      const response = await storeServices.create(payloadStore);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "false"', async () => {
      const response = await storeServices.create(payloadStore);

      expect(response).to.be.equal(false);
    });

  });

  describe('quando é inserido com sucesso', () => {
    const payloadStore = {
      name: 'farofa',
      quantity: '5',
    };

    before(() => {
      const ID_EXAMPLE = 1;

      sinon.stub(storeModel, 'create')
        .resolves({ id: ID_EXAMPLE});
    });

    after(() => {
      storeModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await storeServices.create(payloadStore);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui "id" do novo produto inserido', async () => {
      const response = await storeServices.create(payloadStore);

      expect(response).to.have.a.property('id');
    });

  });

});
