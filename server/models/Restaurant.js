const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  restaurantName: { type: String, require: true },
  location: {
    lat: { type: Number, require: true },
    lng: { type: Number, require: true },
  },
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
