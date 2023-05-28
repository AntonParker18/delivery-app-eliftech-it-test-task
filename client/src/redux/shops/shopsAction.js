import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

export const setRestaurants = createAsyncThunk(
  'shops/setRestaurant',
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${apiUrl}/shop/restaurant`)
      return data
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message)
      } else if (error.response?.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const setProducts = createAsyncThunk(
  'shops/setProduct',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${apiUrl}/shop/product/${id}`)
      return data
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message)
      } else if (error.response?.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
