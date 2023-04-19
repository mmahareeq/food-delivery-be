const orderController = require('../controllers/orders.controller');


const router = require('express').Router();

router.route('/')
      .get(orderController.getorders)
      .post(orderController.addNewOrder);


router.route('/:id')
    .get(orderController.getOrder)
    .put(orderController.updateOrder)
    .delete(orderController.deleteOrder);


module.exports = router;