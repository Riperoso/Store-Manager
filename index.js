require('dotenv').config();
const express = require('express');

const storeController = require('./controllers/storeControllers');
const {
  authName,
  authExist,
  authQuantity,
} = require('./middlewares/auths');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', [authName,
  authQuantity, authExist, storeController.create]);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
