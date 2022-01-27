const storeServices = require('../services/storeServices');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const store = await storeServices.create({ name, quantity });

 res.status(200).json(store);
};

module.exports = {
  createProduct,
};