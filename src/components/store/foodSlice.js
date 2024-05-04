// Store for authentication
import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    foodItems : null
}

const authSlice = createSlice({
    name : "food",
    initialState,
    reducers : {
        setFoodItems : (state, action) => {
            state.foodItems = action.payload
        }
    }
})

export const {setFoodItems} = authSlice.actions;
export default authSlice.reducer