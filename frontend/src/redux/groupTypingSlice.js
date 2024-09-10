import {  createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { socketclient } from "..";



export const groupTypingAsync = createAsyncThunk("groupTypingAsync",async (params,{dispatch})=>{
   
    
            return await  socketclient.on("forGroup",(data)=>{

            dispatch(setGroupTyping(data))
               
            })
})


const initialState = {
    groupTyping: false,
    who:null,
    sender:null,
}

const groupTypingSlice = createSlice({
name:"groupTyping",
initialState,
reducers:{
    setGroupTyping:(state,action)=>{
      
        state.groupTyping = action.payload.boolean
        state.who = action.payload.user
        state.sender = action.payload.sender
        
    },
    resetGroupTyping:()=>{
      return initialState
    }
},


})

export const {setGroupTyping,resetGroupTyping} = groupTypingSlice.actions
export default groupTypingSlice.reducer;
