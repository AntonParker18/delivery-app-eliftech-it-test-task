const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL

const app = express()

const shopRouter = require('./routers/shopRouter')
const shoppingCartRouter = require('./routers/shoppingCartRouter')

app.use(express.json())
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))

app.use('/api/shop', shopRouter)
app.use('/api/shoppingCard', shoppingCartRouter)

const start = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log('DB connected')
  } catch (e) {
    console.log(e)
  }

  app.listen(PORT, err => {
    if (err) {
      console.log(err)
    }
  })
  console.log(`Server started on port ${PORT}`)
}

start()
