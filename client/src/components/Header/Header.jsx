import React from 'react'
import { NavLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { IconButton } from '@mui/material'
import { useSelector } from 'react-redux'
import { green } from '@mui/material/colors'

import s from './Header.module.css'

const Header = () => {
  const { basket } = useSelector(state => state.shoppingCart)

  return (
    <header>
      <AppBar position='static'>
        <Toolbar>
          <Container maxWidth='xl'>
            <Toolbar disableGutters>
              <Typography textAlign={'center'}>
                <NavLink to={'/restaurant'} className={s.headerLink}>
                  Shop
                </NavLink>
              </Typography>
            </Toolbar>
          </Container>

          <NavLink to={'/shoppingcart'} className={s.basket}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              sx={basket.length ? { color: green[500] } : { color: 'inherit' }}
            >
              <ShoppingBasketIcon />
            </IconButton>
          </NavLink>
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default Header
