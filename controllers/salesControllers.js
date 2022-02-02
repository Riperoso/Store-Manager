const salesServices = require('../services/salesServices');

const createSalesProduct = async (req, res) => {
  const { body } = req;
  const id = await salesServices.createSalesProduct(body);
  
  res.status(201).json({
    id,
    itemsSold: body,
   });
};

const getAllSales = async (req, res) => {
  const sales = await salesServices.getAllSales();

  res.status(200).json(sales);
};

const getIdSale = async (req, res) => {
  const { id } = req.params;

  const sale = await salesServices.getIdSale(id);

  if (sale === null) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  
  res.status(200).json(sale);
};

module.exports = {
  createSalesProduct,
  getAllSales,
  getIdSale,
};