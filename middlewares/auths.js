const storeServices = require('../services/storeServices');

const authName = async (req, res, next) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: 'name is requires' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: 'name length must be at least 5 characters long' });
  }

  next();
};

const authQuantity = async (req, res, next) => {
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(400).json({ message: 'quantity is required' });
  }
  if (typeof (quantity) !== 'number' || quantity <= 0) {
    return res.status(422).json({ message: 'quantity must be a number larger than or equal to 1' });
  }

  next();
};

const authExist = async (req, res, next) => {
  const { name } = req.body;

  const product = await storeServices.productExist(name);
  if (product.length > 0) {
    return res.status(409).json({ message: 'Product already exists' });
  }

  next();
};

module.exports = {
  authName,
  authQuantity,
  authExist,
};