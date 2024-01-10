import { configureStore } from '@reduxjs/toolkit'
import HomeSlice from './HomeSlice'

 const store = configureStore({
  reducer: {
    Home : HomeSlice
  },
})

export default store;