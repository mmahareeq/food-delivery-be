const userController = require('../controllers/userController');

const router = require('express').Router();

router.route('/')
     .get(userController.isLognin);

router.route('/signup')
     .post(userController.signup);

router.route('/login')
       .post(userController.login);

router.route('/logout')
       .post(userController.logout);

module.exports = router;

