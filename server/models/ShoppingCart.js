const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shoppingCartSchema = new Schema({
  userName: { type: String, require: true },
  email: { type: String, require: true },
  phoneNumber: { type: String, require: true },
  address: { type: String, require: true },
  totalPrice: { type: Number, require: true },
  products: [
    {
      productName: { type: String, require: true },
      productPrice: { type: Number, require: true },
      qty: { type: Number, require: true },
    },
  ],
})

module.exports = mongoose.model('ShoppingCart', shoppingCartSchema)
