import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Card, Grid } from '@mui/material'
import { useDispatch } from 'react-redux'

import s from './Shops.module.css'
import { setOrderInBasket } from '../../redux/shoppingCart/shoppingCartSlice'

const Product = ({ product }) => {
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(setOrderInBasket(product))
  }

  return (
    <div className={s.goodsWrapper}>
      <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
        <CardMedia
          component='img'
          height='140'
          image={`${product.photoUrl}`}
          alt='product image'
        />
        <CardContent sx={{ p: '10px' }}>
          <Typography variant='h6' component='div'>
            {product.productName}
          </Typography>
        </CardContent>
        <Grid container sx={{ p: '10px', textAlign: 'center' }}>
          <Grid item xs={6}>
            <Typography variant='h6' component='div'>
              Price {product.price + '$'}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Button
              onClick={handleSubmit}
              variant='contained'
            >
              Buy
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

export default Product
