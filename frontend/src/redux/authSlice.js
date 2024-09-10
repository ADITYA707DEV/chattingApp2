import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    access:false
}

const authSlice = createSlice({
name:"auth",
initialState,
reducers:{
    setAuth : (state,action)=>{
        state.access = action.payload
      
    } 
}
})

export const {setAuth} = authSlice.actions

export default authSlice.reducer