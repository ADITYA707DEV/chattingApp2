import {  createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { socketclient } from "..";



export const getGroupMessage = createAsyncThunk("getGroupMessage",async (params,{dispatch})=>{
 
            return await  socketclient.on(`group`,(messageReceived)=>{
           
            dispatch(setGroupMessage(messageReceived))
               
            })
})

const initialState = {
    message:[],
    sender:null,
    status:""
}

const groupMessageSlice = createSlice({
name:"groupMessages",
initialState,
reducers:{
    setGroupMessage:(state,action)=>{
      
        state.message = [...state.message,action.payload]
        
        console.log(state.message)
        
    },
    resetGroupMessageReceiveCart:()=>{
      return initialState
    }
},
extraReducers:(builder)=>{
    builder.addCase(getGroupMessage.pending, (state) => {
        state.messageStatus = 'receiving';
      });
      builder.addCase(getGroupMessage.fulfilled, (state) => {
        state.messageStatus = 'received';
      });
      builder.addCase(getGroupMessage.rejected, (state) => {
        state.messageStatus = 'error';
      });
}


})

export const {setGroupMessage,resetGroupMessageReceiveCart} = groupMessageSlice.actions
export default groupMessageSlice.reducer;