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

const authProductSale = async (req, res, next) => {
  const { body } = req;
  const thisBu = [];
  body.forEach(async (p) => {
    // const productIdEx = await storeServices.getProductId(p.product_id);
    // console.log(await productIdEx);
    if (p.product_id === undefined) {
      thisBu.push(false);
    }
  });
  if (thisBu.includes(false)) {
    return res.status(400).json({ message: '"product_id" is required' });
  }
  next();
};

const authSaleQuantity = async (req, res, next) => {
  const { body } = req;
  const countFalse = [];

  body.forEach(async (p) => {
    if (p.quantity === undefined) {
      countFalse.push(false);
    }
  });
  if (countFalse.includes(false)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next(); 
};

const authRightQuantity = async (req, res, next) => {
  const { body } = req;
  const countFalse = [];

  body.forEach(async (p) => {
    if (p.quantity <= 0 || typeof (p.quantity) !== 'number') {
      countFalse.push(false);
    }
  });

  if (countFalse.includes(false)) {
    return res.status(422).json(({ message: 
      '"quantity" must be a number larger than or equal to 1' }));
  }
  next();
};

module.exports = {
  authName,
  authQuantity,
  authExist,
  authNotExist,
  authProductSale,
  authSaleQuantity,
  authRightQuantity,
};
