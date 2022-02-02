const sinon = require('sinon');
const { expect } = require('chai');

const storeServices = require('../../services/storeServices');
const storeController = require('../../controllers/storeControllers');
const saleServices = require('../../services/salesServices');
const saleController = require('../../controllers/salesControllers');

describe('testes dos Controllers de products', () => {

  describe("Ao chamar o controller de create", () => {

    describe("quando existe um produto no DB", () => {
      const payload = {
        id: 1,
        name: 'farofa',
        quantity: 10
      };

      const response = {};
      const request = { body: {} };

      before(() => {
        request.body = { name: "farofa", quantity: 10 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().resolves();

        sinon.stub(storeServices, "create").resolves(payload);
      });

      after(() => {
        storeServices.create.restore();
      });

      it('é chamado o status com o código 201', async () => {
        await storeController.create(request, response);

        expect(response.status.calledWith(201)).to.be.equals(true);
      });

      it('é chamado o json com um objeto', async () => {
        await storeController.create(request, response);

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
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
        await storeController.getProductId(request, response);
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

});

describe('testes dos Controllers de sales', () => {

  describe("Ao chamar o controller de createProductsSale", () => {

    describe("quando existe um produto no DB", () => {
      const payload = {
        id: 1,
        name: 'farofa',
        quantity: 10
      };

      const response = {};
      const request = { body: {} };

      before(() => {
        request.body = { product_id: 1, quantity: 10 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().resolves();

        sinon.stub(saleServices, "createSalesProduct").resolves(1);
      });

      after(() => {
        saleServices.createSalesProduct.restore();
      });

      it('é chamado o status com o código 201', async () => {
        await saleController.createSalesProduct(request, response);

        expect(response.status.calledWith(201)).to.be.equals(true);
      });

      it('é chamado o json com um objeto', async () => {
        await saleController.createSalesProduct(request, response);

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  });
})