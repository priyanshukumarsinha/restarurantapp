import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import foodSlice from './foodSlice'
import cartSlice from './cartSlice'

export const store = configureStore({
    reducer: {
        auth : authSlice,
        food : foodSlice,
        cart : cartSlice,
    },
})