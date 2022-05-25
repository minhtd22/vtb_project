const { authJwt } = require('../middlewares');

/* eslint-disable global-require */
module.exports = (app) => {
  const products = require('../controllers/product.controller');
  const router = require('express').Router();

  router.post('/', [authJwt.verifyToken], products.create);

  router.get('/', [authJwt.verifyToken], products.findAll);
  router.get('/:id', [authJwt.verifyToken], products.findOne);
  router.put('/:id', [authJwt.verifyToken], products.update);
  router.delete('/:id', [authJwt.verifyToken], products.delete);

  app.use('/api/products', router);
};
