import { configureStore } from '@reduxjs/toolkit'
import shopReducer from './shops/shopsSlice'
import shoppingCartReducer from './shoppingCart/shoppingCartSlice'

export const store = configureStore({
  reducer: {
    shops: shopReducer,
    shoppingCart: shoppingCartReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['shoppingCart/setOrder/fulfilled'],
        ignoredActionPaths: ['meta.arg', 'payload.headers'],
        ignoredPaths: ['shoppingCart.successInfo.headers'],
      },
    }),
})
