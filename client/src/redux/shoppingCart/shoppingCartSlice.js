import { createSlice } from '@reduxjs/toolkit'
import { setOrder } from './shoppingCartAction'

const initialState = {
  basket: [],
  currentShopId: {},
  order: {},
  products: [],
  error: null,
  successInfo: {},
}

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    setOrderInBasket: (state, { payload }) => {
      const item = state.products.find(product => product._id === payload._id)
      const inCart = state.basket.find(item =>
        item._id === payload._id ? true : false
      )

      if (inCart) {
        state.basket = state.basket.map(item =>
          item._id === payload._id ? { ...item, qty: item.qty + 1 } : item
        )
      } else {
        state.basket.push({ ...item, qty: 1 })
      }

      state.currentShopId = {
        ...state.currentShopId,
        shopId: payload.shopId,
      }
    },
    deleteItem: (state, { payload }) => {
      state.basket = state.basket.filter(item => item._id !== payload._id)
      state.currentShopId = state.basket.length < 1 ? null : state.basket
    },
    adjustItemQty: (state, { payload }) => {
      state.basket = state.basket.map(item =>
        item._id === payload.orderId ? { ...item, qty: +payload.qty } : item
      )
    },

    addProducts: (state, { payload }) => {
      state.products = payload
    },
  },
  extraReducers: {
    [setOrder.pending]: state => {
      state.basket = []
    },
    [setOrder.fulfilled]: (state, { payload }) => {
      state.successInfo = payload.data
      state.basket = []
    },
    [setOrder.rejected]: (state, { payload }) => {
      state.error = payload
    },
  },
})

export const {
  setOrderInBasket,
  deleteItem,
  adjustItemQty,
  addProducts,
} = shoppingCartSlice.actions
export default shoppingCartSlice.reducer
