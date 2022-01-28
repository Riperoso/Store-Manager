const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const [result] = await connection
    .execute(
      'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
      [name, quantity],
    );

    return {
      id: result.insertId,
    };
};

const productsExist = async (name) => {
  const [result] = await connection.execute(
    'SELECT INTO StoreManager.products WHERE name = ?',
    [name],
  );
  return result;
};

module.exports = {
  create,
  productsExist,
};