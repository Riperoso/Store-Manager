const sinon = require('sinon');
const { expect } = require('chai');

const storeServices = require('../../services/storeServices');
const storeController = require('../../controllers/storeControllers');

describe('Ao chamar o controller de create', () => {
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


describe("Ao chamar o controller de getAllProducts", () => {
  describe("quando existem produtos no banco de dados", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(storeServices, "getAllProducts").resolves([]);
    });

    after(() => {
      storeServices.getAllProducts.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await storeController.getAllProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equals(true);
    });

    it('é chamado o json passando um array', async () => {
      await storeController.getAllProducts(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});


describe("Ao chamar o controller de getProductdId", () => {
  describe("quando existe o produto no banco de dados", async () => {
    const response = {};
    const request = { params: { id: 2 } };

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(storeServices, "getProductId").resolves({
        id: 2,
        name: 'farofa',
        quantity: 15
      });
    });

    after(() => {
      storeServices.getProductId.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await storeController.getProductId(request, response);

      expect(response.status.calledWith(200)).to.be.equals(true);
    });

    it('é chamado o json passando um objeto', async () => {
      await storeController.getProductId(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe("quando não existe o produto no banco de dados", async () => {
    const response = {};
    const request = { params: { id: 3 } };

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(storeServices, "getProductId").resolves(null);
    });

    after(() => {
      storeServices.getProductId.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await storeController.getProductId(request, response);

      expect(response.status.calledWith(404)).to.be.equals(true);
    });

    it('é chamado o json passando um objeto', async () => {
      await storeController.getProductId(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('é chamado o send com a mensagem "Product not found"', async () => {
      await ProductsController.getById(request, response);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  });
});

describe("Ao chamar o controller de attProduct", () => {
  describe("quando existe o produto no banco de dados", () => {
    const payload = {
      id: 1,
      name: 'farofa',
      quantity: 10
    };

    const { id, name, quantity } = payload;

    const response = {};
    const request = { params: { id } };

    before(() => {
      request.body = { name, quantity };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().resolves();

      sinon.stub(storeServices, "attProduct").resolves(payload);
    });

    after(() => {
      storeServices.attProduct.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await storeController.attProduct(request, response);

      expect(response.status.calledWith(200)).to.be.equals(true);
    });

    it('é chamado o json com um objeto', async () => {
      await storeController.attProduct(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe("Ao chamar o controller de deleteProduct", () => {
  describe("quando existe o produto no banco de dados", () => {
    const payload = {
      id: 1,
      name: 'farofa',
      quantity: 10
    };

    const { id, name, quantity } = payload;

    const response = {};
    const request = { params: { id } };

    before(() => {
      request.body = { name, quantity };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().resolves();

      sinon.stub(storeServices, "deleteProduct").resolves(payload);
    });

    after(() => {
      storeServices.deleteProduct.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await storeController.deleteProduct(request, response);

      expect(response.status.calledWith(200)).to.be.equals(true);
    });

    it('é chamado o json com um objeto', async () => {
      await storeController.deleteProduct(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});