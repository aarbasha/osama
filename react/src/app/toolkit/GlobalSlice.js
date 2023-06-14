import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";


export const initialState = {
    fullScreen : false
}

export const GlobalSlice = createSlice({
    name:'global',
    initialState,
    reducers:{
        SetFullScreen : (state) => {
            state.fullScreen = !state.fullScreen 
        },
        OutFullscreen : (state) => {
            state.fullScreen = state.fullScreen 
        },

    },
    extraReducers:{}
})

export const { SetFullScreen , OutFullscreen } = GlobalSlice.actions

export default GlobalSlice.reducer