import { createSlice } from "@reduxjs/toolkit";

const initialState ={show:false,heading:null,text:null}


const AlertSlice = createSlice({
name:"Alert",
initialState,
reducers:{
    setAlert : (state,action)=>{
        state.show = action.payload.show
        state.heading = action.payload.heading
        state.text = action.payload.text
      
    },
    resetAlert :(state)=>{
        return initialState
    } 
}
})

export const {setAlert,resetAlert} = AlertSlice.actions

export default AlertSlice.reducer