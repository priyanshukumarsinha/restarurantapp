// Store for authentication
import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    user : null, // initially no user, hence null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state, action) => {
            state.user = action
        },
        // logout : (state) => {
        //     // state.status = false,
        //     state.user = null
        // }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer