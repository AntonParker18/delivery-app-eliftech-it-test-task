import { createSlice } from '@reduxjs/toolkit'
import { setProducts, setRestaurants } from './shopsAction'

const initialState = {
  restaurants: [],
  products: [],
  error: null,
}

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setRestaurant: (state, { payload }) => {
      state.restaurants = payload
    },
    setProducts: (state, { payload }) => {
      state.products = payload
    },
  },
  extraReducers: {
    [setRestaurants.pending]: state => {
      state.restaurants = []
    },
    [setRestaurants.fulfilled]: (state, { payload }) => {
      state.restaurants = payload
    },
    [setRestaurants.rejected]: (state, { payload }) => {
      state.error = payload
    },

    [setProducts.pending]: state => {
      state.products = []
    },
    [setProducts.fulfilled]: (state, { payload }) => {
      state.products = payload
    },
    [setProducts.rejected]: (state, { payload }) => {
      state.error = payload
    },
  },
})

export const { setRestaurant, setProduct, setProductsByType } =
  shopSlice.actions
export default shopSlice.reducer
