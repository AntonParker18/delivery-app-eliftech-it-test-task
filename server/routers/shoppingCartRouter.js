const express = require('express')
const router = express.Router()
const shoppingCartController = require('../controllers/shoppingCart.controller')

router.post('/order', shoppingCartController.createOrder)

module.exports = router
