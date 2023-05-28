import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

export const setOrder = createAsyncThunk(
  'shoppingCart/setOrder',
  async (newOrder, { rejectWithValue }) => {
    try {
      const setNewOrder = await axios.post(`${apiUrl}/shoppingCard/order`, newOrder)
      return setNewOrder
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
