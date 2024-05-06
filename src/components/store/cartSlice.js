// Store for authentication
import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    cartShow : false
}

const authSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        setCartShow : (state, action) => {
            state.cartShow = action.payload
        }
    }
})

export const {setCartShow} = authSlice.actions;
export default authSlice.reducer