const express = require('express');
const router = express.Router();
const {
    createProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
    updateProduct
} = require('../controllers/product');

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)


module.exports = router