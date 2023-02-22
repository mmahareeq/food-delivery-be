const cartController = require('../controllers/cartController');

const router = require('express').Router();


router.route('/')
      .get(cartController.getCart)
      .post(cartController.addCart)
      .put(cartController.updateCart)
      .delete(cartController.deleteItemFromCart);


module.exports = router;