const userController = require('../controllers/userController');

const router = require('express').Router();

router.route('/signup')
     .post(userController.signup);

router.route('/login')
       .post(userController.login);

module.exports = router;

