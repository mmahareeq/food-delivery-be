const categoryController = require('../controllers/categories.controller');


const router = require('express').Router();

router.route('/')
      .get(categoryController.getAllCategory)
      .post(categoryController.addNewCategory);


router.route('/:id')
    .get(categoryController.getCategoriesById)
    .delete(categoryController.deleteCategory);


module.exports = router;