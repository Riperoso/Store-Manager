const storeServices = require('../services/storeServices');

const getAllProducts = async (req, res) => {
  const products = await storeServices.getAllProducts();

  res.status(200).json(products);
};

const getProductId = async (req, res) => {
  const { id } = req.params;

  const product = await storeServices.getProductId(id);

  if (product === null) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const store = await storeServices.create(name, quantity);

 res.status(201).json(store);
};

module.exports = {
  getAllProducts,
  getProductId,
  create,
};