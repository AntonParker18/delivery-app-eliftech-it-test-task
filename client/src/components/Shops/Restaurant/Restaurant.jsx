import React, { useEffect } from 'react'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setProducts } from '../../../redux/shops/shopsAction'
import { addProducts } from '../../../redux/shoppingCart/shoppingCartSlice'

import s from './../Shops.module.css'

const Restaurant = ({ restaurant, setFilterProduct }) => {
  const { basket } = useSelector(state => state.shoppingCart)
  const { products } = useSelector(state => state.shops)

  const dispatch = useDispatch()

  const setGoods = () => {
    dispatch(setProducts(restaurant._id))
  }

  useEffect(() => {
    if (products) {
      dispatch(addProducts(products))
      setFilterProduct(products)
    }
  }, [dispatch, products, setFilterProduct])

  return (
    <div className={s.restaurant}>
      <Button
        disabled={basket[0]?.shopId !== restaurant._id && basket.length > 0}
        onClick={setGoods}
        variant='outlined'
        sx={{ height: '3em' }}
      >
        {restaurant.restaurantName}
      </Button>
    </div>
  )
}

export default Restaurant
