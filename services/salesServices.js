const salesModel = require('../models/saleModels');

const createSalesProduct = async (body) => {
  const { id } = await salesModel.createSale();

  await Promise.all(body.map(async ({ product_id: productId, quantity }) => {
   await salesModel.createSalesProduct({ productId, quantity, id });
  }));

  return id;
};

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();

  return sales;
};

const getIdSale = async (id) => {
  const sale = await salesModel.getIdSale(id);

  return sale;
};

module.exports = {
  createSalesProduct,
  getAllSales,
  getIdSale,
};