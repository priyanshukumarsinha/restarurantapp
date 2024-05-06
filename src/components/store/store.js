import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import foodSlice from './foodSlice'
import cartSlice from './cartSlice'
import cartItemsSlice from './cartItemsSlice'

export const store = configureStore({
    reducer: {
        auth : authSlice,
        food : foodSlice,
        cart : cartSlice,
        cartItems : cartItemsSlice
    },
})