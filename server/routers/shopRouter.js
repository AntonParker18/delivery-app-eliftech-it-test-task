const express = require('express')
const router = express.Router()
const shopController = require('../controllers/shop.controller')

router.post('/restaurant', shopController.createRestaurant)
router.post('/product', shopController.createProduct)

router.get('/restaurant', shopController.getAllRestaurants)
router.get('/product/:shopId', shopController.getAllProducts)

module.exports = router
