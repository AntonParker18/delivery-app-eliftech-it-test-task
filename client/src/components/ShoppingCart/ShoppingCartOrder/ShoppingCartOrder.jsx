import React from 'react'
import { useState } from 'react'
import { Button, CardContent, CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import {
  adjustItemQty,
  deleteItem,
} from '../../../redux/shoppingCart/shoppingCartSlice'

import s from './ShoppingCartOrder.module.css'
import { useDispatch } from 'react-redux'

const ShoppingCartOrder = ({ order }) => {
  const [input, setInput] = useState(order.qty)
  const dispatch = useDispatch()

  const onChangeHandler = e => {
    setInput(e.target.value)
    dispatch(adjustItemQty({ orderId: order._id, qty: e.target.value }))
  }

  const deleteBtn = () => {
    dispatch(deleteItem(order))
  }

  return (
    <div className={s.wrapper}>
      <Box sx={{ flexGrow: '2' }}>
        <CardContent sx={{ alignItems: 'center' }}>
          <CardMedia
            component='img'
            sx={{ width: '160px', height: '106px', m: '0 auto' }}
            image={order.photoUrl}
          />
        </CardContent>
      </Box>
      <div className={s.orderParams}>
        <Typography component='div' variant='h5'>
          {order.name}
        </Typography>
        <Typography component='div' variant='h5'>
          Price {order.price + '$'}
        </Typography>
        <Typography component='div' variant='h5'>
          <div className={s.cartItem__qty}>
            <input
              min='1'
              type='number'
              id='qty'
              name='qty'
              value={input}
              onChange={onChangeHandler}
            />
          </div>
        </Typography>
      </div>
      <div className={s.deleteBtn}>
        <Button variant='contained' onClick={deleteBtn}>
          Delete
        </Button>
      </div>
    </div>
  )
}

export default ShoppingCartOrder
