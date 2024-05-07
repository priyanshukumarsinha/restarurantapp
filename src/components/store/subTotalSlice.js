// Store for authentication
import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    subTotal : 0, // initially no user, hence null
}

const authSlice = createSlice({
    name : "subTotal",
    initialState,
    reducers : {
        setSubTotal : (state, action) => {
            state.subTotal = Number(Number(action.payload).toFixed(2))
        }
    }
})

export const {setSubTotal} = authSlice.actions;
export default authSlice.reducer