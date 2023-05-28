import React, { useState } from 'react'
import Restaurant from './Restaurant/Restaurant'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography } from '@mui/material'
import { useEffect } from 'react'

import s from './Shops.module.css'
import { setRestaurants } from '../../redux/shops/shopsAction'
import RowRadioButtonsGroup from './RowRadioButtonsGroup'

const Shops = () => {
  const { restaurants } = useSelector(state => state.shops)
  const [filterProduct, setFilterProduct] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setRestaurants())
  }, [dispatch])

  return (
    <div className={s.contentWrapper}>
      <nav className={s.navContainer}>
        <div>
          <Typography>Restaurant:</Typography>
        </div>
        <div className={s.buttons}>
          {restaurants.map(restaurant => (
            <Restaurant
              key={restaurant._id}
              restaurant={restaurant}
              setFilterProduct={setFilterProduct}
            />
          ))}
        </div>
      </nav>

      <div className={s.shopContainer}>
        <RowRadioButtonsGroup setFilterProduct={setFilterProduct} />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
          sx={{ alignContent: 'baseline' }}
        >
          {[...filterProduct]?.map(product => (
            <Grid key={product._id} item xs={2} sm={4}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default Shops
