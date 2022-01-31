const sinon = require('sinon');
const { expect } = require('chai');
const storeModel = require('../../models/storeModel');
const connection = require('../../models/connection');

describe('Insere um novo produto no banco de dados', () => {
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
  });
});

describe('busca todos os produtos do banco de dados', () => {
  describe('quando não existe produtos', () => {
    before(() => {

      sinon.stub(connection, 'execute').resolves([[]])
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await storeModel.getAllProducts();
      expect(response).to.be.an('array');
    });

    it('retorna um array vazio', async () => {
      const response = await storeModel.getAllProducts();
      expect(response).to.be.empty;
    });
  });

  describe('quando existe produtos', () => {
    const payloadStore = [[
      {
        id: 1,
        name: "farofa",
        quantity: 10
      },
      {
        id: 2,
        name: "farinha",
        quantity: 35
      }
    ]];

    before(() => {
      sinon.stub(connection, 'execute').resolves(payloadStore)
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await storeModel.getAllProducts();

      expect(response).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const response = await storeModel.getAllProducts();

      expect(response).to.be.not.empty;
    });

    it('o array tem as chaves id, name e quantity', async() => {
      const response = await storeModel.getAllProducts();

      expect(response).to.include.all.keys('id','name', 'quantity');
    });
  });
});

describe("consulta produto por id no banco de dados", () => {


  describe("quando existe o produto criado", () => {
    before(async () => {

      sinon.stub(connection, "execute").returns([
      [{
        id: 1,
        name: "farofa",
        quantity: 10
      }]
    ]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it("retorna um objeto", async () => {
      const response = await storeModel.getProductId();

      expect(response).to.be.an('object');
    });

    it("o objeto não está vazio", async () => {
      const response = await storeModel.getProductId();

      expect(response).to.be.not.empty;
    });

    it("contem as chaves id, name e quantity", async () => {
      const response = await storeModel.getProductId();

      expect(response).to.contain.keys('id', 'name', 'quantity');
    });
  });

  describe("quando não existe o produto criado", () => {
    before(() => {

      sinon.stub(connection, "execute").returns([{}]);
    });

    after(() => {
      connection.execute.restore();
    });

    it("retorna array", async () => {
      const response = await storeModel.getProductId();

      expect(response).to.be.an('object');
    });
    it("retorna array vazio", async () => {
      const response = await storeModel.getProductId();

      expect(response).to.be.empty;
    });
  });

  describe("quando é passado um id de um produto que não existe", () => {
    before(() => {

      sinon.stub(connection, "execute").returns([[null]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna null', async () => {
      const response = await storeModel.getProductId();
      
      expect(response).to.be.null;
    });

  });
});