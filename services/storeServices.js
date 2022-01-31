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

const attProduct = async (name, quantity, id) => {
  const product = await storeModel.attProduct(name, quantity, id);

  return product;
};

module.exports = {
  getAllProducts,
  getProductId,
  create,
  attProduct,
  productExist,
};