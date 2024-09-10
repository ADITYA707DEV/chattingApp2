import {  createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { socketclient } from "..";



export const getMessage = createAsyncThunk("getMessage",async (params,{dispatch})=>{

      console.log(params)
            return await  socketclient.on(`messageFor${params}`,(messageReceived)=>{
            
            dispatch(setMessage(messageReceived))
               
            })
})

const initialState = {
    message:[],
    sender:null,
    status:""
}

const ReceivingMessageSlice = createSlice({
name:"ReceivingMessage",
initialState,
reducers:{
    setMessage:(state,action)=>{
      
        state.message = [...state.message,action.payload]
        state.sender = action.payload.sender
        console.log(state.message)
        console.log(state.sender)
        console.log("dipsatched")
    },
    resetMessageReceiveCart:()=>{
      return initialState
    }
},
extraReducers:(builder)=>{
    builder.addCase(getMessage.pending, (state) => {
        state.messageStatus = 'receiving';
      });
      builder.addCase(getMessage.fulfilled, (state) => {
        state.messageStatus = 'received';
      });
      builder.addCase(getMessage.rejected, (state) => {
        state.messageStatus = 'error';
      });
}


})

export const {setMessage,resetMessageReceiveCart} = ReceivingMessageSlice.actions
export default ReceivingMessageSlice.reducer;