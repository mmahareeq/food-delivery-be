const userController = require('../controllers/userd.controller');

const router = require('express').Router();

router.route('/')
     .get(userController.isLognin);

router.route('/signup')
     .post(userController.signup);

router.route('/login')
       .post(userController.login);

router.route('/logout')
       .post(userController.logout);

router.route('/forgetpassword')
       .post(userController.forgetPassword)
       
router.route('updatepassword')
       .post(userController.updatePassword)
        
module.exports = router;

