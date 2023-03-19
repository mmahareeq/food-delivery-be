const express = require('express');
const router = express.Router();
const multer = require('multer')
const productController = require('../controllers/productController');


const storageEngine = multer.diskStorage({
    destination: "./images",
    filename: (req, file, callback) => {
        console.log(req,'fiile',file)
    callback(null, `${Date.now()}--${file.originalname}`);
    },
}); 
const upload = multer({ storage: storageEngine });
router.route('/')
    .get(productController.getAllProducts)
    .post(upload.single('file'), productController.addNewProduct)


router.route('/:id')
     .get(productController.getProductById)
     .put(productController.updateProduct)
     .delete(productController.deleteProduct)

 router.route('/image/:id')
       .post(upload.single('file'), productController.uploadImage)    

module.exports = router;