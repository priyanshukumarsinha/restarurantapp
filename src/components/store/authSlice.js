// Store for authentication
import { createSlice } from '@reduxjs/toolkit'
import { fetchUser } from '../../utils/fetchLocalStorageData'

const userInfo = fetchUser()

export const initialState = {
    user : userInfo, // initially no user, hence null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state, action) => {
            state.user = action.payload
        },
        logout : (state) => {
            state.user = null
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer