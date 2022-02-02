const connection = require('./connection');

const createSale = async () => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (id) VALUES (DEFAULT)',
    [new Date()],
); 
    return { id: result.insertId };
};

const createSalesProduct = async ({ productId, quantity, id }) => {
  await connection
    .query('INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
      [id, productId, quantity]);
  return { id, productId, quantity };
};

const getAllSales = async () => {
  const [allSales] = await connection.execute(
    `SELECT salep.sale_id as saleId,
    sale.date, salep.product_id, salep.quantity 
    FROM sales_products as salep INNER JOIN sales as sale ON salep.sale_id = sale.id`,
  );
  return allSales;
};

const getIdSale = async (id) => {
  const [saleId] = await connection.execute(
    `SELECT sale.date, salep.product_id, salep.quantity
    FROM sales_products as salep INNER JOIN sales as sale ON salep.sale_id = sale.id
    WHERE salep.sale_id = ?`,
    [id],
  );
  if (saleId.length === 0) return null;
  return saleId;
};

module.exports = {
  createSale,
  createSalesProduct,
  getAllSales,
  getIdSale,
};