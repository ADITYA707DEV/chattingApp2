import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchedUser:null
}

const queryUserSlice = createSlice({
name:"queryUser",
initialState,
reducers:{
    setQueryUser : (state,action)=>{
        state.searchedUser = action.payload
        
      
    },
    resetQueryUser:(state)=>{
        return initialState
    }
}
})

export const {setQueryUser,resetQueryUser} = queryUserSlice.actions

export default queryUserSlice.reducer