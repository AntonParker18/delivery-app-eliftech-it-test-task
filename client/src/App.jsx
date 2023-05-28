import React from 'react'
import {HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Shops from './components/Shops/Shops'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'

const App = () => {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<Navigate to={'/restaurant'} replace />} />
          <Route path='/restaurant' element={<Shops />} />
          <Route path='/shoppingcart' element={<ShoppingCart />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
