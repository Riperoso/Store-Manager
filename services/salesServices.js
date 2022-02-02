const salesModel = require('../models/saleModels');

const createSalesProduct = async (body) => {
  const id = await salesModel.createSale();

  body.map(async ({ product_id: productId, quantity }) => {
   await salesModel.createSalesProduct({ productId, quantity, id });
  });

  return id;
};

module.exports = {
  createSalesProduct,
};