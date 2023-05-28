const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  productName: { type: String, require: true },
  photoUrl: { type: String, require: true },
  price: { type: Number, require: true },
  productType: {type: String, require: true},
  shopId: { type: String, require: true },
})

module.exports = mongoose.model('Product', productSchema)