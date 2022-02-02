const sinon = require('sinon');
const { expect } =  require('chai')

const storeModel = require('../../models/storeModel');
const storeServices = require('../../services/storeServices');
const saleModel = require('../../models/saleModels');
const saleServices = require('../../services/salesServices');

describe('Testes de product', () => {

  describe('Insere um novo produto no banco de dados', () => {

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

  describe('busca todos os produtos do DB no services', () => {
    describe('quando não existe produto', () => {
      before(() => {
        sinon.stub(storeModel, 'getAllProducts')
          .resolves([]);
      });

      after(() => {
        storeModel.getAllProducts.restore();
      });

      it('retorna um array', async () => {
        const response = await storeServices.getAllProducts();

        expect(response).to.be.an('array');
      });

      it("retorna array vazio", async () => {
        const response = await storeServices.getAllProducts();

        expect(response).to.be.empty;
      });
    });

    describe('quando não existe produto', () => {
      const payloadStore = [{
        id: 1,
        name: 'product',
        quantity: 10,
      }]
      before(() => {
        sinon.stub(storeModel, 'getAllProducts')
          .resolves(payloadStore);
      });

      
      after(() => {
        storeModel.getAllProducts.restore();
      });

      it('retorna um array', async () => {
        const response = await storeServices.getAllProducts();

        expect(response).to.be.an('array');
      });

      it("o array não está vazio", async () => {
        const response = await storeServices.getAllProducts();
        expect(response).to.be.not.empty;
      });

      it("o array tem as chaves id, name e quantity", async () => {
        const [products] = await storeServices.getAllProducts();
        expect(products).to.include.all.keys("id","name", "quantity");
      });
    });
  });

  describe("consulta de produtos por id em services", () => {
    describe("quando existe o produto criado", () => {
      before(() => {
        sinon.stub(storeModel, 'getProductId')
          .resolves({
            id: 1,
            name: 'farofa',
            quantity: 15
          });
      });

      after(() => {
        storeModel.getProductId.restore();
      });

      it("retorna um objeto", async () => {
        const response = await storeServices.getProductId();

        expect(response).to.be.an('object');
      });

      it("o objeto não está vazio", async () => {
        const response = await storeServices.getProductId();

        expect(response).to.be.not.empty;
      });

      it("contem as chaves id, name e quantity", async () => {
        const response = await storeServices.getProductId();

        expect(response).to.contain.keys('id', 'name', 'quantity');
      });
    });

    describe("quando não existe o produto criado", () => {
      before(() => {
        sinon.stub(storeModel, 'getProductId')
          .resolves({});
      });

      after(() => {
        storeModel.getProductId.restore();
      });
      it("retorna um array", async () => {
        const response = await storeServices.getProductId();

        expect(response).to.be.an('object');
      });

      it("retorna um array vazio", async () => {
        const response = await storeServices.getProductId();

        expect(response).to.be.empty;
      });
    });

    describe("quando é passado um id de um produto que não existe", () => {
      before(() => {
        sinon.stub(storeModel, 'getProductId')
          .resolves(null);
      });

      after(() => {
        storeModel.getProductId.restore();
      });

      it('retorna null', async () => {
        const response = await storeServices.getProductId();

        expect(response).to.be.null;
      });

    });
  });

  describe("edita algum produto", () => {
    const payload = {
      id: 3,
      name: 'farofa',
      quantity: 210,
    };

    before(() => {
      sinon.stub(storeModel, "attProduct").resolves(payload);
    });

    after(() => {
      storeModel.attProduct.restore();
    });

    const { name, quantity, id } = payload;

    describe("quando é editado com sucesso", () => {
      it("retorna um objeto", async () => {
        const response = await storeServices.attProduct(name, quantity, id);

        expect(response).to.be.an('object')
      });

      it("possui o id, name e quantity do produto inserido", async () => {
        const response = await storeServices.attProduct(name, quantity, id);

        expect(response).to.have.all.keys("id", "name", "quantity")
      });
    });
  });

  describe("deleta algum produto", () => {
    const payload = {
      id: 3,
      name: 'farofa',
      quantity: 210,
    };

    before(() => {
      sinon.stub(storeModel, "deleteProduct").resolves(payload);
    });

    after(() => {
      storeModel.deleteProduct.restore();
    });

    const { id } = payload;

    describe("quando é deletado com sucesso", () => {
      it("retorna um objeto", async () => {
        const response = await storeServices.deleteProduct(id);

        expect(response).to.be.an('object')
      });

      it("possui o id, name e quantity do produto deleteado", async () => {
        const response = await storeServices.deleteProduct(id);

        expect(response).to.have.all.keys("id", "name", "quantity")
      });
    });
  });
});

describe('Testes de sale', () => {
  describe('Insere uma nova sale no banco de dados', () => {

    describe('quando é inserido com sucesso', () => {
      const payloadSale = {
        productId: 1,
        quantity: 5,
        id: 1,
      };

      before(() => {
        sinon.stub(saleModel, 'createSalesProduct')
          .resolves([payloadSale]);
      });

      after(() => {
        saleModel.createSalesProduct.restore();
      });

      it('retorna um objeto', async () => {
        const response = await saleServices.createSalesProduct(payloadSale);

        expect(response).to.be.a('object');
      });

      it('tal objeto possui "id" do novo produto inserido', async () => {
        const response = await saleServices.createSalesProduct(payloadSale);

        expect(response).to.have.a.property('id');
      });

    });
  })
})