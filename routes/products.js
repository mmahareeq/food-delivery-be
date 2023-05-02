const express = require('express');
const router = express.Router();
const multer = require('multer')
const productController = require('../controllers/products.controller');
const isAdminAuth = require('../middleware/authentication')

const storageEngine = multer.diskStorage({
    destination: "./images",
    filename: (req, file, callback) => {
    callback(null, `${Date.now()}--${file.originalname}`);
    },
}); 

const upload = multer({ storage: storageEngine });

router.route('/')
    .get(productController.getAllProducts)
    .post( isAdminAuth, upload.single('file'), productController.addNewProduct)


router.route('/:id')
     .get(isAdminAuth, productController.getProductById)
     .put(isAdminAuth, upload.single('file'),productController.updateProduct)
     .delete(isAdminAuth, productController.deleteProduct)

 router.route('/image/:id')
       .post(upload.single('file'), productController.uploadImage)    

module.exports = router;