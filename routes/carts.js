const cartController = require('../controllers/carts.controller');

const router = require('express').Router();

console.log('cart')
router.route('/')
      .get(cartController.getCart)
      .post(cartController.addCart)
      .put(cartController.updateCart)
      .delete(cartController.deleteItemFromCart);


module.exports = router;