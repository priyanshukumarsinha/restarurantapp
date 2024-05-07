// Store for authentication
import { createSlice } from '@reduxjs/toolkit'
import { fetchCart } from '../../utils/fetchLocalStorageData'

const cartInfo = fetchCart()

export const initialState = {
    cartItems : cartInfo, // initially no user, hence null
}

const authSlice = createSlice({
    name : "cartItems",
    initialState,
    reducers : {
        setCartItems : (state, action) => {
            state.cartItems = action.payload
            localStorage.setItem('cartItems', JSON.stringify(action.payload))
        }
    }
})

export const {setCartItems} = authSlice.actions;
export default authSlice.reducer