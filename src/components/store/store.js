import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import foodSlice from './foodSlice'

export const store = configureStore({
    reducer: {
        auth : authSlice,
        food : foodSlice,
    },
})