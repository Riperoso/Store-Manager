const storeModel = require('../models/storeModel');

const create = async ({ name, quantity }) => {
  const product = await storeModel
  .create({ name, quantity });

  return product;
};

const productExiste = async (name) => {
  storeModel.productsExist(name);
};

module.exports = {
  create,
  productExiste,
};