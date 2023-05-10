const userController = require('../controllers/user.controller');

const router = require('express').Router();

router.route('/')
     .get(userController.isLognin);

router.route('/signup')
     .post(userController.signup);

router.route('/login')
       .post(userController.login);

router.route('/logout')
       .get(userController.logout);

router.route('/forgetpassword')
       .post(userController.forgetPassword)
       
router.route('/updatepassword/:token')
       .put(userController.updatePassword)
        
module.exports = router;

