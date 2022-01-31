const storeModel = require('../models/storeModel');

const getAllProducts = async () => {
  storeModel.getAllProducts();
};

const getProductId = async (id) => {
  storeModel.getProductId(id);
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