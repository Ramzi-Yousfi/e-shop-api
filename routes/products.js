const express = require('express');
const router = express.Router();
const {Product} = require('../models/products');
const {Category} = require("../models/category");


router.get('/', async (req, res) => {
    const productList = await Product.find()
    try {
        res.send(productList.map((product) => {
            return {
                product,
            }
        }))
    } catch (err) {
        res.status(404).send(err)
    }
})
router.post('/', (req, res) => {
    const category = Category.findById(req.body.category).then(category => {
        if (!category) return res.send(400,)
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        })
        product.save().then((createdProduct => {
            res.status(201).json(createdProduct)
        })).catch((err) => {
            res.status(500).json({
                error: err,
                success: false
            })
        })
    })
})

module.exports = router;