const Restaurant = require('../models/Restaurant')
const Product = require('../models/Product')

async function createRestaurant(req, res) {
  try {
    const { restaurantName, location } = req.body

    const createdRestaurant = new Restaurant({
      restaurantName,
      location,
    })

    createdRestaurant.save()
    res
      .status(200)
      .json({ message: 'Restaurant created', restaurant: createdRestaurant })
  } catch (e) {
    console.log(e)
  }
}

async function createProduct(req, res) {
  try {
    const { productName, photoUrl, price, productType, shopId } = req.body

    const createdProduct = new Product({
      productName,
      photoUrl,
      price,
      productType,
      shopId,
    })
    await createdProduct.save()
    res
      .status(200)
      .json({ message: 'Product created', product: createdProduct })
  } catch (e) {
    console.log(e)
  }
}

async function getAllRestaurants(req, res) {
  try {
    const restaurants = await Restaurant.find()
    res.status(200).json(restaurants)
  } catch (e) {
    console.log(e)
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await Product.find({ shopId: req.params.shopId })
    res.status(200).json(products)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  createRestaurant,
  createProduct,
  getAllRestaurants,
  getAllProducts,
}
