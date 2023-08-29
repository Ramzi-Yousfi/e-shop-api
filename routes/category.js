const express = require('express');
const router = express.Router();
const {Category} = require('../models/category');


router.get('/', async (req, res) => {
    const categoryList = await Category.find()
    try {
        res.send(categoryList.map(category => {
            return category
        }))
    } catch (err) {
        res.status(404).send(err)
    }
})
router.post('/', (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    })
    category.save().then((createdCategory => {
        res.status(201).json(createdCategory)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

router.put('/:id', (req, res) => {
        Category.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name,
                icon: req.body.icon,
                color: req.body.color,
            },{new: true}).then(category => {
            if (category) {
                res.send(category)
                return res.status(204).json({success: true, message: 'the categort with the id: ' + id + ' is updeted'})
            } else {
                return res.status(400).json({success: false, message: 'the categort with the id: ' + id + ' is not found'})
            }
        }).catch(err => {
            return res.status(300).json({success: false, error: err})
        })
    }
)



router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({success: true, message: 'the categort with the id: ' + id + ' is deleted'})
        } else {
            return res.status(404).json({success: false, message: 'the categort with the id: ' + id + ' is not found'})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })
})

module.exports = router;