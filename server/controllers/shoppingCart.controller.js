const ShoppingCart = require('../models/ShoppingCart')

async function createOrder(req, res) {
  try {
    const { userName, email, phoneNumber, address, totalPrice, products } =
      req.body

    const createdOrder = new ShoppingCart({
      userName,
      email,
      phoneNumber,
      address,
      totalPrice,
      products,
    })

    createdOrder.save()
    console.log(createdOrder)
    res.json({ success: true, order: createdOrder })
  } catch (e) {
    res.json({ success: false })
    console.log(e)
  }
}

module.exports = {
  createOrder
}