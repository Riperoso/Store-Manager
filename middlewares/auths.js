const storeServices = require('../services/storeServices');

const authName = (req, res, next) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const authQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (typeof (quantity) !== 'number' || quantity <= 0) {
    return res.status(422).json({ 
      message: '"quantity" must be a number larger than or equal to 1' });
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

const authNotExist = async (req, res, next) => {
  const { id } = req.params;
  const product = await storeServices.getProductId(id);

  if (product === [] || product === null) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};
module.exports = {
  authName,
  authQuantity,
  authExist,
  authNotExist,
};
