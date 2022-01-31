require('dotenv').config();
const express = require('express');

const storeController = require('./controllers/storeControllers');
const {
  authName,
  authExist,
  authQuantity,
  authNotExist,
} = require('./middlewares/auths');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', storeController.getAllProducts);

app.get('/products/:id', storeController.getProductId);

app.put('/products/:id', [authName,
authQuantity, authNotExist, storeController.attProduct]);

app.post('/products', [authName,
  authQuantity, authExist, storeController.create]);

app.delete('/products/:id', [authNotExist, storeController.deleteProduct]);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
