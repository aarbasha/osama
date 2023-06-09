import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './toolkit/AuthSlice'
import CategorieSlice from './toolkit/CategorieSlice'

export const store = configureStore({
  reducer: {
    auth:AuthSlice,
    categories: CategorieSlice
  },
})