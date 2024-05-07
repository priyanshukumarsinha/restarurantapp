import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import foodSlice from './foodSlice'
import cartSlice from './cartSlice'
import cartItemsSlice from './cartItemsSlice'
import subTotalSlice from './subTotalSlice'

export const store = configureStore({
    reducer: {
        auth : authSlice,
        food : foodSlice,
        cart : cartSlice,
        cartItems : cartItemsSlice,
        subTotal : subTotalSlice,
    },
})