import React, { useEffect, useState, useCallback } from 'react'
import ShoppingCartForm from './ShoppingCartForm/ShoppingCartForm'
import ShoppingCartOrder from './ShoppingCartOrder/ShoppingCartOrder'
import { Alert, Button, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useJsApiLoader } from '@react-google-maps/api'
import { setOrder } from '../../redux/shoppingCart/shoppingCartAction'

import s from './ShoppingCart.module.css'

const API_KEY = process.env.REACT_APP_API_KEY

const defaultCenter = {
  lat: 49.232788,
  lng: 28.467502,
}

const defaultValues = {
  userName: '',
  email: '',
  phoneNumber: '',
  address: '',
}

const ShoppingCart = () => {
  const { basket, currentShopId } = useSelector(state => state.shoppingCart)
  const { restaurants } = useSelector(state => state.shops)

  const [userCoordinates, setUsersCoordinates] = useState(defaultCenter)
  const [restaurantCoordinates, setRestaurantCoordinates] =
    useState(defaultCenter)

  const [totalPrice, setTotalPrice] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    if (currentShopId?.shopId) {
      const restaurant = restaurants.find(
        item => item._id === currentShopId.shopId
      )

      if (basket.length > 0) {
        setRestaurantCoordinates({
          lat: restaurant.location.lat,
          lng: restaurant.location.lng,
        })
      }
    }
  }, [currentShopId, restaurants, basket])

  const {
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    control,
    reset,
  } = useForm({ defaultValues })

  const onSubmit = async data => {
    const product = await basket.map(product => {
      return {
        productName: product.productName,
        productPrice: product.price,
        qty: product.qty,
      }
    })

    const newOrder = {
      userName: data.userName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      totalPrice: totalPrice,
      products: product,
    }

    dispatch(setOrder(newOrder))
    reset({ defaultValues })
  }

  useEffect(() => {
    const { qty, price } = basket.reduce(
      (acc, item) => {
        return {
          qty: acc.qty + item.qty,
          price: acc.price + item.qty * item.price,
        }
      },
      { qty: 0, price: 0 }
    )

    setTotalItems(qty)
    setTotalPrice(price)
  }, [basket, totalPrice, totalItems, setTotalPrice, setTotalItems])

  const libraries = ['places']

  const libRef = React.useRef(libraries)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries: libRef.current,
  })

  const onPlaceSelect = useCallback(coordinates => {
    setUsersCoordinates(coordinates)
  }, [])

  return (
    <form className={s.wrapper} onSubmit={handleSubmit(onSubmit)}>
      {isSubmitSuccessful && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity='success'>
            This is a success alert — check it out!
          </Alert>
        </Stack>
      )}

      <div className={s.wrapperOrder}>
        <ShoppingCartForm
          restaurantCoordinates={restaurantCoordinates}
          userCoordinates={userCoordinates}
          defaultCenter={defaultCenter}
          onSelect={onPlaceSelect}
          isLoaded={isLoaded}
          control={control}
          reset={reset}
          errors={errors}
        />
        <div className={s.shoppingCartOrderContainer}>
          {basket.map(order => {
            return <ShoppingCartOrder key={order._id} order={order} />
          })}
        </div>
      </div>
      <div className={s.submit}>
        <Typography component='div' variant='h5' sx={{ paddingBottom: '10px' }}>
          Total count: {totalPrice.toFixed(2)}$
        </Typography>
        <Button disabled={!basket.length} variant='contained' type='submit'>
          Submit
        </Button>
      </div>
    </form>
  )
}

export default ShoppingCart
