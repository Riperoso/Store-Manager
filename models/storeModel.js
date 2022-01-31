const connection = require('./connection');

const getAllProducts = async () => {
  const [allProducts] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return allProducts;
};

const getProductId = async (id) => {
  const [productId] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  if (productId.length === 0) return null;
  return productId[0];
};

const create = async (name, quantity) => {
  const [result] = await connection
    .execute(
      'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
      [name, quantity],
    );

    return {
      id: result.insertId,
      name,
      quantity,
    };
};

const productsExist = async (name) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = ?',
    [name],
  );
  return result;
};

const attProduct = async (name, quantity, id) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );
    const dttProduct = await getProductId(id);
  return {
    id: dttProduct.id,
    name: dttProduct.name,
    quantity: dttProduct.quantity,
  };
};

const deleteProduct = async (id) => {
  const product = await getProductId(id);
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return product;
};

module.exports = {
  getAllProducts,
  getProductId,
  create,
  productsExist,
  attProduct,
  deleteProduct,
};