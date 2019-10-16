const { Router } = require('express');
const Product = require('../models/product');
const router = Router();

router.get('/', (req, res) => {
    res.render('add-product', {
        title: 'Add product | Shooopogolik',
        isAdd: true,
    });
});

router.post('/', async (req, res) => {
    console.log('.....', req.body);
    const { title, description, price } = req.body;
    const product = new Product(title, description, price);

    await product.save();

    res.redirect('/products');
});

module.exports = router;