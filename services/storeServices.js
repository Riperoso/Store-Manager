const storeModel = require('../models/storeModel');

const getAllProducts = async () => {
  const products = await storeModel.getAllProducts();
  return products;
};

const getProductId = async (id) => {
 const product = await storeModel.getProductId(id);

 return product;
};

const create = async (name, quantity) => {
  const product = await storeModel
  .create(name, quantity);

  return product;
};

const productExist = async (name) => storeModel.productsExist(name);

module.exports = {
  getAllProducts,
  getProductId,
  create,
  productExist,
};