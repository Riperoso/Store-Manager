const sinon = require(sinon);
const { expect } = require('chai');

const storeServices = require('../../services/storeServices');
const storeController = require('../../controllers/storeControllers');

describe('Aochamar o controller de create', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
      .returns(response);

      response.send = sinon.stub()
      .returns()

      sinon.stub(storeServices, 'create')
      .resolves(false);
    });

    after(() => {
      storeServices.create.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await storeController.create(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o send com a mensagem "Dados inálidos"', async () => {
      await storeController.create(request, response);

      expect(response.send.calledWith('Dados inválidos')).to.be.equal(true);
    });
   
  });

  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: 'Farofa',
        quantity: 5,
      };

      response.status = sinon.stub()
      .returns(response);
      response.send = sinon.stub()
      .returns();

      sinon.stub(storeServices, 'create')
      .resolves(true);
    });

    after(() => {
      storeServices.create.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await storeController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

  });

});
