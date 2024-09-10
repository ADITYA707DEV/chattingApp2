import {  createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { socketclient } from "..";



export const userTyping = createAsyncThunk("userTyping",async (params,{dispatch})=>{
   
            return await  socketclient.on(`for${params}`,(data)=>{

            dispatch(setTyping(data))
               
            })
})


const initialState = {
    typing: false,
    who:null
}

const TypingSlice = createSlice({
name:"Typing",
initialState,
reducers:{
    setTyping:(state,action)=>{
      
        state.typing = action.payload.boolean
        state.who = action.payload.user
 
    },
    resetTyping:()=>{
      return initialState
    }
},


})

export const {setTyping,resetTyping} =TypingSlice.actions
export default TypingSlice.reducer;