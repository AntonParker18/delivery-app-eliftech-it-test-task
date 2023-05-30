import { configureStore } from '@reduxjs/toolkit'
import shopReducer from './shops/shopsSlice'
import shoppingCartReducer from './shoppingCart/shoppingCartSlice'

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'reduxjs-toolkit-persist'
import shoppingCartConfig from './shoppingCart/shoppingCartConfig'
import shopsConfig from './shops/shopsConfig'

export const store = configureStore({
  reducer: {
    shops: persistReducer(shopsConfig, shopReducer),
    shoppingCart: persistReducer(shoppingCartConfig, shoppingCartReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
